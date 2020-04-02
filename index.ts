import { fetchAllPosts, fetchSinglePostBySlug } from './fetcher';
import { Response, Request } from 'express';

const getAllPosts = async (req: Request , res: Response) => {
  const { page, category } = req.query;
  console.log(req.query)
  let result;
  if ( category !== 'undefined' ) {
    result = await fetchAllPosts(page, category);
  } else {
    result = await fetchAllPosts(page);
  }
  res.set('Access-Control-Allow-Origin', "*");
  res.set('Access-Control-Allow-Methods', 'GET, POST');
  res.json(result);
};

const getSinglePost = async (req: Request, res: Response) => {
  const { slug } = req.query;
  if (slug) {
    const result = await fetchSinglePostBySlug(slug);
    res.set('Access-Control-Allow-Origin', "*");
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.json(result);
  }else {
    res.set('Access-Control-Allow-Origin', "*");
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.sendStatus(404);
  }
};

module.exports = { getAllPosts, getSinglePost };
