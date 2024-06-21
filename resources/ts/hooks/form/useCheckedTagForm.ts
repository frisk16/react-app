import { ChangeEvent, useCallback, useState } from "react"

export const useCheckedTagForm = () => {
    const [tagIds, setTagIds] = useState<string[]>([]);

    const onChangeTagCheckbox = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (tagIds.includes(e.target.value)) {
            setTagIds(tagIds.filter((tagIds) => tagIds !== e.target.value));
        } else {
            setTagIds([...tagIds, e.target.value]);
        }
    }, [tagIds]);

    const setDefaultTagCheckbox = useCallback(() => setTagIds([]), []);

    return { onChangeTagCheckbox, setDefaultTagCheckbox, tagIds };
}