import { Group, Header } from "@vkontakte/vkui";
import { FilterOption } from "./filter-option/filter-option";

export function Filter() {
    return (
        <Group header={<Header>Фильтр</Header>}>
            <FilterOption></FilterOption>
        </Group>
    )
}