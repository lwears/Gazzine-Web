import { fetchAllPosts, fetchSinglePostById, fetchSinglePostBySlug } from './fetcher';

const getAllPosts = async (req, res) => {
  const { page } = req.query
  const result = await fetchAllPosts(page);
  res.set('Access-Control-Allow-Origin', "*")
  res.set('Access-Control-Allow-Methods', 'GET, POST')
  res.json(result);
};

const getSinglePost = async (req, res) => {
  const { id } = req.query;
  const { slug } = req.query;
  console.log(req.query);
  if ( id ) {
    const result = await fetchSinglePostById(id);
    res.set('Access-Control-Allow-Origin', "*")
    res.set('Access-Control-Allow-Methods', 'GET, POST')
    res.json(result);
  } else if (slug) {
    const result = await fetchSinglePostBySlug(slug);
    res.set('Access-Control-Allow-Origin', "*")
    res.set('Access-Control-Allow-Methods', 'GET, POST')
    res.json(result);
  }else {
    res.set('Access-Control-Allow-Origin', "*")
    res.set('Access-Control-Allow-Methods', 'GET, POST')
    res.sendStatus(404);
  }
};

module.exports = { getAllPosts, getSinglePost };
