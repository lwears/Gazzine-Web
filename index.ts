import { Response, Request } from 'express';
import { fetchAllPosts, fetchSinglePostBySlug, fetchOnSearch } from './fetcher';

const getPosts = async (req: Request, res: Response) => {
  const { type, page, category, author, slug, search } = req.query;
  const filter = { page, category, author };
  console.log(req.query);
  
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET');
  
  switch (type) {
    case 'AllPosts':
      try {
        const result = await fetchAllPosts(filter);
        return res.json(result);
      } catch (error) {
        return res.status(404).json({ message: 'No more articles' });
      }
    case 'SinglePost':
      try {
        const result = await fetchSinglePostBySlug(slug);
        return res.json(result);
      } catch (error) {
        return res.status(404).json({ message: 'Couldn\'t find article are you sure you have the right link?' });
      }
    case 'Search':
      try {
        const result = await fetchOnSearch({ page, search });
        return res.json(result);
      } catch (error) {
        return res.status(404).json({ message: 'Couldn\'t find article are you sure you have the right link?' });
      }
    default:
      return res.status(404).json({ message: 'Nothing here wrong type' });
  }
};

module.exports = { getPosts };
