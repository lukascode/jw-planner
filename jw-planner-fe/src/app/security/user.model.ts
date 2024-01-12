

export class UserDetails {
    email: string;
    darkMode: boolean;
    appVersion: string;

    constructor(email: string, darkMode: boolean, appVersion: string) {
        this.email = email;
        this.darkMode = darkMode;
        this.appVersion = appVersion;
    }
}