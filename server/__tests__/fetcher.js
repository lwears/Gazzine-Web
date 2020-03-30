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
const fetcher_1 = __importDefault(require("../fetcher"));
describe('fetcher function', () => {
    test('has 10 articles', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield fetcher_1.default();
        expect(result.length).toBe(10);
    }));
    test('is correct formatted', () => __awaiter(void 0, void 0, void 0, function* () {
        const [result] = yield fetcher_1.default();
        expect(result.hasOwnProperty('id'));
        expect(result.hasOwnProperty('title'));
        expect(result.hasOwnProperty('content'));
    }));
});
