import { Button } from "@chakra-ui/react";
import { FC, ReactNode, memo } from "react";

type Props = {
    children: ReactNode;
    currentPageNumber?: number;
    keyword?: string;
};

export const NextPageButton: FC<Props> = memo((props) => {
    const { children, currentPageNumber = 1, keyword = "" } = props;
    let href = `?page=${currentPageNumber + 1}&keyword=${keyword}`;

    return <Button as="a" href={href} bg="gray.400" borderRadius="0 8px 8px 0" _hover={{ backgroundColor: "gray", color: "#fff" }}>{children}</Button>
})