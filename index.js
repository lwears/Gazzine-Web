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
    const { type, page, category, author, slug, search } = req.query;
    const filter = { page, category, author };
    console.log(req.query);
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET');
    switch (type) {
        case 'AllPosts':
            try {
                const result = yield fetcher_1.fetchAllPosts(filter);
                return res.json(result);
            }
            catch (error) {
                return res.status(404).json({ message: 'No more articles' });
            }
        case 'SinglePost':
            try {
                const result = yield fetcher_1.fetchSinglePost(slug);
                return res.json(result);
            }
            catch (error) {
                return res.status(404).json({ message: 'Couldn\'t find article are you sure you have the right link?' });
            }
        case 'Search':
            try {
                const result = yield fetcher_1.fetchOnSearch({ page, search });
                return res.json(result);
            }
            catch (error) {
                return res.status(404).json({ message: 'Couldn\'t find article are you sure you have the right link?' });
            }
        default:
            return res.status(404).json({ message: 'Nothing here wrong type' });
    }
});
module.exports = { getPosts };
