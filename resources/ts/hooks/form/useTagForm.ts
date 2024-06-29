import { ChangeEvent, useCallback, useState } from "react";

export const useTagForm = () => {
    const [tagName, setTagName] = useState("");

    const onChangeTagName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setTagName(e.target.value);
    }, [tagName]);

    return { tagName, onChangeTagName };
}