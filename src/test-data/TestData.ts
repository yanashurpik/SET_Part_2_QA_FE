export enum UserIdentity {
    STANDARD_USER = 'standard_user',
    LOCKED_OUT_USER = 'locked_out_user',
    PROBLEM_USER = 'problem_user',
    PERFORMANCE_GLITCH_USER = 'performance_glitch_user',
    VISUAL_USER = 'visual_user',
    ERROR_USER = 'error_user',
    INVALID_USER = 'invalid_user',
}

export enum ProductKey {
    BACKPACK = 'backpack',
    BIKE_LIGHT = 'bike_light',
    BOLT_TSHIRT = 'bolt_tshirt',
    FLEECE_JACKET = 'fleece_jacket',
    ONESIE = 'onesie',
    RED_TSHIRT = 'red_tshirt',
}

export interface UserCredential {
    username: string;
    password?: string;
}

export interface ProductData {
    name: string;
    price: string;
}

export interface CheckoutInfo {
    firstName: string;
    lastName: string;
    postalCode: string;
}

export const USERS: Record<UserIdentity, UserCredential> = {
    [UserIdentity.STANDARD_USER]: {
        username: 'standard_user',
        password: 'secret_sauce',
    },
    [UserIdentity.LOCKED_OUT_USER]: {
        username: 'locked_out_user',
        password: 'secret_sauce',
    },
    [UserIdentity.PROBLEM_USER]: {
        username: 'problem_user',
        password: 'secret_sauce',
    },
    [UserIdentity.PERFORMANCE_GLITCH_USER]: {
        username: 'performance_glitch_user',
        password: 'secret_sauce',
    },
    [UserIdentity.VISUAL_USER]: {
        username: 'visual_user',
        password: 'secret_sauce',
    },
    [UserIdentity.ERROR_USER]: {
        username: 'error_user',
        password: 'secret_sauce',
    },
    [UserIdentity.INVALID_USER]: {
        username: 'invalid_user',
        password: 'secret_sauce',
    },
};

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
