import { Button } from "@chakra-ui/react";
import { FC, ReactNode, memo } from "react";

type Props = {
    children: ReactNode;
};

export const PageLinkActiveButton: FC<Props> = memo((props) => {
    const { children } = props;

    return <Button _hover={{}} bg="teal" color="#fff" borderRadius={0}>{children}</Button>
})