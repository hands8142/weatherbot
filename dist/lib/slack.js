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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
exports.default = (function (_a) {
    var weather = _a.weather, news = _a.news, date = _a.date, url = _a.url;
    return __awaiter(void 0, void 0, void 0, function () {
        var today, message;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    today = new Date().toLocaleDateString().replace(/\. /g, '-').replace('.', '');
                    message = {
                        attachments: [],
                    };
                    message.attachments.push({
                        color: '#928BFF',
                        pretext: "\uD83D\uDCE8 " + today + " \uD3B8\uC9C0\uAC00 \uC654\uC5B4\uC694!",
                        fields: [
                            {
                                title: '📅 날짜 / 한국',
                                value: today + " " + (date ? '(' + date + ')' : ''),
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
                    return [4 /*yield*/, axios_1.default.post(url, message)];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
});
