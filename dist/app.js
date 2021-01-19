"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const core = __importStar(require("@actions/core"));
const parser_1 = __importDefault(require("./parser"));
const discord_1 = __importDefault(require("./lib/discord"));
const slack_1 = __importDefault(require("./lib/slack"));
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
        else if (url.includes('hooks.slack.com')) { //slack webhook
            yield slack_1.default({
                weather: parsed.weather,
                news: parsed.news.slackContent,
                date: parsed.date,
                url,
            });
        }
    }));
    console.log('✅ 웹훅 발송 완료');
}))().catch(e => {
    console.error(e);
    core.setFailed(e);
});
