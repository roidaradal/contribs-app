import type { DataResult, DevContribs, DevInfo, Nullable } from "./types";

export const fetchDevContribs = async (inputDate: string, devsURL: string, force: boolean): Promise<Nullable<DevContribs>> => {
    const apiURL = import.meta.env.VITE_API_URL;
    const tail = force ? '&force=true' : '';
    const url = `${apiURL}/contribs/${inputDate}?devs=${devsURL}${tail}`;
    const result = await fetchData<DataResult<Nullable<DevContribs>>>(url);
    return result.data;
};

export const fetchDevInfo = async (username: string): Promise<DevInfo> => {
    const url = `https://api.github.com/users/${username}`;
    const raw = await fetchData<DevInfo>(url);
    return {
        avatar_url: raw.avatar_url,
        name: raw.name,
        public_repos: raw.public_repos,
        followers: raw.followers, 
        following: raw.following, 
        created_at: raw.created_at.slice(0, 10),
    };
};

const fetchData = async <T>(url: string): Promise<T> => {
    const resp = await fetch(url);
    return await resp.json() as T;
}