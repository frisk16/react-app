import { Badge, Box, Card, CardBody, CardHeader, Center, Grid, GridItem } from "@chakra-ui/react";
import { FC, memo, useEffect } from "react";
import { AddButton } from "../atom/AddButton";
import { useTag } from "../../hooks/useTag";
import { TitleText } from "../atom/TitleText";

export const TagSettingComponent: FC = memo(() => {
    const { getTags, tags } = useTag();

    useEffect(() => getTags, []);

    return (
        <>
            <Center py={4}>
                <TitleText>タグ設定</TitleText>
            </Center>
            
            <Grid templateColumns="repeat(4, 1fr)">
                <GridItem mx={{ base: 4, lg: 0 }} colStart={{ base: 1, lg: 2 }} colSpan={{ base: 4, lg: 2 }}>
                    <Card>
                        <CardHeader>
                            <Box float="right">
                                <AddButton onClick={() => {}}>追加</AddButton>
                            </Box>
                        </CardHeader>
                        <CardBody>
                            {tags.map((tag) => (
                                <Badge key={tag.id}>{tag.name}</Badge>
                            ))}
                        </CardBody>
                    </Card>
                </GridItem>
            </Grid>
        </>
    )
})