import { Button } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export const NavLinkActiveButton: FC<Props> = ((props) => {
    const { children } = props;

    return <Button fontSize={{ base: "0.7em", lg: "1em" }} cursor="default" _hover="none" h={16} bg="white" borderRadius={0} borderBottom="3px solid #0aa">{children}</Button>
})