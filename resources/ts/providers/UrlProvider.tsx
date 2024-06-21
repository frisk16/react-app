import { ReactNode, createContext } from "react";
import { UrlContextType } from "../types/context/urlContextType";
import { useLocation } from "react-router-dom";

export const UrlContext = createContext<UrlContextType>({});

export const UrlProvider = (props: { children: ReactNode }) => {
    const { children } = props;
    const urlSearch = new URLSearchParams(useLocation().search);
    const pageParam = urlSearch.get("page")?.toString();
    const keywordParam = urlSearch.get("keyword")?.toString();

    return <UrlContext.Provider value={{ pageParam, keywordParam }}>{children}</UrlContext.Provider>
}