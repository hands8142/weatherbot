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
const speedName_1 = require("../parser/speedName");
const moment_timezone_1 = __importDefault(require("moment-timezone"));
exports.default = ({ weather, news, date, url }) => __awaiter(void 0, void 0, void 0, function* () {
    const today = new Date()
        .toLocaleDateString()
        .replace(/\. /g, "-")
        .replace(".", "");
    const speedName = speedName_1.parser(Number(Number(weather.wind_speed.split("m/s")[0]).toFixed(1)) * 10);
    let message = {
        username: "하루 시작봇",
        avatar_url: "https://cdn.discordapp.com/attachments/683175932873539589/689459371151065088/message-3592640_1280.jpg",
        content: `${today}의 하루 시작을 위한 정보를 알려드립니다.`,
        embeds: [],
    };
    message.embeds.push({
        color: 0x928bff,
        fields: [
            {
                name: "📅 날짜 / 한국",
                value: `${today} ${date ? "(" + date + ")" : ""}`,
                inline: true,
            },
            {
                name: "🏞️ 날씨 / 서울",
                value: weather.weather,
                inline: true,
            },
            {
                name: "🌡 현재온도 / 서울",
                value: weather.temp,
                inline: true,
            },
            {
                name: "🌡 채감온도 / 서울",
                value: weather.feels_like,
                inline: true,
            },
            {
                name: "🌡 최고기온 / 서울",
                value: weather.temp_max,
                inline: true,
            },
            {
                name: "🌡 최저기온 / 서울",
                value: weather.temp_min,
                inline: true,
            },
            {
                name: "🍃 바람세기 / 서울",
                value: `${weather.wind_speed} ${speedName ? "(" + speedName + ")" : ""}`,
                inline: true,
            },
            {
                name: "🗜 기압 / 서울",
                value: weather.pressure,
                inline: true,
            },
            {
                name: "💧 습도 / 서울",
                value: weather.humidity,
                inline: true,
            },
        ],
    });
    for (let i = 0; i < 3; i++) {
        message.embeds[0].push({
            name: `🌡 ${formatDate(moment_timezone_1.default(weather.forecast[i].dt))}온도 / 서울`,
            value: weather.forecast[i].temp,
            inline: true
        });
    }
    message.embeds.push({
        color: 0x928bff,
        title: "📰 뉴스 / 구글",
        description: news,
    });
    yield axios_1.default.post(url, message);
});
function formatDate(date) {
    return (date.year() +
        "년 " +
        (date.month() + 1) +
        "월 " +
        date.date() +
        "일 " +
        date.hours() +
        "시 ");
}
