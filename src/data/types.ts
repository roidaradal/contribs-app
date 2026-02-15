export type Nullable<T> = T | null;

export type DataResult<T> = {
    data: Nullable<T>
    message: string
};

export type MonthContribs = {[key: string] : [number, number]};

export type DevContribs = {
    date: string
    contribs: {[key: string]: MonthContribs}
};