import { Injectable } from '@angular/core';
import { LOCAL_STORAGE, SESSION_STORAGE } from '../constants';
import { DEFAULT_EXPIRY, Expiry } from '../models/browser-storage.model';

@Injectable({
  providedIn: 'root',
})
export class BrowserStorageService {
  localGet(key: LOCAL_STORAGE) {
    return this.getItem(localStorage, key.toString());
  }

  localSet(key: LOCAL_STORAGE, value: string, expiry: Expiry = DEFAULT_EXPIRY) {
    const formattedValue = this.toFormattedValue(value, this.toExpiryIsoString(expiry));
    localStorage.setItem(key.toString(), formattedValue);
  }

  sessionGet(key: SESSION_STORAGE) {
    return this.getItem(sessionStorage, key.toString());
  }

  sessionSet(key: SESSION_STORAGE, value: string, expiry: Expiry = DEFAULT_EXPIRY) {
    const formattedValue = this.toFormattedValue(value, this.toExpiryIsoString(expiry));
    sessionStorage.setItem(key.toString(), formattedValue);
  }

  clear() {
    localStorage.clear();
    sessionStorage.clear();
  }

  private getItem(storage: Storage, key: string) {
    const item = storage.getItem(key);

    if (!item) return null;

    const [expireIsoString, value] = item.split('|');
    if (new Date() > new Date(expireIsoString)) {
      storage.removeItem(key);
      return null;
    }

    return value;
  }

  private toFormattedValue(value: string, expireIsoString: string) {
    return `${expireIsoString}|${value}`;
  }

  private toExpiryIsoString(expiry: Expiry) {
    return new Date(Date.now() + expiry.unit * Math.abs(expiry.amt)).toISOString();
  }
}
