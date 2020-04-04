import { fetchAllPosts, fetchSinglePostBySlug, fetchOnSearch } from './fetcher';
import { Response, Request } from 'express';

const getPosts = async (req: Request , res: Response) => {
  const { type, page } = req.query;
  console.log(req.query)
  
  switch (type) {
    case 'AllPosts':
      console.log('hello', req.query)
      const { category, author } = req.query;
      const filter = {
        page,
        category,
        author,
      }
      try {
        const result = await fetchAllPosts(filter);
        res.set('Access-Control-Allow-Origin', "*");
        res.set('Access-Control-Allow-Methods', 'GET');
        return res.json(result);
      } catch (error) {
        res.set('Access-Control-Allow-Origin', "*");
        res.set('Access-Control-Allow-Methods', 'GET');
        return res.status(404).json({message: 'No more articles'});
      }
    case 'SinglePost':
      console.log('hello2', req.query)
      const { slug } = req.query;
      try {
        const result = await fetchSinglePostBySlug(slug);
        res.set('Access-Control-Allow-Origin', "*");
        res.set('Access-Control-Allow-Methods', 'GET');
        return res.json(result);
      } catch (error) {
        res.set('Access-Control-Allow-Origin', "*");
        res.set('Access-Control-Allow-Methods', 'GET');
        return res.status(404).json({message: 'Couldn\'t find article are you sure you have the right link?'}); 
      }
    case 'Search':
      const { search } = req.query;
      try {
        const result = await fetchOnSearch({page, search});
        res.set('Access-Control-Allow-Origin', "*");
        res.set('Access-Control-Allow-Methods', 'GET');
        return res.json(result);
      } catch (error) {
        res.set('Access-Control-Allow-Origin', "*");
        res.set('Access-Control-Allow-Methods', 'GET');
        return res.status(404).json({message: 'Couldn\'t find article are you sure you have the right link?'});
      }
    default:
      res.set('Access-Control-Allow-Origin', "*");
      res.set('Access-Control-Allow-Methods', 'GET');
      return res.status(404).json({message: 'Nothing here wrong type'});
  }
};

module.exports = { getPosts };
