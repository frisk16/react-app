import { AddIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

type Props = {
    children: ReactNode;
    onClick: () => void;
    disabled?: boolean;
    loading?: boolean;
    width?: string;
};

export const AddButton: FC<Props> = (props) => {
    const { children, onClick, disabled = false, loading = false, width = "none" } = props;

    return <Button w={width} size={{ base: "sm", lg: "md" }} rightIcon={<AddIcon />} onClick={onClick} isDisabled={disabled} isLoading={loading} bg="blue.400" _hover={{opacity: 0.7}} color="white">{children}</Button>
}