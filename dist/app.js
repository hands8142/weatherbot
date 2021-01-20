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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const parser_1 = __importDefault(require("./parser"));
const discord_1 = __importDefault(require("./lib/discord"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    const WEBHOOKS = process.env.WEBHOOKS;
    if (WEBHOOKS == null)
        throw new Error('웹훅 리스트를 찾을 수 없어요.');
    const webhookList = WEBHOOKS.split(',');
    const parsed = yield parser_1.default();
    webhookList.map((url) => __awaiter(void 0, void 0, void 0, function* () {
        if (url.includes('discord.com') || url.includes("discordapp.com")) { // discord webhook
            yield discord_1.default({
                weather: parsed.weather,
                news: parsed.news.discordContent,
                date: parsed.date,
                url,
            });
        }
        else {
            console.log("웹훅이 이상합니다.");
        }
    }));
    console.log('✅ 웹훅 발송 완료');
}))().catch(e => {
    console.error(e);
    core.setFailed(e);
});
