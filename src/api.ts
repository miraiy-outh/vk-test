import { delay } from "./utils/delay";
import { GetGroupsResponse } from "./types";

export async function getGroups(): Promise<GetGroupsResponse> {
    const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
    }
    try {
      await delay(1000);
      const response = await fetch('./groups.json', requestOptions)
      const data =  await response.json()
      return {
        result: 1,
        data
      }
    }
    catch {
      return {
        result: 0,
        data: []
      }
    }
}

