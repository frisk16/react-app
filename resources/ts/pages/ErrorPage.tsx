import { FC } from "react";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { Center, Heading } from "@chakra-ui/react";

export const ErrorPage: FC = (() => {
    return (
        <DefaultLayout>
            <Center>
                <Heading py={16} size="lg">指定されたページは存在しません</Heading>
            </Center>
        </DefaultLayout>
    )
});