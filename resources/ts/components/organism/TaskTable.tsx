import { Box, Card, CardBody, CardFooter, CardHeader, Checkbox, Divider, Flex, FormControl, FormLabel, Input, Stack, Text } from "@chakra-ui/react";
import { ChangeEvent, FC, memo, useCallback, useEffect } from "react";
import { Task } from "../../types/api/task";
import { Tag } from "../../types/api/tag";
import { DangerButton } from "../atom/DangerButton";
import { DisplayLoading } from "../molecule/DisplayLoading";
import { TagLists } from "../molecule/TagLists";
import { TaskModal } from "./TaskModal";
import { useTaskForm } from "../../hooks/form/useTaskForm";
import { useActiveForm } from "../../hooks/form/useActiveForm";
import { TagTask } from "../../types/api/tagTask";
import { HamburgerIcon } from "@chakra-ui/icons";
import { SelectForm } from "../atom/form/SelectForm";
import { EditButton } from "../atom/EditButton";
import { TagEditButton } from "../atom/TagEditButton";
import { TitleText } from "../atom/TitleText";
import { AddButton } from "../atom/AddButton";
import { useSelectModal } from "../../hooks/modal/useSelectModal";
import { CloseButton } from "../atom/CloseButton";

type Props = {
    csrfToken: string;
    tasks: Array<Task>;
    tags: Array<Tag>;
    tagTaskLists: Array<TagTask>;
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    editTask: ({}) => void;
    addTask: ({}) => void;
    deleteSelectedTask: ({}) => void;
    toggleTag: ({}) => void;
    loading: boolean;
    onChangeSearchInput: (e: ChangeEvent<HTMLInputElement>) => void;
    keyword: string;
};

