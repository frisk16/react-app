import { Table, TableCaption, TableContainer } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

type Props = {
    children: ReactNode;
    caption?: string;
};

export const StripeTable: FC<Props> = (props) => {
    const { children, caption = "" } = props;

    return (
        <TableContainer mt={16} display={{ base: "none", lg: "block" }}>
            <Table variant="striped" colorScheme="blackAlpha">
                <TableCaption>{caption}</TableCaption>
                {children}
            </Table>
        </TableContainer>
    )
}