import { EditIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

type Props = {
    children: ReactNode;
    onClick: () => void;
    disabled?: boolean;
    loading?: boolean;
    width?: string;
    borderRadius?: string;
    size?: {};
};

export const EditButton: FC<Props> = (props) => {
    const { children, onClick, disabled = false, loading = false, width = "none", size = { base: "sm", lg: "md" }, borderRadius = "none" } = props;

    return <Button w={width} borderRadius={borderRadius} size={size} rightIcon={<EditIcon />} onClick={onClick} isDisabled={disabled} isLoading={loading} bg="green.400" _hover={{opacity: 0.7}} color="white">{children}</Button>
}