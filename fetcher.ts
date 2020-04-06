import axios from 'axios';
import { XmlEntities, AllHtmlEntities } from 'html-entities';
import parseArticle from './parsers/parseArticle';
import {
  Article, ArticleWithBody, Author, Category,
} from './types';

require('dotenv').config();

const XmlEntity = new XmlEntities();
const HTMLEntity = new AllHtmlEntities();

// const baseUrl = process.env.BASEURL;
const baseUrl = 'https://www.gazzine.com/wp-json/wp/v2/';

interface Filter {
  page: number;
  category?: number;
  author?: number;
}

type fetchReturn = Article[] | ArticleWithBody | string;

const authorMapper = ({ display_name, user_id, profile_picture }: any): Author => ({
  id: user_id,
  name: display_name,
  profilePictureUrl: `https://www.gazzine.com${profile_picture}`,
});

const categoryMapper = (category: any): Category => ({
  id: category.id,
  name: XmlEntity.decode(category.name),
});

const dateMapper = (date: Date) => date.toLocaleDateString(undefined, {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

const reshapeArticles = (data: any): Article => {
  const {
    id,
    slug,
    modified,
    title: { rendered: title },
    coauthors,
    _embedded: { 'wp:term': categories },
    _embedded: { 'wp:featuredmedia': images },
  } = data;

  return {
    id,
    slug,
    category: categories[0].map((cat: any) => categoryMapper(cat)),
    modified: dateMapper(new Date(modified)),
    title: XmlEntity.decode(title),
    authors: (coauthors || []).map((author: any) => authorMapper(author)),
    image: images[0].media_details.sizes.medium.source_url,
  };
};

const addContent = (data: any): ArticleWithBody => ({
  ...reshapeArticles(data),
  body: parseArticle(HTMLEntity.decode(data.content.rendered.trim())),
});

export const fetchAllPosts = async ({ page, category, author }: Filter): Promise<fetchReturn> => {
  const url = `${baseUrl}posts?page=${page}&categories=${category || ''}&author=${author || ''}&_embed`;
  try {
    const { data } = await axios.get(url);
    const result = data.map((article: any) => reshapeArticles(article));
    return Promise.resolve(result);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetchSinglePostBySlug = async (slug: string): Promise<fetchReturn> => {
  const newSlug = encodeURI(slug);
  try {
    const { data } = await axios.get(`${baseUrl}posts/?slug=${newSlug}&_embed`);
    const result = addContent(data[0]);
    return Promise.resolve(result);
  } catch (error) {
    return Promise.reject(error);
  }
};

interface Search {
  page: number;
  search: string;
}

export const fetchOnSearch = async ({ page = 1, search }: Search): Promise<fetchReturn> => {
  const url = `${baseUrl}posts?page=${page}&search=${search}&_embed`;
  try {
    const { data } = await axios.get(url);
    const result = data.map((article: any) => reshapeArticles(article));
    return Promise.resolve(result);
  } catch (error) {
    return Promise.reject(error);
  }
};
