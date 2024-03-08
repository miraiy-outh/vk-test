import { Avatar, Banner, Button, Panel} from "@vkontakte/vkui";
import { Filter } from "./filter/filter";
import { getGroups } from "../api";
import { useDispatch, useSelector} from "../services/redux-hooks";
import { useEffect } from "react";
import { GROUPS_ERROR_CHANGE, GROUPS_INIT, GROUPS_LOADING_CHANGE } from "../services/groups-constants";
import { Groups } from "./groups/groups";
import { groupsErrorSelector } from "../services/groups-selectors";
const warningGradient = 'linear-gradient(90deg, #ffb73d 0%, #ffa000 100%)';

export function GroupPanel() {
    const dispatch = useDispatch()
    const isError = useSelector(groupsErrorSelector)

    const handlePageReload = () => {
        location.reload();
    }

    useEffect(() => {
        getGroups().then((data) => {
               const groups = data.data
               if (data.result === 0 || groups === undefined) {
                    dispatch({
                        type: GROUPS_ERROR_CHANGE
                    })
               }
               if (groups !== undefined) {
                    dispatch({
                        type: GROUPS_INIT,
                        groups: groups
                    })
               }

               dispatch({
                type: GROUPS_LOADING_CHANGE
                })
        })
    }, [])

    return (
        <Panel>
            <Filter/>
            {
                isError ? <Banner
                            before={
                                <Avatar size={28} style={{ backgroundImage: warningGradient }}>
                                    <span style={{ color: '#fff' }}>!</span>
                                </Avatar>
                            }
                            header="Ошибка получения данных"
                            actions={<Button onClick={handlePageReload}>Перезагрузить страницу</Button>}
                        /> : <Groups/>
            }
        </Panel> 
    )
}