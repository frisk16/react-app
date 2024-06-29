import { Badge } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

type Props = {
    children: ReactNode;
    fontSize?: {};
};

export const TagBadge: FC<Props> = (props) => {
    const { children, fontSize = { base: "0.8em", lg: "0.8em" } } = props;

    return <Badge p={1} variant="outline" colorScheme="teal" fontSize={fontSize}>{children}</Badge>;
}