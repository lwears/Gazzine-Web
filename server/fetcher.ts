import axios from 'axios';

require('dotenv').config();


const baseUrl = process.env.BASEURL;

const fetchAllPosts = async (page: number = 1) => {
  const result = await axios.get(`${baseUrl}posts?page=${page}`);
  return Promise.resolve(result.data);
};

export default fetchAllPosts;
