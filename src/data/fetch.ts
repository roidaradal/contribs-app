import type { DataResult, DevContribs, Nullable } from "./types";

export const fetchDevContribs = async (inputDate: string, devsURL: string, force: boolean): Promise<Nullable<DevContribs>> => {
    const apiURL = import.meta.env.VITE_API_URL;
    const tail = force ? '&force=true' : '';
    const url = `${apiURL}/contribs/${inputDate}?devs=${devsURL}${tail}`;
    const resp = await fetch(url);
    const body = await resp.text();
    const result: DataResult<Nullable<DevContribs>> = JSON.parse(body);
    return result.data;
};