export const TaskTable: FC<Props> = memo((props) => {
    const { csrfToken, tasks, tags, tagTaskLists, isOpen, onOpen, onClose, addTask, editTask, deleteSelectedTask, toggleTag, loading, onChangeSearchInput, keyword } = props;
    
    const { modalStatus, modalId, onSelectModal } = useSelectModal();
    const { editTitle, editImportance, editCompleted, selectedId, setSelectedId, onChangeEditTitle, onChangeEditImportance, onChangeEditCompleted, onChangeCheckbox, setDefaultForms } = useTaskForm();
    const { targetId, activeForm, onClickToggleForm } = useActiveForm();
    

    useEffect(() => setSelectedId([]), [tasks]);

    const onClickOpenModal = useCallback((status: string, id?: number) => {
        onSelectModal({ status, id });
        onOpen();
    }, []);

    const onClickEditAction = useCallback((id: number) => {
        setDefaultForms();
        onClickToggleForm({ id });
    }, []);

    return (
        <>
            {selectedId[0] && (
                <Box bg="gray.300" position="fixed" bottom={0} left={0} right={0} h={16} zIndex={10} p={4} display="flex" gap={2}>
                    <DangerButton onClick={() => onClickOpenModal("deleteSelectedTask")}>削除する：{selectedId.length}件</DangerButton>
                    <CloseButton onClick={() => {setSelectedId([])}}>全選択解除</CloseButton>
                </Box>
            )}

            <Flex justifyContent={{ base: "space-between", lg: "end" }} me={8} my={{ base: 4, lg: 8 }}>
                <HamburgerIcon as="button" onClick={() => onClickOpenModal("tagMenu")} fontSize={28} me="auto" ms={8} cursor="pointer" display={{ base: "block", lg: "none" }} />
                <Flex gap={2}>
                    <AddButton onClick={() => onClickOpenModal("addTask")}>タスク追加</AddButton>
                </Flex>
            </Flex>
            
            {loading && (
                <DisplayLoading />
            )}

            {tasks.map((task) => (
                <Box key={task.id} mx={{ base: 4, xl: 32 }}>
                    <Card mb={4} size={{ base: "sm", lg: "md" }}>
                        <CardHeader position="relative">
                            <Checkbox onChange={onChangeCheckbox} isChecked={selectedId.includes(task.id.toString()) ? true : false} value={task.id} borderColor="gray.500">ID: {task.id}</Checkbox>
                            <Box position="absolute" top={0} right={0}>
                                {targetId === task.id && activeForm ? (
                                    <CloseButton onClick={() => onClickToggleForm({ id: 0 })} borderRadius="0 6px 0 0">閉じる</CloseButton>
                                ) : (
                                    <EditButton onClick={() => onClickEditAction(task.id)} borderRadius="0 6px 0 0">編集</EditButton>
                                )}
                            </Box>
                        </CardHeader>
                        <CardBody>
                            {targetId === task.id && activeForm ? (
                                <>
                                    <Stack spacing={{ base: 0, lg: 1 }}>
                                        <Input defaultValue={task.title} onChange={onChangeEditTitle} border="none" borderBottom="1px solid #000" borderRadius={0} size="lg" fontWeight="bold"/>
                                        <FormControl display="flex" alignItems="center" ml={4}>
                                            <FormLabel m={0} fontWeight="normal">重要度：</FormLabel>
                                            <SelectForm width="4em" defaultValue={task.importance} onChange={onChangeEditImportance}>
                                                {[1, 2, 3, 4, 5].map((n) => (
                                                    <option key={n} value={n}>{n}</option>
                                                ))}
                                            </SelectForm>
                                        </FormControl>
                                        <FormControl>
                                            <SelectForm width="6em" defaultValue={task.completed ? "1" : "0"} onChange={onChangeEditCompleted}>
                                                <option value="1">完了</option>
                                                <option value="0">未完了</option>
                                            </SelectForm>
                                        </FormControl>
                                    </Stack>
                                    <Box float="right">
                                        <EditButton onClick={() => editTask({ csrf: csrfToken, id: task.id, inputTitle: editTitle, inputImportance: editImportance, inputCompleted: editCompleted, tasks })} loading={loading} disabled={(editTitle === "" || editTitle.length > 10) && editImportance === "" && editCompleted === ""}>更新</EditButton>
                                    </Box>
                                </>
                            ) : (
                                <>
                                    <Stack spacing={{ base: 2, lg: 4 }}>
                                        <TitleText>{task.title}</TitleText>
                                        <FormControl display="flex" alignItems="center" ml={4}>
                                            <FormLabel m={0} fontWeight="normal">重要度：</FormLabel>
                                            <Text ml={4}>{task.importance}</Text>
                                        </FormControl>
                                        <Box>
                                            {task.completed ? (
                                                <Text ml={4} color="#f00">完了</Text>
                                            ) : (
                                                <Text ml={4} color="#00f">未完了</Text>
                                            )}
                                        </Box>
                                    </Stack>
                                </>
                            )}
                            
                        </CardBody>
                        <Divider />
                        <CardFooter>
                            <Flex alignItems="center" position="relative" w="100%">
                                <Text fontSize="0.8em">タグ：</Text>
                                <TagLists tags={tags} tagTaskLists={tagTaskLists} taskId={task.id} />
                                <Box position="absolute" right={0}>
                                    <TagEditButton onClick={() => onClickOpenModal("settingTag", task.id)}>タグ編集</TagEditButton>
                                </Box>
                            </Flex>
                        </CardFooter>
                    </Card>
                </Box>
            ))}

            <TaskModal
                isOpen={isOpen}
                arrayId={selectedId}
                onClose={onClose}
                status={modalStatus}
                id={modalId}
                csrf={csrfToken}
                tasks={tasks}
                tags={tags}
                tagTaskLists={tagTaskLists}
                toggleTag={toggleTag}
                onChangeSearchInput={onChangeSearchInput}
                keyword={keyword}
                addTask={addTask}
                deleteSelectedTask={deleteSelectedTask}
            />
        </>
    )
})