import { useCallback, useState } from "react"

export const useCsrf = () => {
    const [csrfToken, setCsrfToken] = useState("");

    const getToken = useCallback(() => {
        const token = document.querySelector("meta[name='csrf-token']") as HTMLMetaElement;
        setCsrfToken(token.content);
    }, []);

    return { getToken, csrfToken };
}