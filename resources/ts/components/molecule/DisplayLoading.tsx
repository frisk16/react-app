import { Center, Spinner } from "@chakra-ui/react";
import { FC } from "react";

export const DisplayLoading: FC = () => {
    return (
        <Center position="fixed" inset={0} zIndex={10} backgroundColor="rgba(200, 200, 200, 0.5)">
            <Spinner
                thickness="5px"
                size="xl"
                color="blue.400"
                emptyColor="gray.300"
            />
        </Center>
    )
}