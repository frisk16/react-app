import { Badge } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

type Props = {
    children: ReactNode;
    fontSize?: string;
};

export const TagBadge: FC<Props> = (props) => {
    const { children, fontSize = "0.8em" } = props;

    return <Badge variant="outline" colorScheme="teal" fontSize={fontSize}>{children}</Badge>;
}