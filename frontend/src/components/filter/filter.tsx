import { FormItem, Group, Header, NativeSelect } from "@vkontakte/vkui";
import { useDispatch, useSelector } from "../../services/redux-hooks";
import { groupsColorsSelector, groupsFilterSelector } from "../../services/groups-selectors";
import { ChangeEvent } from "react";
import { GROUPS_CHANGE, GROUPS_COLOR_CHANGE, GROUPS_TYPE_OF_GROUP_CHANGE, GROUPS_WITH_FRIENDS_CHANGE } from "../../services/groups-constants";

export function Filter() {
    const colors = useSelector(groupsColorsSelector)
    const filter = useSelector(groupsFilterSelector)
    const dispatch = useDispatch()

    const handleTypeOfGroupChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const typeOfGroup = event.target.value
        if (typeOfGroup === 'true' || typeOfGroup === 'false') {
            dispatch({
                type: GROUPS_TYPE_OF_GROUP_CHANGE,
                closed: typeOfGroup === 'true' ? true : false
            })
        }
        else {
            dispatch({
                type: GROUPS_TYPE_OF_GROUP_CHANGE,
                closed: 'all'
            })
        }

        dispatch({
            type: GROUPS_CHANGE
        })
    }

    const handleWithFriendsChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const friends = event.target.value
        if (friends === 'true' || friends === 'false') {
            dispatch({
                type: GROUPS_WITH_FRIENDS_CHANGE,
                friends: friends === 'true' ? true : false
            })
        }
        else {
            dispatch({
                type: GROUPS_WITH_FRIENDS_CHANGE,
                friends: 'all'
            })
        }

        dispatch({
            type: GROUPS_CHANGE
        })
    }

    const handleColorChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const color = event.target.value
        dispatch({
            type: GROUPS_COLOR_CHANGE,
            color: color
        })

        dispatch({
            type: GROUPS_CHANGE
        })
    }

    return (
        <Group header={<Header>Фильтр</Header>}>
            <FormItem
                top="Тип группы"
                htmlFor="select-id"
            >
                <NativeSelect 
                    id="select-id"
                    onChange={handleTypeOfGroupChange}
                    value={`${filter.closed}`}
                >
                    <option value="all">Все</option>
                    <option value="true">Закрытая</option>
                    <option value="false">Открытая</option>
                </NativeSelect>
            </FormItem>

            <FormItem
                top="Цвет аватарки"
                htmlFor="select-id"
            >
                <NativeSelect 
                    id="select-id"
                    onChange={handleColorChange}
                    value={`${filter.color}`}
                >
                    <option key='all' value='all'>Все</option>
                    {colors.map((color) => {
                            return <option key={color} value={color}>{color}</option>
                    })}
                </NativeSelect>
            </FormItem>

            <FormItem
                top="Друзья в группе"
                htmlFor="select-id"
            >
                <NativeSelect 
                    id="select-id"
                    onChange={handleWithFriendsChange}
                    value={`${filter.friends}`}
                >
                    <option value="all">Все</option>
                    <option value="true">Есть</option>
                    <option value="false">Нет</option>
                </NativeSelect>
            </FormItem>
        </Group>
    )
}