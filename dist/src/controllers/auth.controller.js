"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
const repositories_1 = require("../repositories");
const axios_1 = __importDefault(require("axios"));
const querystring_1 = __importDefault(require("querystring"));
(0, dotenv_1.config)();
class AuthController {
    constructor() {
        this.userRepository = new repositories_1.UserRepository();
        this.login = (id) => {
            const accessToken = jsonwebtoken_1.default.sign({ id, type: 'access' }, process.env.JWT_SECRET_KEY || '', { expiresIn: '2 hours' });
            const refreshToken = jsonwebtoken_1.default.sign({ id, type: 'refresh' }, process.env.JWT_SECRET_KEY || '', { expiresIn: '7 days' });
            return { accessToken, refreshToken };
        };
        this.authenticateCallback = async (req, res, profile) => {
            try {
                if (!profile)
                    res.status(404).json({ message: '로그인에 실패했습니다' });
                else {
                    const user = await this.userRepository.findUserBySNS(profile.snsId, profile.provider);
                    if (user) {
                        const response = {
                            registered: true,
                            ...this.login(user.id)
                        };
                        res.json(response);
                    }
                    else {
                        const profileToken = jsonwebtoken_1.default.sign({ profile }, process.env.JWT_SECRET_KEY || '', { expiresIn: '30 minutes' });
                        const response = {
                            registered: false,
                            email: profile.email,
                            profileToken
                        };
                        res.json(response);
                    }
                }
            }
            catch (error) {
                const errorMessage = error.message;
                res.status(500).json({ error: errorMessage });
            }
        };
        this.authenticateGoogle = async (req, res) => {
            try {
                if (req.query.error === 'access_denied')
                    return res.status(404).json({ message: "google OAuth2 로그인 액세스 요청을 거부하였습니다" });
                const tokenResponse = await axios_1.default.post('https://oauth2.googleapis.com/token', querystring_1.default.stringify({
                    code: req.query.code,
                    client_id: process.env.GOOGLE_CLIENT_ID,
                    client_secret: process.env.GOOGLE_CLIENT_SECRET,
                    redirect_uri: process.env.GOOGLE_CALLBACK_URL,
                    grant_type: 'authorization_code'
                }), {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                });
                const profileResponse = await axios_1.default.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokenResponse.data.access_token}`);
                const profile = {
                    snsId: profileResponse.data.id,
                    email: profileResponse.data.email,
                    profileImage: profileResponse.data.picture,
                    provider: 'google'
                };
                this.authenticateCallback(req, res, profile);
            }
            catch (error) {
                if (axios_1.default.isAxiosError(error)) {
                    const errorMessage = error.response?.data || error.message;
                    res.status(error.response?.status || 500).json({ error: errorMessage });
                }
                else {
                    const errorMessage = error.message;
                    res.status(500).json({ error: errorMessage });
                }
            }
        };
        this.authenticateKakao = async (req, res) => {
            try {
                const tokenResponse = await axios_1.default.post('https://kauth.kakao.com/oauth/token'
                    + `?${encodeURIComponent('code')}=${encodeURIComponent(req.query.code)}`
                    + `&${encodeURIComponent('client_id')}=${encodeURIComponent(process.env.KAKAO_CLIENT_ID || '')}`
                    + `&${encodeURIComponent('redirect_uri')}=${encodeURIComponent(process.env.KAKAO_CALLBACK_URL || '')}`
                    + `&${encodeURIComponent('grant_type')}=${encodeURIComponent('authorization_code')}`, {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                });
                const profileResponse = await axios_1.default.get(`https://kapi.kakao.com/v2/user/me`, {
                    headers: { 'Authorization': `Bearer ${tokenResponse.data.access_token}` }
                });
                const profile = {
                    snsId: profileResponse.data.id,
                    email: profileResponse.data.kakao_account.email,
                    profileImage: profileResponse.data.properties.profile_image,
                    provider: 'kakao'
                };
                this.authenticateCallback(req, res, profile);
            }
            catch (error) {
                if (axios_1.default.isAxiosError(error)) {
                    const errorMessage = error.response?.data || error.message;
                    res.status(error.response?.status || 500).json({ error: errorMessage });
                }
                else {
                    const errorMessage = error.message;
                    res.status(500).json({ error: errorMessage });
                }
            }
        };
        this.register = async (req, res) => {
            try {
                const payload = jsonwebtoken_1.default.verify(req.body.profileToken, process.env.JWT_SECRET_KEY || '');
                const profile = payload.profile;
                const user = await this.userRepository.findUserBySNS(profile.snsId, profile.provider);
                if (user)
                    return res.status(403).json({ message: "이미 회원 가입이 완료된 계정입니다" });
                const newUser = await this.userRepository.createUser({
                    ...profile,
                    nickname: req.body.nickname,
                    phoneNumber: req.body.phoneNumber,
                    isSubscribedToPromotions: req.body.isSubscribedToPromotions
                });
                const response = this.login(newUser.id);
                res.redirect;
                res.status(201).json(response);
            }
            catch (error) {
                const errorMessage = error.message;
                res.status(500).json({ error: errorMessage });
            }
        };
        this.refresh = (req, res) => {
            try {
                const payload = jsonwebtoken_1.default.verify(req.body.refreshToken, process.env.JWT_SECRET_KEY || '');
                const id = payload.id;
                if (payload.type !== "refresh")
                    res.status(500).json("refreshToken이 필요합니다");
                else {
                    const response = this.login(id);
                    res.json(response);
                }
            }
            catch (error) {
                const errorMessage = error.message;
                res.status(500).json({ error: errorMessage });
            }
        };
    }
}
exports.AuthController = AuthController;
