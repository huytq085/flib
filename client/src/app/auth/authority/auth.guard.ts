import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { TokenStorage } from "./token.storage";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private tokenStorage: TokenStorage,
        private router: Router
    ) {}
    canActivate(): boolean {
        if (this.tokenStorage.loggedIn()) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}