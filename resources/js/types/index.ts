export * from './auth';

import type { Auth } from './auth';

export type AppPageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    name: string;
    auth: Auth;
    [key: string]: unknown;
};

export interface Product {
    id: number,
    name: string,
    description: string,
    short_description: string,
    price: number,
    formatted_price: string,
    category_id: number,
    category: {
        id: number,
        name: string,
    }
}
