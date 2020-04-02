import axios from 'axios';
import parseArticle from './parsers/parseArticle';
import { XmlEntities, AllHtmlEntities } from 'html-entities';
import { Article, ArticleWithBody, Author, Category } from './types';

require('dotenv').config();

// const baseUrl = process.env.BASEURL;
const baseUrl = 'https://www.gazzine.com/wp-json/wp/v2/';


const fetchAllPosts = async (page = 1): Promise<Article[]> => {
  const { data } = await axios.get(`${baseUrl}posts?page=${page}&_embed`);
  const result = data.map((article: any) => reshapeArticles(article));
  return Promise.resolve(result);
};

const fetchSinglePostById = async (id: string): Promise<ArticleWithBody> => {
  const {data} = await axios.get(`${baseUrl}posts/${id}?_embed`);
  const result = addContent(data);
  return Promise.resolve(result);
};

const fetchSinglePostBySlug = async (slug: string): Promise<ArticleWithBody> => {
  const newSlug = encodeURI(slug);
  const {data} = await axios.get(`${baseUrl}posts/?slug=${newSlug}&_embed`);
  const result = addContent(data[0]);
  return Promise.resolve(result);
};

const authorMapper = ({display_name, user_id, profile_picture}: any): Author => ({
  id: user_id,
  name: display_name,
  profilePictureUrl: `https://www.gazzine.com${profile_picture}`,
});

const categoryMapper = (category: any): Category => ({
  id: category.id,
  name: XmlEntities.decode(category.name)
});

const dateMapper = (date: Date) => {
  return date.toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
};

const reshapeArticles = (data: any): Article => {
  const { id, 
    slug, 
    modified, 
    title: { rendered: title }, 
    coauthors, 
    _embedded: { 'wp:term': categories }, 
    _embedded: { 'wp:featuredmedia': images } 
  } = data;

  return {
    id,
    slug,
    category: categories[0].map((cat: any) => categoryMapper(cat)),
    modified: dateMapper(new Date(modified)),
    title: XmlEntities.decode(title),
    authors: ( coauthors || [] ).map((author: any) => authorMapper(author)),
    image: images[0].media_details.sizes.medium.source_url,
  }
};

const addContent = (data: any): ArticleWithBody => {
  return {
    ...reshapeArticles(data),
    body: parseArticle(AllHtmlEntities.decode(data.content.rendered.trim()))
  }
}

module.exports = { fetchAllPosts, fetchSinglePostById, fetchSinglePostBySlug};
