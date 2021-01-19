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
const cheerio_1 = __importDefault(require("cheerio"));
exports.parse = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get('https://news.google.com/rss?hl=ko&gl=KR&ceid=KR:ko'); // parsing new at google news
    const html = response.data;
    const $ = cheerio_1.default.load(html, { xmlMode: true });
    const titles = $('item > title').map((i, element) => $(element).text()).get();
    const links = $('item > link').map((i, element) => $(element).text()).get();
    let discordContent = '';
    let slackContent = '';
    for (let i = 0; i < 5; i++) {
        discordContent += `[${titles[i]}](${links[i]})\n`;
        slackContent += `<${links[i]}|${titles[i]}>\n`;
    }
    console.log('✅ 뉴스 파싱 완료');
    return {
        discordContent,
        slackContent,
    };
});
