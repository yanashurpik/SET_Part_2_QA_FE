import { USERS, PRODUCTS, DEFAULT_CHECKOUT_INFO, LONG_TEXT_CHECKOUT_INFO, UserIdentity, ProductKey, UserCredential, ProductData, CheckoutInfo } from '../test-data/TestData';

export class DataManager {
    /**
     * Retrieves default checkout information.
     */
    static getCheckoutInfo(): CheckoutInfo {
        return DEFAULT_CHECKOUT_INFO;
    }

    /**
     * Retrieves checkout information with long strings.
     */
    static getLongTextCheckoutInfo(): CheckoutInfo {
        return LONG_TEXT_CHECKOUT_INFO;
    }
    /**
     * Retrieves user credentials by key (e.g., 'standard_user', 'locked_out_user').
     */
    static getUser(userKey: string | UserIdentity): UserCredential {
        const user = USERS[userKey as UserIdentity];
        if (!user) {
            throw new Error(`User with key "${userKey}" not found in TestData.ts`);
        }
        return user;
    }

    /**
     * Retrieves product data by key (e.g., 'backpack', 'onesie').
     */
    static getProduct(productKey: string | ProductKey): ProductData {
        const product = PRODUCTS[productKey as ProductKey];
        if (!product) {
            throw new Error(`Product with key "${productKey}" not found in TestData.ts`);
        }
        return product;
    }

    /**
     * Maps a descriptive product name to its data.
     */
    static getProductByName(name: string): ProductData {
        const product = Object.values(PRODUCTS).find(p => p.name === name);
        if (!product) {
            throw new Error(`Product with name "${name}" not found in TestData.ts`);
        }
        return product;
    }
}
