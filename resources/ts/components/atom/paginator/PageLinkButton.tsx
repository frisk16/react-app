import { Button } from "@chakra-ui/react";
import { FC, ReactNode, memo } from "react";

type Props = {
    children: ReactNode;
    pageNumber: number;
    keyword?: string;
};

export const PageLinkButton: FC<Props> = memo((props) => {
    const { children, pageNumber, keyword = "" } = props;
    let href = `?page=${pageNumber}&keyword=${keyword}`;

    return <Button as="a" size={{ base: "sm", lg: "md" }} href={href} bg="gray.200" borderBottom="4px solid teal" borderRadius={0} _hover={{ backgroundColor: "gray", color: "#fff" }}>{children}</Button>
})