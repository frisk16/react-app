import { Box, Card, CardBody, CardHeader, Center, Grid, GridItem, Wrap, WrapItem, useDisclosure } from "@chakra-ui/react";
import { FC, memo, useCallback, useEffect, useState } from "react";
import { AddButton } from "../atom/AddButton";
import { useTag } from "../../hooks/useTag";
import { TitleText } from "../atom/TitleText";
import { TagBadge } from "../atom/TagBadge";
import { CloseIcon } from "@chakra-ui/icons";
import { TaskModal } from "./TaskModal";
import { useSelectModal } from "../../hooks/modal/useSelectModal";

export const TagSettingComponent: FC = memo(() => {
    const { getTags, tags } = useTag();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { modalStatus, modalId, onSelectModal } = useSelectModal();

    const onClickOpenModal = useCallback((status: string, id?: number) => {
        onSelectModal({ status, id });
        onOpen();
    }, []);

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
                            <Wrap>
                                {tags.map((tag) => (
                                    <WrapItem key={tag.id} alignItems="center" gap={2} me={6}>
                                        <TagBadge fontSize={{ base: "1em", lg: "1.3em" }}>{tag.name}</TagBadge>
                                        <CloseIcon cursor="pointer" onClick={() => onClickOpenModal("deleteTag", tag.id)} />
                                    </WrapItem>
                                ))}
                            </Wrap>
                        </CardBody>
                    </Card>
                </GridItem>
            </Grid>

            <TaskModal isOpen={isOpen} onClose={onClose} status={modalStatus} id={modalId} tags={tags} />
        </>
    )
})