import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

const TOKEN_KEY = "Authorization";

@Injectable()
export class TokenStorage {

    constructor(private router: Router) { }

    signOut() {
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.clear();
    }

    public saveToken(token: string) {
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.setItem(TOKEN_KEY, token);
    }

    public getToken(): string {
        return window.sessionStorage.getItem(TOKEN_KEY);
    }

    public loggedIn() {
        return !!window.sessionStorage.getItem(TOKEN_KEY);
    }

    public logOut() {
        window.sessionStorage.removeItem(TOKEN_KEY);
        this.router.navigate(['/login']);
    }
}
