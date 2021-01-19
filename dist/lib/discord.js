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
        username: "하루 시작봇",
        avatar_url: 'https://cdn.discordapp.com/attachments/683175932873539589/689459371151065088/message-3592640_1280.jpg',
        content: `${today}의 하루 시작을 위한 정보를 알려드립니다.`,
        embeds: [],
    };
    message.embeds.push({
        color: 0x928BFF,
        fields: [
            {
                name: '📅 날짜 / 한국',
                value: `${today} ${date ? '(' + date + ')' : ''}`,
                inline: true
            },
            {
                name: '🏞️ 날씨 / 서울',
                value: weather.weather,
                inline: true
            },
            {
                name: '🌡 현재온도 / 서울',
                value: weather.temp,
                inline: true
            },
            {
                name: '🌡 최고기온 / 서울',
                value: weather.temp_max,
                inline: true
            },
            {
                name: '🌡 최저기온 / 서울',
                value: weather.temp_min,
                inline: true
            }
        ]
    });
    message.embeds.push({
        color: 0x928BFF,
        title: '📰 뉴스 / 구글',
        description: news
    });
    yield axios_1.default.post(url, message);
});
