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
        content: `${today}의 하루 시작을 위한 날씨를 알려드립니다.`,
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
    let message2 = {
        username: "하루 시작봇",
        avatar_url: "https://cdn.discordapp.com/attachments/683175932873539589/689459371151065088/message-3592640_1280.jpg",
        content: `${today}의 하루 시작을 위한 날씨 예측를 알려드립니다.`,
        embeds: [],
    };
    message2.embeds.push({
        color: 0x928bff,
        fields: [
            {
                name: `🌡 ${formatDate(moment_timezone_1.default(weather.forecast[0].dt * 1000).tz("Asia/Seoul"))}온도 / 서울`,
                value: weather.forecast[0].temp + "",
                inline: true
            },
            {
                name: `🌡 ${formatDate(moment_timezone_1.default(weather.forecast[1].dt * 1000).tz("Asia/Seoul"))}온도 / 서울`,
                value: weather.forecast[1].temp + "",
                inline: true
            },
            {
                name: `🌡 ${formatDate(moment_timezone_1.default(weather.forecast[2].dt * 1000).tz("Asia/Seoul"))}온도 / 서울`,
                value: weather.forecast[2].temp + "",
                inline: true
            }
        ]
    });
    let message3 = {
        username: "하루 시작봇",
        avatar_url: "https://cdn.discordapp.com/attachments/683175932873539589/689459371151065088/message-3592640_1280.jpg",
        content: `${today}의 하루 시작을 위한 뉴스를 알려드립니다.`,
        embeds: [],
    };
    message3.embeds.push({
        color: 0x928bff,
        title: "📰 뉴스 / 구글",
        description: news,
    });
    yield axios_1.default.post(url, message);
    yield axios_1.default.post(url, message2);
    yield axios_1.default.post(url, message3);
});
function formatDate(date) {
    return (date.date() +
        "일 " +
        date.hours() +
        "시 ");
}
