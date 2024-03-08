import { Accordion, Avatar, Group, Header, SimpleCell, Spinner } from "@vkontakte/vkui"
import { groupsLoadingSelector, groupsSelector } from "../../services/groups-selectors"
import { useSelector } from "../../services/redux-hooks"
import React from "react";

export function Groups() {
    const [openId, setOpenId] = React.useState(2);
    const groups = useSelector(groupsSelector)
    const isLoading = useSelector(groupsLoadingSelector)

    if (isLoading) {
        return (
            <Spinner size="large"/>
        )
    }
    return (
        <>
        {
            groups.map((group, i) => {
                return <Group key={i}>
                        <SimpleCell
                            before={<Avatar 
                                        size={100}
                                        style={{ backgroundColor: group.avatar_color }} 
                                    />}
                        >{group.name}</SimpleCell>

                        <Header
                            mode="secondary"
                            indicator={group.members_count}
                        >
                            Количество участников
                        </Header>
                        <Header
                            mode="secondary"
                            indicator={group.closed === true ? 'Закрытая' : 'Открытая'}
                        >
                            Приватность
                        </Header>
                        {group.friends ? <Accordion
                            key={group.id}
                            expanded={openId === group.id}
                            onChange={(e) => (e ? setOpenId(group.id) : setOpenId(-1))}
                        >
                            <Accordion.Summary>
                                <Header
                                    mode="secondary"
                                    indicator={group.friends?.length}
                                >
                                    Друзья
                                </Header>
                            </Accordion.Summary>
                            <Accordion.Content>
                                {
                                    group.friends.map((friend, j) => {
                                        return <SimpleCell key={`friend${i}${j}`}>{friend.first_name} {friend.last_name}</SimpleCell>
                                    })
                                }
                                
                            </Accordion.Content>
                        </Accordion> : <></>}

                    </Group>
            })
        }
        </>
    )
}