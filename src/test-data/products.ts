export enum ProductKey {
  BACKPACK = 'backpack',
  BIKE_LIGHT = 'bike_light',
  BOLT_TSHIRT = 'bolt_tshirt',
  FLEECE_JACKET = 'fleece_jacket',
  ONESIE = 'onesie',
  RED_TSHIRT = 'red_tshirt',
}

export interface ProductData {
  name: string;
  price: string;
}

export const PRODUCTS: Record<ProductKey, ProductData> = {
  [ProductKey.BACKPACK]: {
    name: 'Sauce Labs Backpack',
    price: '$29.99',
  },
  [ProductKey.BIKE_LIGHT]: {
    name: 'Sauce Labs Bike Light',
    price: '$9.99',
  },
  [ProductKey.BOLT_TSHIRT]: {
    name: 'Sauce Labs Bolt T-Shirt',
    price: '$15.99',
  },
  [ProductKey.FLEECE_JACKET]: {
    name: 'Sauce Labs Fleece Jacket',
    price: '$49.99',
  },
  [ProductKey.ONESIE]: {
    name: 'Sauce Labs Onesie',
    price: '$7.99',
  },
  [ProductKey.RED_TSHIRT]: {
    name: 'T-Shirt (Red)',
    price: '$15.99',
  },
};

export type SortOption = 'az' | 'za' | 'lohi' | 'hilo';

export const SORT_OPTIONS: Record<string, SortOption> = {
  'Name (A to Z)': 'az',
  'Name (Z to A)': 'za',
  'Price (low to high)': 'lohi',
  'Price (high to low)': 'hilo',
};
