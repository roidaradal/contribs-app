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

export type Week = {
    index: number, 
    name: string,
};

export type DevTotal = {
    dev: string, 
    total: number,
};

export type DevInfo = {
    avatar_url: string,
    name: string, 
    public_repos: number,
    followers: number, 
    following: number,
};