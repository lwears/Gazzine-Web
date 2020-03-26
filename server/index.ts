import fetchAllPosts from './fetcher';

// exports.helloWorld = (req, res) => res.send("Hello, World!");

const getAllPosts = async (req, res) => {
  const result = await fetchAllPosts();
  res.json(result);
};

module.exports = { getAllPosts };
