import { Heading } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export const TitleText: FC<Props> = ((props) => {
    const { children } = props;

    return <Heading size={{ base: "sm", lg: "md" }}>{children}</Heading>
})