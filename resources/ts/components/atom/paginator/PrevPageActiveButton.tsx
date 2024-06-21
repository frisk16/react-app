import { Button } from "@chakra-ui/react";
import { FC, ReactNode, memo } from "react";

type Props = {
    children: ReactNode;
};

export const PrevPageActiveButton: FC<Props> = memo((props) => {
    const { children } = props;

    return <Button _hover={{}} bg="teal" color="#fff" borderRight="1px solid #ddd" borderRadius="8px 0 0 8px">{children}</Button>
})