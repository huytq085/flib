import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

const TOKEN_KEY = "Authorization";

@Injectable()
export class TokenStorage {

    constructor(private router: Router) { }

    signOut() {
        window.localStorage.removeItem(TOKEN_KEY);
        window.localStorage.clear();
    }

    public saveToken(token: string) {
        window.localStorage.removeItem(TOKEN_KEY);
        window.localStorage.setItem(TOKEN_KEY, token);
    }

    public getToken(): string {
        return window.localStorage.getItem(TOKEN_KEY);
    }

    public loggedIn() {
        return !!window.localStorage.getItem(TOKEN_KEY);
    }

    public logOut() {
        window.localStorage.removeItem(TOKEN_KEY);
        this.router.navigate(['/login']);
    }
}
