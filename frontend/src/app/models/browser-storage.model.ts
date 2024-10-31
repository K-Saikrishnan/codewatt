export enum ExpiryUnit {
  SECOND = 1000,
  MINUTE = SECOND * 60,
  HOUR = MINUTE * 60,
  DAY = HOUR * 24,
  WEEK = DAY * 7,
  MONTH = DAY * 30,
}

export interface Expiry {
  unit: ExpiryUnit;
  amt: number;
}
export const DEFAULT_EXPIRY: Expiry = Object.freeze({ unit: ExpiryUnit.DAY, amt: 1 });
