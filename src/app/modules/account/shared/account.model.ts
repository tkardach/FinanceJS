
export enum Currency {
    USD = 1,
    EUR = 2,
    JPY = 3,
    CAD = 4
}

export interface Account {
    id: number,
    name: string,
    currency: Currency
}

export interface CreateAccount {
    name: string,
    currency: Currency
}