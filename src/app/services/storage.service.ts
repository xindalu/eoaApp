import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  private getKey(key: string) {
    return environment.storagePrefix + key;
  }
  public add(key: string, value: string) {
    let encryptedData = CryptoJS.AES.encrypt(
      value,
      environment.storageSecret
    ).toString();

    localStorage.removeItem(this.getKey(key));

    return localStorage.setItem(this.getKey(key), encryptedData);
  }

  public get(key: string) {
    let encryptedValue = localStorage.getItem(this.getKey(key)),
      decryptedValue = '';

    if (encryptedValue) {
      decryptedValue = CryptoJS.AES.decrypt(
        encryptedValue,
        environment.storageSecret
      ).toString(CryptoJS.enc.Utf8);
    }

    return decryptedValue;
  }

  public remove(key: string) {
    return localStorage.removeItem(this.getKey(key));
  }

  public clear() {
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i).indexOf(environment.storagePrefix) >= 0) {
        localStorage.removeItem(localStorage.key(i));
      }
    }
  }
}
