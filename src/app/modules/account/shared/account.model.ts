
export enum Currency {
    USD = 1,
    EUR = 2,
    JPY = 3,
    CAD = 5
}

export interface Account {
    id: number,
    name: string,
    currency: Currency
}