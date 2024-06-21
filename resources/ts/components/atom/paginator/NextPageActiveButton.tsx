import { Button } from "@chakra-ui/react";
import { FC, ReactNode, memo } from "react";

type Props = {
    children: ReactNode;
};

export const NextPageActiveButton: FC<Props> = memo((props) => {
    const { children } = props;

    return <Button _hover={{}} bg="teal" color="#fff" borderLeft="1px solid #ddd" borderRadius="0 8px 8px 0">{children}</Button>
})