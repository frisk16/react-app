import { Button } from "@chakra-ui/react";
import { FC, ReactNode } from "react";
import { MdBuild } from "react-icons/md";

type Props = {
    children: ReactNode;
    onClick: () => void;
    disabled?: boolean;
};

export const SettingButton: FC<Props> = (props) => {
    const { children, onClick, disabled = false } = props;

    return <Button rightIcon={<MdBuild />} size={{ base: "sm", lg: "md" }} bg="gray.500" _hover={{ opacity: 0.7 }} color="white" onClick={onClick} isDisabled={disabled}>{children}</Button>
}