export class ProfileDto {
    snsId: string= '';
    provider: string = '';
    email: string = '';
    profileImage: string = '';

    constructor(snsId: string, provider: string, email: string, profileImage: string) {
        this.snsId = snsId;
        this.provider = provider;
        this.email = email;
        this.profileImage = profileImage;
    }
}