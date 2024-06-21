import { FC, memo, useContext, useEffect } from "react";
import { useTask } from "../hooks/useTask";
import { Center, Grid, GridItem, Text, useDisclosure } from "@chakra-ui/react";
import { useCsrf } from "../hooks/csrf/useCsrf";
import { useTag } from "../hooks/useTag";
import { PageNavigator } from "../components/organism/PageNavigator";
import { TaskTable } from "../components/organism/TaskTable";
import { TagListsAside } from "../components/organism/TagListsAside";
import { useParams } from "react-router-dom";
import { useSearchForm } from "../hooks/form/useSearchForm";
import { UrlContext } from "../providers/UrlProvider";

export const TagDatasPage: FC = memo(() => {
    const { getToken, csrfToken } = useCsrf();
    const { tasks, tasksPaginator, getTagDatas, editTask, loading } = useTask();
    const { tags, getTags, getTagTaskLists, tagTaskLists, toggleTag } = useTag();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { onChangeSearchInput, keyword } = useSearchForm();
    const { pageParam } = useContext(UrlContext);
    const { tagId } = useParams();

    useEffect(() => getTagDatas({ tagId, pageParam }), [editTask]);
    useEffect(() => getToken, []);
    useEffect(() => getTags, []);
    useEffect(() => getTagTaskLists, [toggleTag]);    
    
    return (
        <>
            <Center py={3} fontSize={25} fontWeight="bold">
                <Text>Task Page</Text>
            </Center>

            <Grid templateColumns="repeat(4, 1fr)" gap={8}>
                <GridItem colSpan={1} display={{ base: "none", lg: "block" }}>
                    <TagListsAside
                        tags={tags}
                        onChangeSearchInput={onChangeSearchInput}
                        keyword={keyword}
                    />
                </GridItem>

                <GridItem colSpan={{ base: 4, lg: 3 }}>
                    <TaskTable
                        csrfToken={csrfToken}
                        tasks={tasks}
                        tags={tags}
                        tagTaskLists={tagTaskLists}
                        isOpen={isOpen}
                        onOpen={onOpen}
                        onClose={onClose}
                        editTask={editTask}
                        loading={loading}
                        toggleTag={toggleTag}
                        onChangeSearchInput={onChangeSearchInput}
                        keyword={keyword}
                    />
                </GridItem>
            </Grid>
            
            <Center>
                <PageNavigator paginator={tasksPaginator} keyword={keyword} />
            </Center>
        </>
    )
})