"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parser = void 0;
const date_json_1 = __importDefault(require("./data/date.json"));
exports.parser = () => {
    const date = new Date();
    const today = `${date.getMonth() + 1}-${date.getDate()}`;
    console.log('✅ 날짜 파싱 완료');
    return date_json_1.default[today] || null;
};
