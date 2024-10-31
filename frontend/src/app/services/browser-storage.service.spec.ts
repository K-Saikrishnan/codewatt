import { TestBed } from '@angular/core/testing';

import { LOCAL_STORAGE, SESSION_STORAGE } from '../constants';
import { Expiry, ExpiryUnit } from '../models/browser-storage.model';
import { BrowserStorageService } from './browser-storage.service';

describe('BrowserStorageService', () => {
  let service: BrowserStorageService;
  const VALUE = 'VALUE',
    EXPIRY: Expiry = { amt: 1, unit: ExpiryUnit.SECOND },
    baseTime = new Date(),
    clock = jasmine.clock();

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrowserStorageService);

    clock.install();
    clock.mockDate(baseTime);
    localStorage.clear();
    sessionStorage.clear();
  });

  afterEach(() => {
    clock.uninstall();
    localStorage.clear();
    sessionStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get localStorage', () => {
    service.localSet(LOCAL_STORAGE.PLACEHOLDER, VALUE);

    expect(service.localGet(LOCAL_STORAGE.PLACEHOLDER)).toBe(VALUE);
  });

  it('should set and get sessionStorage', () => {
    service.sessionSet(SESSION_STORAGE.PLACEHOLDER, VALUE);

    expect(service.sessionGet(SESSION_STORAGE.PLACEHOLDER)).toBe(VALUE);
  });

  it('should clear localStorage and sessionStorage', () => {
    service.clear();

    expect(localStorage.length).toBe(0);
    expect(sessionStorage.length).toBe(0);
  });

  it('should return null for no value in localStorage', () => {
    expect(service.localGet(LOCAL_STORAGE.PLACEHOLDER)).toBeNull();
  });

  it('should return null for no value in sessionStorage', () => {
    expect(service.sessionGet(SESSION_STORAGE.PLACEHOLDER)).toBeNull();
  });

  it('should clear localStorage after expiry', () => {
    service.localSet(LOCAL_STORAGE.PLACEHOLDER, VALUE, EXPIRY);

    jasmine.clock().tick(1200);

    expect(service.localGet(LOCAL_STORAGE.PLACEHOLDER)).toBeNull();
  });

  it('should clear sessionStorage after expiry', () => {
    service.sessionSet(SESSION_STORAGE.PLACEHOLDER, VALUE, EXPIRY);

    jasmine.clock().tick(1200);

    expect(service.sessionGet(SESSION_STORAGE.PLACEHOLDER)).toBeNull();
  });
});
