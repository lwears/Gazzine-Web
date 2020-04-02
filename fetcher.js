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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const parseArticle_1 = __importDefault(require("./parsers/parseArticle"));
const html_entities_1 = require("html-entities");
require('dotenv').config();
// const baseUrl = process.env.BASEURL;
const baseUrl = 'https://www.gazzine.com/wp-json/wp/v2/';
const fetchAllPosts = (page = 1) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.get(`${baseUrl}posts?page=${page}&_embed`);
    const result = data.map((article) => reshapeArticles(article));
    return Promise.resolve(result);
});
const fetchSinglePostById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.get(`${baseUrl}posts/${id}?_embed`);
    const result = addContent(data);
    return Promise.resolve(result);
});
const fetchSinglePostBySlug = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const newSlug = encodeURI(slug);
    const { data } = yield axios_1.default.get(`${baseUrl}posts/?slug=${newSlug}&_embed`);
    const result = addContent(data[0]);
    return Promise.resolve(result);
});
const authorMapper = ({ display_name, user_id, profile_picture }) => ({
    id: user_id,
    name: display_name,
    profilePictureUrl: `https://www.gazzine.com${profile_picture}`,
});
const categoryMapper = (category) => ({
    id: category.id,
    name: html_entities_1.XmlEntities.decode(category.name)
});
const dateMapper = (date) => {
    return date.toLocaleDateString(undefined, {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};
const reshapeArticles = (data) => {
    const { id, slug, modified, title: { rendered: title }, coauthors, _embedded: { 'wp:term': categories }, _embedded: { 'wp:featuredmedia': images } } = data;
    return {
        id,
        slug,
        category: categories[0].map((cat) => categoryMapper(cat)),
        modified: dateMapper(new Date(modified)),
        title: html_entities_1.XmlEntities.decode(title),
        authors: (coauthors || []).map((author) => authorMapper(author)),
        image: images[0].media_details.sizes.medium.source_url,
    };
};
const addContent = (data) => {
    return Object.assign(Object.assign({}, reshapeArticles(data)), { body: parseArticle_1.default(html_entities_1.AllHtmlEntities.decode(data.content.rendered.trim())) });
};
module.exports = { fetchAllPosts, fetchSinglePostById, fetchSinglePostBySlug };
