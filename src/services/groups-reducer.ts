import { GROUPS_CHANGE, GROUPS_COLOR_CHANGE, GROUPS_ERROR_CHANGE, GROUPS_INIT, GROUPS_LOADING_CHANGE, GROUPS_TYPE_OF_GROUP_CHANGE, GROUPS_WITH_FRIENDS_CHANGE } from "./groups-constants"

type TUser = {
    first_name: string,
    last_name: string
}

export type TGroups = {
    id: number,
    name: string,
    closed: boolean,
    avatar_color?: string,
    members_count: number,
    friends?: TUser[]
}

type TFilter = {
    closed: boolean | 'all',
    friends: boolean | 'all'
    color: string
}

type TGroupsState = {
    groups: TGroups[],
    filteredGroups: TGroups[],
    filter: TFilter,
    colors: string[],
    isLoading: boolean,
    isError: boolean
}

type TGroupsInitAction = {
    type: typeof GROUPS_INIT,
    groups: TGroups[]
}

type TGroupsChangeAction = {
    type: typeof GROUPS_CHANGE
}

type TGroupsColorFilterChangeAction = {
    type: typeof GROUPS_COLOR_CHANGE,
    color: string
}

type TGroupsTypeOfGroupFilterChangeAction = {
    type: typeof GROUPS_TYPE_OF_GROUP_CHANGE,
    closed: boolean | 'all'
}

type TGroupsWithFriendsFilterChangeAction = {
    type: typeof GROUPS_WITH_FRIENDS_CHANGE,
    friends: boolean | 'all'
}

type TGroupsLoadingChangeAction = {
    type: typeof GROUPS_LOADING_CHANGE
}

type TGroupsErrorChangeAction = {
    type: typeof GROUPS_ERROR_CHANGE
}

type TGroupsActions = TGroupsInitAction | TGroupsChangeAction | TGroupsColorFilterChangeAction | TGroupsTypeOfGroupFilterChangeAction | TGroupsWithFriendsFilterChangeAction | TGroupsLoadingChangeAction | TGroupsErrorChangeAction

const defaultState: TGroupsState = {
    groups: [],
    filteredGroups: [],
    filter: {
        closed: 'all',
        friends: 'all',
        color: 'all'
    },
    colors: [],
    isLoading: true,
    isError: false
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

        case GROUPS_TYPE_OF_GROUP_CHANGE: {
            return {
                ...state,
                filter: {
                    ...state.filter,
                    closed: action.closed
                }
            }
        }

        case GROUPS_COLOR_CHANGE: {
            return {
                ...state,
                filter: {
                    ...state.filter,
                    color: action.color
                }
            }
        }

        case GROUPS_WITH_FRIENDS_CHANGE: {
            return {
                ...state,
                filter: {
                    ...state.filter,
                    friends: action.friends
                }
            }
        }

        case GROUPS_CHANGE: {
            let filteredGroups = state.groups

            if (state.filter.friends === true) {
                filteredGroups = filteredGroups.filter((group) => {
                    return group.friends && group.friends.length > 0
                });
            } 
            
            if (state.filter.friends === false) {
                filteredGroups = filteredGroups.filter((group) => {
                    return !group.friends || group.friends.length === 0
                });
            }

            if (state.filter.closed !== 'all') {
                filteredGroups = filteredGroups.filter((group) => {
                    return group.closed === state.filter.closed  
                })
            }

            if (state.filter.color !== 'all') {
                filteredGroups = filteredGroups.filter((group) => {
                    return group.avatar_color === state.filter.color  
                })
            }

            return {
                ...state,
                filteredGroups
            }
        }

        case GROUPS_LOADING_CHANGE: {
            return {
                ...state,
                isLoading: !state.isLoading
            }
        }

        case GROUPS_ERROR_CHANGE: {
            return {
                ...state,
                isError: !state.isError
            }
        }

        default:
            return state
    }
}