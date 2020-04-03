import { fetchAllPosts, fetchSinglePostBySlug } from './fetcher';
import { Response, Request } from 'express';

const getAllPosts = async (req: Request , res: Response) => {
  const { page, category, author } = req.query;
  const filter = {
    page,
    category,
    author,
  }
  console.log(req.query)
  try {
    const result = await fetchAllPosts(filter);
    res.set('Access-Control-Allow-Origin', "*");
    res.set('Access-Control-Allow-Methods', 'GET');
    res.json(result);
  } catch (error) {
    res.set('Access-Control-Allow-Origin', "*");
    res.set('Access-Control-Allow-Methods', 'GET');
    return res.status(404).json({message: 'No more articles'});
  }
};

const getSinglePost = async (req: Request, res: Response) => {
  const { slug } = req.query;
  try {
    const result = await fetchSinglePostBySlug(slug);
    res.set('Access-Control-Allow-Origin', "*");
    res.set('Access-Control-Allow-Methods', 'GET');
    res.json(result);
  } catch (error) {
    res.set('Access-Control-Allow-Origin', "*");
    res.set('Access-Control-Allow-Methods', 'GET');
    res.status(404).json({message: 'Couldn\'t find article are you sure you have the right link?'}); 
  }
};

module.exports = { getAllPosts, getSinglePost };
