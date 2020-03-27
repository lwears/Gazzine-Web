import axios from 'axios';

require('dotenv').config();


const baseUrl = process.env.BASEURL;

const fetchAllPosts = async (page: number = 1) => {
  const result = await axios.get(`${baseUrl}posts?page=${page}`);
  return Promise.resolve(result.data);
};

const fetchSinglePost = async (id: number) => {
  const result = await axios.get(`${baseUrl}posts?include=${id}`);
  return Promise.resolve(result.data);
};

module.exports = { fetchAllPosts, fetchSinglePost };
