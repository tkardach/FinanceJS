
export enum Timespan {
    Once = 0,
    Daily = 1,
    Weekly = 2,
    Biweekly = 3,
    Monthly = 4,
    HalfYear = 5,
    Yearly = 6
}

export interface Transaction {
    id: number,
    name: string,
    account: number,
    amount: number,
    date: Date,
    recurrence: Timespan
}