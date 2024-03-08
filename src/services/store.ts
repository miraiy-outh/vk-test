import { PreloadedState, combineReducers, configureStore } from "@reduxjs/toolkit";
import { groupsReducer } from "./groups-reducer";

const rootReducer = combineReducers({
    groupsData: groupsReducer
})

export function setupStore(preloadedState?: PreloadedState<RootState>) {
    const store = configureStore({
        reducer: rootReducer,
        middleware: [],
        preloadedState
    })

    return store
}

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];