import { TGroups } from "./services/groups-reducer"

export interface GetGroupsResponse {
    result: 1 | 0,
    data?: TGroups[]
}