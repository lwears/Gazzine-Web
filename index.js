"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fetcher_1 = require("./fetcher");
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, page } = req.query;
    console.log(req.query);
    switch (type) {
        case 'AllPosts':
            console.log('hello', req.query);
            const { category, author } = req.query;
            const filter = {
                page,
                category,
                author,
            };
            try {
                const result = yield fetcher_1.fetchAllPosts(filter);
                res.set('Access-Control-Allow-Origin', "*");
                res.set('Access-Control-Allow-Methods', 'GET');
                return res.json(result);
            }
            catch (error) {
                res.set('Access-Control-Allow-Origin', "*");
                res.set('Access-Control-Allow-Methods', 'GET');
                return res.status(404).json({ message: 'No more articles' });
            }
        case 'SinglePost':
            console.log('hello2', req.query);
            const { slug } = req.query;
            try {
                const result = yield fetcher_1.fetchSinglePostBySlug(slug);
                res.set('Access-Control-Allow-Origin', "*");
                res.set('Access-Control-Allow-Methods', 'GET');
                return res.json(result);
            }
            catch (error) {
                res.set('Access-Control-Allow-Origin', "*");
                res.set('Access-Control-Allow-Methods', 'GET');
                return res.status(404).json({ message: 'Couldn\'t find article are you sure you have the right link?' });
            }
        case 'Search':
            const { search } = req.query;
            try {
                const result = yield fetcher_1.fetchOnSearch({ page, search });
                res.set('Access-Control-Allow-Origin', "*");
                res.set('Access-Control-Allow-Methods', 'GET');
                return res.json(result);
            }
            catch (error) {
                res.set('Access-Control-Allow-Origin', "*");
                res.set('Access-Control-Allow-Methods', 'GET');
                return res.status(404).json({ message: 'Couldn\'t find article are you sure you have the right link?' });
            }
        default:
            res.set('Access-Control-Allow-Origin', "*");
            res.set('Access-Control-Allow-Methods', 'GET');
            return res.status(404).json({ message: 'Nothing here wrong type' });
    }
});
module.exports = { getPosts };
