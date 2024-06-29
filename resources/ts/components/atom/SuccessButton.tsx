import { Button } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

type Props = {
    children: ReactNode;
    onClick: () => void;
    disabled?: boolean;
    loading?: boolean;
    width?: string;
    size?: {};
};

export const SuccessButton: FC<Props> = (props) => {
    const { children, onClick, disabled = false, loading = false, width = "none", size = { base: "sm", lg: "md" } } = props;

    return <Button w={width} size={size} onClick={onClick} isDisabled={disabled} isLoading={loading} bg="green.400" _hover={{opacity: 0.7}} color="white">{children}</Button>
}