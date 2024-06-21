import { Button } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

type Props = {
    children: ReactNode;
    keyword: string;
    width?: string;
};

export const SearchButton: FC<Props> = ((props) => {
    const { children, keyword, width = "none" } = props;
    const href = `/?keyword=${keyword}`;

    return <Button as="a" href={href} w={width} bg="blue.400" color="white" _hover={{ opacity: 0.7 }}>{children}</Button>
})