import { Box, Card, CardBody, CardFooter, CardHeader, Checkbox, CloseButton, Divider, Flex, FormControl, FormLabel, Input, Stack, Text } from "@chakra-ui/react";
import { ChangeEvent, FC, memo, useCallback, useEffect, useState } from "react";
import { Task } from "../../types/api/task";
import { Tag } from "../../types/api/tag";
import { DangerButton } from "../atom/DangerButton";
import { PrimaryButton } from "../atom/PrimaryButton";
import { DisplayLoading } from "../molecule/DisplayLoading";
import { TagLists } from "../molecule/TagLists";
import { SuccessButton } from "../atom/SuccessButton";
import { TaskModal } from "./TaskModal";
import { useTopForm } from "../../hooks/form/useTopForm";
import { useActiveForm } from "../../hooks/form/useActiveForm";
import { TagTask } from "../../types/api/tagTask";
import { HamburgerIcon } from "@chakra-ui/icons";
import { SelectForm } from "../atom/form/SelectForm";
import { EditButton } from "../atom/EditButton";
import { TagEditButton } from "../atom/TagEditButton";
import { TitleText } from "../atom/TitleText";

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
    
    const [modalStatus, setModalStatus] = useState("");
    const [modalId, setModalId] = useState(0);
    const { editTitle, editImportance, editCompleted, selectedId, setSelectedId, onChangeEditTitle, onChangeEditImportance, onChangeEditCompleted, onChangeCheckbox, setDefaultForms } = useTopForm();
    const { targetId, activeForm, onClickToggleForm } = useActiveForm();

    useEffect(() => setSelectedId([]), [tasks]);

    const onOpenTaskModal = useCallback((status: string, id?: number) => {
        setModalStatus(status);
        id && setModalId(id);
        onOpen();
    }, [modalStatus]);

    const onClickEditAction = useCallback((id: number) => {
        setDefaultForms();
        onClickToggleForm({ id });
    }, []);

    return (
        <>

            <Flex justifyContent={{ base: "space-between", lg: "end" }} me={8} my={{ base: 4, lg: 8 }}>
                <HamburgerIcon as="button" onClick={() => onOpenTaskModal("tagMenu")} fontSize={28} me="auto" ms={8} cursor="pointer" display={{ base: "block", lg: "none" }} />
                <Flex gap={2}>
                    {selectedId[0] && <DangerButton onClick={() => onOpenTaskModal("deleteSelectedTask")}>選択項目を削除</DangerButton>}
                    <PrimaryButton onClick={() => onOpenTaskModal("addTask")}>タスク追加</PrimaryButton>
                </Flex>
            </Flex>
            {
                loading ? (
                    <DisplayLoading height="100vh" />
                ) : (
                    <>
                        {tasks.map((task) => (
                            <Box key={task.id} mx={{ base: 4, lg: 12 }}>
                                <Card mb={4} size={{ base: "sm", lg: "md" }}>
                                    <CardHeader display="flex" justifyContent="space-between">
                                        <Checkbox onChange={onChangeCheckbox} value={task.id} borderColor="gray.500" />
                                        <Text>ID: {task.id}</Text>
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
                                                <Flex mt={4} gap={3} justifyContent="end" alignItems="center">
                                                    <EditButton onClick={() => editTask({ csrf: csrfToken, id: task.id, inputTitle: editTitle, inputImportance: editImportance, inputCompleted: editCompleted, tasks })} loading={loading} disabled={(editTitle === "" || editTitle.length > 10) && editImportance === "" && editCompleted === ""}>更新</EditButton>
                                                    <CloseButton onClick={() => onClickToggleForm({ id: 0 })} />
                                                </Flex>
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
                                                <Box float="right">
                                                    <SuccessButton onClick={() => onClickEditAction(task.id)}>編集</SuccessButton>
                                                </Box>
                                            </>
                                        )}
                                        
                                    </CardBody>
                                    <Divider />
                                    <CardFooter>
                                        <Flex alignItems="center" position="relative" w="100%">
                                            <Text fontSize="0.8em">タグ：</Text>
                                            <TagLists tags={tags} tagTaskLists={tagTaskLists} taskId={task.id} />
                                            <Box position="absolute" right={0}>
                                                <TagEditButton onClick={() => onOpenTaskModal("settingTag", task.id)}>タグ編集</TagEditButton>
                                            </Box>
                                        </Flex>
                                    </CardFooter>
                                </Card>
                            </Box>
                        ))}
                    </>
                )
            }

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