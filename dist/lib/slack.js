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
exports.default = ({ weather, news, date, url }) => __awaiter(void 0, void 0, void 0, function* () {
    const today = new Date().toLocaleDateString().replace(/\. /g, '-').replace('.', '');
    let message = {
        attachments: [],
    };
    message.attachments.push({
        color: '#928BFF',
        pretext: `📨 ${today} 편지가 왔어요!`,
        fields: [
            {
                title: '📅 날짜 / 한국',
                value: `${today} ${date ? '(' + date + ')' : ''}`,
                short: true,
            },
            {
                title: '🏞️ 날씨 / 부산',
                value: weather.weather,
                short: true,
            },
            {
                title: '🌡 온도 / 부산',
                value: weather.temp,
                short: true,
            },
        ],
        footer: '제작: 재웜',
        footer_icon: 'https://images-ext-2.discordapp.net/external/GyQicPLz_zQO15bOMtiGTtC4Kud7JjQbs1Ecuz7RrtU/https/cdn.discordapp.com/embed/avatars/1.png',
    });
    message.attachments.push({
        // text: '<http://www.foo.com|This message *is* a link>',
        fields: [
            {
                type: 'mrkdwn',
                title: '📰 뉴스 / 구글',
                value: news,
            }
        ],
    });
    yield axios_1.default.post(url, message);
});
