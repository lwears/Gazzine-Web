import { fetchAllPosts, fetchSinglePost } from './fetcher';

const getAllPosts = async (req, res) => {
  const result = await fetchAllPosts();
  res.set('Access-Control-Allow-Origin', "*")
  res.set('Access-Control-Allow-Methods', 'GET, POST')
  res.json(result);
};

const getSinglePost = async (req, res) => {
  const { id } = req.query;
  console.log(req.query);
  if ( id ) {
    const result = await fetchSinglePost(id);
    res.set('Access-Control-Allow-Origin', "*")
    res.set('Access-Control-Allow-Methods', 'GET, POST')
    res.json(result);
  } else {
    res.set('Access-Control-Allow-Origin', "*")
    res.set('Access-Control-Allow-Methods', 'GET, POST')
    res.sendStatus(404);
  }
};

module.exports = { getAllPosts, getSinglePost };
