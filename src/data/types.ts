export type Nullable<T> = T | null;
export type ObjectMap<T> = {[key: string]: T};

export type DataResult<T> = {
    data: Nullable<T>
    message: string
};

export type MonthContribs = ObjectMap<[number,number]>;

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
    name: Nullable<string>, 
    public_repos: number,
    followers: number, 
    following: number,
    created_at: string,
};