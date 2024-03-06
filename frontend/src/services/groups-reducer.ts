import { GROUPS_CHANGE, GROUPS_FILTER_CHANGE, GROUPS_INIT } from "./groups-constants"

type TUser = {
    first_name: string,
    last_name: string
}

type TGroups = {
    id: number,
    name: string,
    closed: boolean,
    avatar_color?: string,
    members_count: number,
    friends?: TUser[]
}

type TFilter = {
    closed: boolean | 'all',
    color: string
}

type TGroupsState = {
    groups: TGroups[],
    filteredGroups: TGroups[],
    filter: TFilter,
    colors: string[],
    isLoading: boolean
}

type TGroupsInitAction = {
    type: typeof GROUPS_INIT,
    groups: TGroups[]
}

type TGroupsChangeAction = {
    type: typeof GROUPS_CHANGE
}

type TGroupsFilterGetAction = {
    type: typeof GROUPS_FILTER_CHANGE,
    closed: boolean | 'all',
    color: string
}

type TGroupsActions = TGroupsInitAction | TGroupsChangeAction | TGroupsFilterGetAction

const defaultState: TGroupsState = {
    groups: [],
    filteredGroups: [],
    filter: {
        closed: 'all',
        color: ''
    },
    colors: [],
    isLoading: true
}

export function groupsReducer(state = defaultState, action: TGroupsActions): TGroupsState {
    switch (action.type) {
        case GROUPS_INIT: {
            const groups = action.groups
            const filteredGroups = action.groups
            const colors: string[] = groups.reduce((acc: string[], group: TGroups) => {
                if (group.avatar_color && !acc.includes(group.avatar_color)) {
                    acc.push(group.avatar_color);
                }
                return acc;
            }, []);

            return {
                ...state,
                groups,
                filteredGroups,
                colors
            }
        }

        case GROUPS_FILTER_CHANGE: {
            return {
                ...state,
                filter: {
                    closed: action.closed,
                    color: action.color
                }
            }
        }

        case GROUPS_CHANGE: {
            const filteredGroups = state.groups.filter((group) => {
                return group.closed === state.filter.closed && group.avatar_color === state.filter.color  
            })

            return {
                ...state,
                filteredGroups
            }
        }

        default:
            return state
    }
}