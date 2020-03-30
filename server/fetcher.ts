import axios from 'axios';
import parseArticle from './parsers/parseArticle';
import { XmlEntities, AllHtmlEntities } from 'html-entities';

require('dotenv').config();

// const baseUrl = process.env.BASEURL;
const baseUrl = 'https://www.gazzine.com/wp-json/wp/v2/';


const fetchAllPosts = async (page) => {
  const { data } = await axios.get(`${baseUrl}posts?page=${page}&_embed`);
  const result = data.map((article) => reshapeArticles(article));
  return Promise.resolve(result);
};

const fetchSinglePost = async (id) => {
  const {data} = await axios.get(`${baseUrl}posts?include=${id}&_embed`);
  const result = data.map((article) => addContent(article));
  return Promise.resolve(result);
};

const reshapeArticles = (data) => {
  return {
    id: data.id,
    category: data._embedded['wp:term'][0].map(cat => ({id: cat.id, name: cat.name})),
    modified: new Date(data.modified),
    title: XmlEntities.decode(data.title.rendered),
    author: data.coauthors[0].display_name,
    image: data._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url,
  }
}

const addContent = (data) => {
  return {
    ...reshapeArticles(data),
    body: parseArticle(AllHtmlEntities.decode(data.content.rendered.trim()))
  }
}

module.exports = { fetchAllPosts, fetchSinglePost };
