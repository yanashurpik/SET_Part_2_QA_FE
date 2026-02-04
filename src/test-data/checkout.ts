export interface CheckoutInfo {
  firstName: string;
  lastName: string;
  postalCode: string;
}

export const DEFAULT_CHECKOUT_INFO: CheckoutInfo = {
  firstName: 'John',
  lastName: 'Doe',
  postalCode: '12345',
};

export const LONG_TEXT_CHECKOUT_INFO: CheckoutInfo = {
  firstName: 'A'.repeat(100),
  lastName: 'B'.repeat(100),
  postalCode: 'C'.repeat(100),
};
