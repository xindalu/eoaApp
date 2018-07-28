import { Injectable } from '@angular/core';
import {StorageService} from "./storage.service";
import {Router} from "@angular/router";

const AUTHORIZATION_KEY = 'currentUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  expireTime = 3600 * 2 * 1000;

  constructor(
    private router: Router,
    private storageService: StorageService
  ) {

  }

  public isLogined() {
    return !!this.getToken();
  }

  public getToken() {
    let tokenString = this.storageService.get(AUTHORIZATION_KEY);

    if (tokenString) {
      let tokenData = JSON.parse(tokenString);
      return tokenData && this.isLoginExpired(tokenData) && tokenData.access_token;
    }

    return null;
  }

  private isLoginExpired(tokenData: any) {
    if (tokenData.expireAt && tokenData.expireAt > new Date().getTime()) {
      return this.loginSuccess(tokenData, tokenData.user_email);
    } else {
      this.logout();
    }
  }

  public getUserInfo() {
    let tokenString = this.storageService.get(AUTHORIZATION_KEY);

    if (tokenString) {
      let tokenData = JSON.parse(tokenString);
      if (tokenData && tokenData.user_email) {
        return {
          username: tokenData.user_email.substring(0, tokenData.user_email.indexOf('@')),
          userEmail: tokenData.user_email
        };
      }
    }

    return {
      username: null,
      userEmail: null
    };
  }

  public login(username: string, password: string) {
    if (username === 'demo' && password === 'demo123') {
      return this.loginSuccess({
        access_token: 'demo',
        token_type: 'bearer',
        refresh_token: 'demo'
      }, username);
    } else {
      return false;
    }
  }

  public logout() {
    this.storageService.clear();
    this.router.navigate(['login']);
  }

  private loginSuccess(response, username): boolean {
    // login successful if there's a JWT token in the response
    if (response && response['access_token']) {
      this.storageService.add(AUTHORIZATION_KEY, JSON.stringify({
        user_email: username + '@cscec.com',
        access_token: response['access_token'],
        token_type: response['token_type'],
        refresh_token: response['refresh_token'],
        expireAt: new Date().getTime() + this.expireTime
      }));
      return true;
    } else {
      return false;
    }
  }

}
