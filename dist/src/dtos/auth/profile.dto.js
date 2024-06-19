"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileDto = void 0;
class ProfileDto {
    constructor(snsId, provider, email, profileImage) {
        this.snsId = '';
        this.provider = '';
        this.email = '';
        this.profileImage = '';
        this.snsId = snsId;
        this.provider = provider;
        this.email = email;
        this.profileImage = profileImage;
    }
}
exports.ProfileDto = ProfileDto;
