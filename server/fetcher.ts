import axios from 'axios';
import parseArticle from './parsers/parseArticle';
import { XmlEntities, AllHtmlEntities } from 'html-entities';

require('dotenv').config();

// const baseUrl = process.env.BASEURL;
const baseUrl = 'https://www.gazzine.com/wp-json/wp/v2/';


const fetchAllPosts = async (page = 1) => {
  const { data } = await axios.get(`${baseUrl}posts?page=${page}&_embed`);
  const result = data.map((article) => reshapeArticles(article));
  return Promise.resolve(result);
};

const fetchSinglePostById = async (id) => {
  const {data} = await axios.get(`${baseUrl}posts/${id}?_embed`);
  const result = addContent(data);
  return Promise.resolve(result);
};

const fetchSinglePostBySlug = async (slug) => {
  const newSlug = encodeURI(slug);
  const {data} = await axios.get(`${baseUrl}posts/?slug=${newSlug}&_embed`);
  const result = addContent(data[0]);
  return Promise.resolve(result);
};

const authorMapper = ({display_name, user_id, profile_picture}) => ({
  id: user_id,
  name: display_name,
  profilePictureUrl: `https://www.gazzine.com${profile_picture}`,
});

const reshapeArticles = (data) => {
  return {
    id: data.id,
    slug: data.slug,
    category: data._embedded['wp:term'][0].map(cat => ({id: cat.id, name: XmlEntities.decode(cat.name)})),
    modified: new Date(data.modified).toLocaleDateString(undefined, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }),
    title: XmlEntities.decode(data.title.rendered),
    authors: ( data.coauthors || [] ).map(author => authorMapper(author)),
    image: data._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url,
  }
};

const addContent = (data) => {
  return {
    ...reshapeArticles(data),
    body: parseArticle(AllHtmlEntities.decode(data.content.rendered.trim()))
  }
}

module.exports = { fetchAllPosts, fetchSinglePostById, fetchSinglePostBySlug};
