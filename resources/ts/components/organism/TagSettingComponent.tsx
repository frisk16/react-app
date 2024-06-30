import { Box, Card, CardBody, CardHeader, Center, Grid, GridItem, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import { FC, memo, useCallback, useEffect } from "react";
import { AddButton } from "../atom/AddButton";
import { useTag } from "../../hooks/useTag";
import { TitleText } from "../atom/TitleText";
import { TagBadge } from "../atom/TagBadge";
import { CloseIcon } from "@chakra-ui/icons";
import { TaskModal } from "./TaskModal";
import { useSelectModal } from "../../hooks/modal/useSelectModal";

export const TagSettingComponent: FC = memo(() => {
    const { getTags, tags, getCounts, tagCounts, addTag, deleteTag } = useTag();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { modalStatus, modalId, onSelectModal } = useSelectModal();

    const onClickOpenModal = useCallback((status: string, id?: number) => {
        onSelectModal({ status, id });
        onOpen();
    }, []);

    useEffect(() => {
        getTags();
        getCounts();
    }, [addTag, deleteTag]);

    return (
        <>
            <Center py={4}>
                <TitleText>タグ設定</TitleText>
            </Center>
            
            <Grid templateColumns="repeat(4, 1fr)">
                <GridItem mx={{ base: 4, lg: 0 }} colStart={{ base: 1, lg: 2 }} colSpan={{ base: 4, lg: 2 }}>
                    <Card>
                        <CardHeader p={0}>
                            <Box float="right">
                                <AddButton borderRadius="0 6px 0 0" onClick={() => onClickOpenModal("addTag")}>追加</AddButton>
                            </Box>
                        </CardHeader>
                        <CardBody>
                            <TableContainer>
                                <Table>
                                    <Thead>
                                        <Tr>
                                            <Th>タグ名</Th>
                                            <Th>タスク数</Th>
                                            <Th>削除</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {tags.map((tag) => (
                                            <Tr key={tag.id}>
                                                <Td>
                                                    <TagBadge fontSize={{ base: "1em" }}>{tag.name}</TagBadge>
                                                </Td>
                                                <Td>
                                                    {tagCounts.map((countData) => (
                                                        countData.tagId === tag.id && (
                                                            <p key={countData.tagId}>{countData.count}</p>
                                                        )
                                                    ))}
                                                </Td>
                                                <Td>
                                                    <CloseIcon cursor="pointer" onClick={() => onClickOpenModal("deleteTag", tag.id)} />
                                                </Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </CardBody>
                    </Card>
                </GridItem>
            </Grid>

            <TaskModal isOpen={isOpen} onClose={onClose} status={modalStatus} id={modalId} tags={tags} addTag={addTag} deleteTag={deleteTag} />
        </>
    )
})