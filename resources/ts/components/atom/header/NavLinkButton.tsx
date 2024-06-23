import { Button } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

type Props = {
    children: ReactNode;
    href: string;
};

export const NavLinkButton: FC<Props> = ((props) => {
    const { children, href } = props;

    return <Button as="a" fontSize={{ base: "0.7em", lg: "1em" }} href={href} h={16} bg="white" borderRadius={0}>{children}</Button>
})