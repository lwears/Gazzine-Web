import { fetchAllPosts, fetchSinglePostBySlug } from './fetcher';
import { Response, Request } from 'express';

const getAllPosts = async (req: Request , res: Response) => {
  const { page, category, author } = req.query;
  console.log(req.query)
  let result;
  // if ( category !== 'undefined' ) {
  //   result = await fetchAllPosts(page, category);
  // } else {
  //   result = await fetchAllPosts(page);
  // }
  category !== 'undefined' ? result = await fetchAllPosts(page, category) : result = await fetchAllPosts(page);

  if ( !result ) {
    res.set('Access-Control-Allow-Origin', "*");
    res.set('Access-Control-Allow-Methods', 'GET');
    return res.status(404).json({message: 'no more articles'});
  }
  res.set('Access-Control-Allow-Origin', "*");
  res.set('Access-Control-Allow-Methods', 'GET');
  res.json(result);
};

const getSinglePost = async (req: Request, res: Response) => {
  const { slug } = req.query;
  if (slug) {
    const result = await fetchSinglePostBySlug(slug);
    res.set('Access-Control-Allow-Origin', "*");
    res.set('Access-Control-Allow-Methods', 'GET');
    res.json(result);
  } else {
    res.set('Access-Control-Allow-Origin', "*");
    res.set('Access-Control-Allow-Methods', 'GET');
    res.sendStatus(404);
  }
};

module.exports = { getAllPosts, getSinglePost };
