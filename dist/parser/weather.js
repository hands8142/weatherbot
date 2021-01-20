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
const weather_json_1 = __importDefault(require("./data/weather.json"));
exports.parse = () => __awaiter(void 0, void 0, void 0, function* () {
    const token = process.env.WEATHER_API_KEY;
    const city = "Seoul";
    const response = yield axios_1.default.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${token}&units=metric`);
    const data = response.data;
    const response2 = yield axios_1.default.get(`http://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${token}&units=metric`);
    const data2 = response2.data;
    const forecast = data2.hourly;
    console.log("✅ 날씨 파싱 완료");
    return {
        weather: weather_json_1.default[data.weather[0].id],
        wind_speed: `${data.wind.speed}m/s`,
        temp: `${data.main.temp}도`,
        temp_min: `${data.main.temp_min}도`,
        temp_max: `${data.main.temp_max}도`,
        feels_like: `${data.main.feels_like}도`,
        pressure: `${data.main.pressure}파스칼(Pa)`,
        humidity: `${data.main.humidity}%`,
        forecast
    };
});
