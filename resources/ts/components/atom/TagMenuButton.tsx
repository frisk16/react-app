import { ChevronRightIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { FC, ReactNode, memo } from "react";

type Props = {
    children: ReactNode;
    tagId?: number;
};

export const TagMenuButton: FC<Props> = memo((props) => {
    const { children, tagId = null } = props;
    const href = tagId !== null ? `/tags/${tagId}` : "/";

    return <Button as="a" href={href} w="100%" h="64px" borderRadius={0} rightIcon={<ChevronRightIcon boxSize={6}/>} cursor="pointer" borderBottom="2px solid teal">{children}</Button>
})