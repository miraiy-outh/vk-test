import { Panel } from "@vkontakte/vkui";
import { Filter } from "./filter/filter";
import { getGroups } from "../api";
import { useDispatch } from "../services/redux-hooks";
import { useEffect } from "react";
import { GROUPS_INIT } from "../services/groups-constants";
import { Groups } from "./groups/groups";

export function GroupPanel() {
    const dispatch = useDispatch()
    useEffect(() => {
        getGroups().then((data) => {
               const groups = data.data
               if (groups !== undefined) {
                    dispatch({
                        type: GROUPS_INIT,
                        groups: groups
                    })
               } 
        })
    }, [])

    return (
        <Panel>
            <Filter></Filter>
            <Groups></Groups>
        </Panel>
    )
}