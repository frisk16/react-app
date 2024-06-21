import { Button } from "@chakra-ui/react";
import { FC, ReactNode } from "react";
import { MdBuild } from "react-icons/md";

type Props = {
    children: ReactNode;
    size?: string;
    onClick: () => void;
    disabled?: boolean;
};

export const SettingButton: FC<Props> = (props) => {
    const { children, size = "md", onClick, disabled = false } = props;

    return <Button leftIcon={<MdBuild />} size={size} colorScheme="blue" onClick={onClick} isDisabled={disabled}>{children}</Button>
}