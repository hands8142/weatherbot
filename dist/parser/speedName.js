"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const speed_name_json_1 = __importDefault(require("./data/speed_name.json"));
exports.parser = (speed) => {
    let num;
    if (speed >= 0.0 || speed <= 0.2) {
        num = 1;
    }
    else if (speed >= 0.3 || speed <= 1.5) {
        num = 2;
    }
    else if (speed >= 1.6 || speed <= 3.3) {
        num = 3;
    }
    else if (speed >= 3.4 || speed <= 5.4) {
        num = 4;
    }
    else if (speed >= 5.5 || speed <= 7.9) {
        num = 5;
    }
    else if (speed >= 8.0 || speed <= 10.7) {
        num = 6;
    }
    else if (speed >= 10.8 || speed <= 13.8) {
        num = 7;
    }
    else if (speed >= 13.9 || speed <= 17.1) {
        num = 8;
    }
    else if (speed >= 17.2 || speed <= 20.7) {
        num = 9;
    }
    else if (speed >= 20.8 || speed <= 24.4) {
        num = 10;
    }
    else if (speed >= 24.5 || speed <= 28.4) {
        num = 11;
    }
    else if (speed >= 28.5 || speed <= 32.6) {
        num = 12;
    }
    else if (speed >= 32.7) {
        num = 13;
    }
    else {
        num = null;
    }
    console.log("✅ 스피드 이름 파싱 완료");
    return num ? speed_name_json_1.default[num] || null : null;
};
