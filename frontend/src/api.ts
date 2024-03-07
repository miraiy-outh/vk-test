import { GetGroupsResponse } from "./types";

const url = 'http://localhost:3000/api/groups'

export async function getGroups(): Promise<GetGroupsResponse> {
    const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
    }
    const response = await fetch(url, requestOptions)
    const result =  await response.json()
    return result;
}