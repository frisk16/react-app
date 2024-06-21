import { Center, Spinner } from "@chakra-ui/react";
import { FC } from "react";

type Props = {
    height: string;
}

export const DisplayLoading: FC<Props> = (props) => {
    const { height } = props;

    return (
        <Center h={height}>
            <Spinner />
        </Center>
    )
}