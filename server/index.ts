import fetchAllPosts from './fetcher';

// exports.helloWorld = (req, res) => res.send("Hello, World!");

const getAllPosts = async (req, res) => {
  const result = await fetchAllPosts();
  res.set('Access-Control-Allow-Origin', "*")
  res.set('Access-Control-Allow-Methods', 'GET, POST')
  res.json(result);
};

module.exports = { getAllPosts };
