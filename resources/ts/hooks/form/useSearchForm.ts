import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const useSearchForm = () => {
    const [keyword, setKeyword] = useState("");
    const keywordParam = new URLSearchParams(useLocation().search).get("keyword")?.toString();

    useEffect(() => {
        keywordParam && setKeyword(keywordParam);
    }, []);

    const onChangeSearchInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    }, [keyword]);

    return { onChangeSearchInput, keyword };
};