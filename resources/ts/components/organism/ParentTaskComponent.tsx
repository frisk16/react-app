import { FC, memo, useContext, useEffect } from "react";
import { Center, Grid, GridItem, useDisclosure } from "@chakra-ui/react";
import { useCsrf } from "../../hooks/csrf/useCsrf";
import { useTask } from "../../hooks/useTask";
import { useTag } from "../../hooks/useTag";
import { useSearchForm } from "../../hooks/form/useSearchForm";
import { UrlContext } from "../../providers/UrlProvider";
import { TagListsAside } from "./TagListsAside";
import { TaskTable } from "./TaskTable";
import { PageNavigator } from "./PageNavigator";
import { TitleText } from "../atom/TitleText";

type Props = {
    tagId?: string;
};

export const ParentTaskComponent: FC<Props> = memo((props) => {
    const { tagId = null } = props

    const { getToken, csrfToken } = useCsrf();
    const { getTasks, tasks, tasksPaginator, loading, editTask, getTagDatas, addTask, deleteSelectedTask } = useTask();
    const { tags, getTags, getTagTaskLists, tagTaskLists, toggleTag } = useTag();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { onChangeSearchInput, keyword } = useSearchForm();
    const { pageParam, keywordParam } = useContext(UrlContext);

    useEffect(() => {
        tagId ? getTagDatas({ tagId, pageParam }) : getTasks({ keywordParam, pageParam });
    }, [addTask, editTask, deleteSelectedTask]);
    useEffect(() => getToken, []);
    useEffect(() => getTags, []);
    useEffect(() => getTagTaskLists, [toggleTag]);
    
    return (
        <>
            <Center py={4} fontWeight="bold">
                <TitleText>Task Page</TitleText>
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
                        addTask={addTask}
                        deleteSelectedTask={deleteSelectedTask}
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