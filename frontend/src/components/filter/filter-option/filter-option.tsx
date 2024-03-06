import { FormItem, NativeSelect } from "@vkontakte/vkui";

export function FilterOption() {
    return (
        <FormItem
            top="Тип группы"
            htmlFor="select-id"
        >
            <NativeSelect id="select-id">
                <option value="all">Все</option>
                <option value="closed">Закрытая</option>
                <option value="opened">Открытая</option>
            </NativeSelect>
        </FormItem>
    )
}