"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_kakao_1 = require("passport-kakao");
const dotenv_1 = require("dotenv");
const dtos_1 = require("../dtos");
(0, dotenv_1.config)();
passport_1.default.use(new passport_kakao_1.Strategy({
    clientID: process.env.KAKAO_CLIENT_ID || '',
    callbackURL: process.env.KAKAO_CALLBACK_URL || ''
}, (accessToken, refreshToken, profile, done) => {
    const kakaoProfile = new dtos_1.ProfileDto(profile.id, profile.provider, profile._json.kakao_account.email, profile._json.properties.profile_image || 'https://review-image-3team.s3.ap-northeast-2.amazonaws.com/f066016b-da8d-4513-b7b0-0cf6d5d684a0.png');
    return done(null, kakaoProfile);
}));
