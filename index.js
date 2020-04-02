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
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page } = req.query;
    const result = yield fetcher_1.fetchAllPosts(page);
    res.set('Access-Control-Allow-Origin', "*");
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.json(result);
});
const getSinglePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    const { slug } = req.query;
    if (id) {
        const result = yield fetcher_1.fetchSinglePostById(id);
        res.set('Access-Control-Allow-Origin', "*");
        res.set('Access-Control-Allow-Methods', 'GET, POST');
        res.json(result);
    }
    else if (slug) {
        const result = yield fetcher_1.fetchSinglePostBySlug(slug);
        res.set('Access-Control-Allow-Origin', "*");
        res.set('Access-Control-Allow-Methods', 'GET, POST');
        res.json(result);
    }
    else {
        res.set('Access-Control-Allow-Origin', "*");
        res.set('Access-Control-Allow-Methods', 'GET, POST');
        res.sendStatus(404);
    }
});
module.exports = { getAllPosts, getSinglePost };
