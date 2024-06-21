import { Select } from "@chakra-ui/react";
import { ChangeEvent, FC, ReactNode } from "react";

type Props = {
    width?: string;
    defaultValue: string | number;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    children: ReactNode;
};

export const SelectForm: FC<Props> = (props) => {
    const { width = "none", defaultValue, onChange, children } = props;

    return  <Select w={width} border="none" borderBottom="1px solid #000" borderRadius={0} defaultValue={defaultValue} onChange={onChange}>{children}</Select>
}