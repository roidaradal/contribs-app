import type { DataResult, DevContribs, Nullable } from "./types";

export const fetchDevContribs = async (inputDate: string, devsURL: string): Promise<Nullable<DevContribs>> => {
    const apiURL = import.meta.env.VITE_API_URL;
    const url = `${apiURL}/contribs/${inputDate}?devs=${devsURL}`;
    const resp = await fetch(url);
    const body = await resp.text();
    const result: DataResult<Nullable<DevContribs>> = JSON.parse(body);
    return result.data;
};