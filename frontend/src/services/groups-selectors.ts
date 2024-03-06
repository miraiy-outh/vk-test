import { RootState } from "./store";

export function groupsSelector(state: RootState) {
    return state.groupsData.filteredGroups
}

export function groupsFilterSelector(state: RootState) {
    return state.groupsData.filter
}

export function groupsColorsSelector(state: RootState) {
    return state.groupsData.colors
}

export function groupsLoadingSelector(state: RootState) {
    return state.groupsData.isLoading
}