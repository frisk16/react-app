import { useLocation } from "react-router-dom"

export const useUrlParam = () => {
    const searchParam = new URLSearchParams(useLocation().search);
    const pageParam = searchParam.get("page")?.toString();
    const keywordParam = searchParam.get("keyword")?.toString();

    return { pageParam, keywordParam };
}