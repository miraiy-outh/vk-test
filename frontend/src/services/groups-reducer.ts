import { GROUPS_CHANGE, GROUPS_COLOR_CHANGE, GROUPS_INIT, GROUPS_TYPE_OF_GROUP_CHANGE } from "./groups-constants"

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

type TGroupsColorFilterChangeAction = {
    type: typeof GROUPS_COLOR_CHANGE,
    color: string
}

type TGroupsTypeOfGroupFilterChangeAction = {
    type: typeof GROUPS_TYPE_OF_GROUP_CHANGE,
    closed: boolean | 'all'
}

type TGroupsActions = TGroupsInitAction | TGroupsChangeAction | TGroupsColorFilterChangeAction | TGroupsTypeOfGroupFilterChangeAction

const defaultState: TGroupsState = {
    groups: [],
    filteredGroups: [],
    filter: {
        closed: 'all',
        color: 'all'
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

        case GROUPS_CHANGE: {
            let filteredGroups = []
            if (state.filter.closed !== 'all' && state.filter.color !== 'all') {
                filteredGroups = state.groups.filter((group) => {
                        return group.closed === state.filter.closed && group.avatar_color === state.filter.color  
                })

                return {
                    ...state,
                    filteredGroups
                }
            }

            if (state.filter.closed !== 'all') {
                filteredGroups = state.groups.filter((group) => {
                    return group.closed === state.filter.closed  
                })

                return {
                    ...state,
                    filteredGroups
                }
            }

            if (state.filter.color !== 'all') {
                filteredGroups = state.groups.filter((group) => {
                    return group.avatar_color === state.filter.color  
                })

                return {
                    ...state,
                    filteredGroups
                }
            }

            return {
                ...state,
                filteredGroups: state.groups
            }
        }

        default:
            return state
    }
}