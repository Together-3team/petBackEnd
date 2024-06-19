"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_jwt_1 = require("passport-jwt");
const passport_jwt_2 = require("passport-jwt");
const repositories_1 = require("../repositories");
const passport_1 = __importDefault(require("passport"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const userRepository = new repositories_1.UserRepository();
passport_1.default.use(new passport_jwt_1.Strategy({
    secretOrKey: process.env.JWT_SECRET_KEY || '',
    jwtFromRequest: passport_jwt_2.ExtractJwt.fromAuthHeaderAsBearerToken()
}, async (payload, done) => {
    try {
        if (payload.type !== 'access')
            return done(null, false, { message: "accessToken이 필요합니다" });
        const user = await userRepository.findUserById(payload.id);
        if (!user)
            return done(null, false, { message: "로그인이 필요합니다" });
        return done(null, user);
    }
    catch (err) {
        return done(err);
    }
}));
