import { Checkbox, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stack, Text } from "@chakra-ui/react";
import { ChangeEvent, FC, memo, useEffect } from "react";
import { DangerButton } from "../atom/DangerButton";
import { PrimaryButton } from "../atom/PrimaryButton";
import { useTask } from "../../hooks/useTask";
import { TagBadge } from "../atom/TagBadge";
import { useCheckedTagForm } from "../../hooks/form/useCheckedTagForm";
import { Tag } from "../../types/api/tag";
import { useTag } from "../../hooks/useTag";
import { TagMenuButton } from "../atom/TagMenuButton";
import { TagTask } from "../../types/api/tagTask";
import { SearchButton } from "../atom/search/SearchButton";
import { Task } from "../../types/api/task";
import { TitleText } from "../atom/TitleText";
import { useTaskForm } from "../../hooks/form/useTaskForm";
import { useTagForm } from "../../hooks/form/useTagForm";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    status: string;
    onChangeSearchInput?: (e: ChangeEvent<HTMLInputElement>) => void;
    keyword?: string;
    arrayId?: Array<string>;
    id?: number;
    csrf?: string;
    tasks?: Array<Task>;
    tags?: Array<Tag>;
    tagTaskLists?: Array<TagTask>;
    toggleTag?: ({}) => void;
    addTask?: ({}) => void;
    deleteSelectedTask?: ({}) => void;
};

export const TaskModal: FC<Props> = memo((props) => {
    const { isOpen, onClose, onChangeSearchInput = null, keyword = "", arrayId = null, status = "", id = 0, csrf = "", tasks = null, tags = null, tagTaskLists = null, toggleTag = null, addTask = null, deleteSelectedTask = null } = props;

    const { loading, disabled, setDisabled } = useTask();
    const { tagLoading, tagDisabled, setTagDisabled } = useTag();
    const { editTitle, editImportance, onChangeEditTitle, onChangeEditImportance } = useTaskForm();
    const { tagName, onChangeTagName } = useTagForm();
    const { onChangeTagCheckbox, setDefaultTagCheckbox, tagIds } = useCheckedTagForm();

    useEffect(() => {
        if (status === "settingTag") {
            setDefaultTagCheckbox();
        }
    }, [isOpen, status]);

    // Form Validation
    useEffect(() => {
        if (status === "addTask") {
            if(editTitle === "" || editImportance === "") {
                setDisabled(true);
            } else if (editTitle.length > 10) {
                setDisabled(true);
            } else {
                setDisabled(false);
            }
        } else if (status === "addTag") {
            if (tagName === "" || tagName.length > 5) {
                setTagDisabled(true);
            } else {
                setTagDisabled(false);
            }
        } else {
            setDisabled(false);
            setTagDisabled(false);
        }
    }, [editTitle, editImportance, tagName, status]);

    return (
        <>
            {status === "addTask" && (
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent mx={{ base: 4, lg: "none" }} borderRadius={0}>
                        <ModalHeader bg="gray.100">
                            <TitleText>タスク追加</TitleText>
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody py={8}>
                            <Stack spacing={4}>
                                <FormControl>
                                    <FormLabel>タイトル</FormLabel>
                                    <Input onChange={onChangeEditTitle} value={editTitle} placeholder="10文字以内" />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>重要性</FormLabel>
                                    <Select onChange={onChangeEditImportance}>
                                        <option value="">-- 選択 --</option>
                                        {[1, 2, 3, 4, 5].map((n) => (
                                            <option key={n} value={n}>{n}</option>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Stack>
                        </ModalBody>
                        <ModalFooter>
                            <PrimaryButton
                                onClick={() => addTask!({ inputTitle: editTitle, inputImportance: editImportance, tasks, csrf })}
                                loading={loading}
                                disabled={disabled}
                                width="100%"
                                size={{ base: "md" }}
                            >追加</PrimaryButton>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}

            {status === "deleteSelectedTask" && (
                <Modal isOpen={isOpen} onClose={onClose} autoFocus={false}>
                    <ModalOverlay />
                    <ModalContent mx={{ base: 4, lg: "none" }} borderRadius={0}>
                        <ModalHeader bg="gray.100">
                            <TitleText>選択項目の削除</TitleText>
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody py={8}>
                            <p>選択した<span style={{ fontWeight: "bold", fontSize: "1.1em" }}>{arrayId?.length}件</span>の項目を全て削除します、よろしいですか？</p>
                        </ModalBody>
                        <ModalFooter>
                            <DangerButton
                                onClick={() => deleteSelectedTask!({ arrayId, tasks, onClose })}
                                loading={loading}
                                disabled={disabled ?? !arrayId}
                                width="100%"
                                size={{ base: "md" }}
                            >全て削除</DangerButton>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}

            {status === "settingTag" && (
                <Modal isOpen={isOpen} onClose={onClose} autoFocus={false}>
                    <ModalOverlay />
                    <ModalContent mx={{ base: 4, lg: "none" }} borderRadius={0}>
                        <ModalHeader bg="gray.100">
                            <TitleText>タグ編集（ID：{id}）</TitleText>
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Stack spacing={4} direction="row">
                                {tags?.map((tag) => (
                                    <Checkbox key={tag.id} onChange={onChangeTagCheckbox} value={tag.id}>
                                        <TagBadge fontSize="1em">{tag.name}</TagBadge>
                                    </Checkbox>
                                ))}
                            </Stack>
                        </ModalBody>
                        <ModalFooter>
                            <PrimaryButton
                                onClick={() => toggleTag!({ csrf, tagIds, id, tagTaskLists })}
                                loading={tagLoading}
                                disabled={!tags || tagDisabled}
                                width="100%"
                                size={{ base: "md" }}
                            >変更</PrimaryButton>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}

            {status === "deleteTag" && (
                <Modal isOpen={isOpen} onClose={onClose} autoFocus={false}>
                    <ModalOverlay />
                    <ModalContent mx={{ base: 4, lg: "none" }} borderRadius={0}>
                        <ModalHeader bg="gray.100">
                            <TitleText>タグを削除します、よろしいですか？</TitleText>
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pt={4}>
                            {tags?.map((tag) => (
                                tag.id === id && (
                                    <Flex alignItems="center" gap={4}>
                                        <Text>ID: {tag.id}</Text>
                                        <TagBadge fontSize={{ base: "1em" }}>{tag.name}</TagBadge>
                                    </Flex>
                                )
                            ))}
                        </ModalBody>
                        <ModalFooter>
                            <DangerButton
                                width="100%"
                                onClick={() => {}}
                                size={{ base: "md" }}
                            >削除</DangerButton>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}

            {status === "addTag" && (
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent mx={{ base: 4, lg: "none" }} borderRadius={0}>
                        <ModalHeader bg="gray.100">
                            <TitleText>タグ追加</TitleText>
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody py={8}>
                            <Stack spacing={4}>
                                <FormControl>
                                    <FormLabel>タグ名</FormLabel>
                                    <Input onChange={onChangeTagName} value={tagName} placeholder="5文字以内" />
                                </FormControl>
                            </Stack>
                        </ModalBody>
                        <ModalFooter>
                            <PrimaryButton
                                onClick={() => {}}
                                loading={tagLoading}
                                disabled={tagDisabled}
                                width="100%"
                                size={{ base: "md" }}
                            >追加</PrimaryButton>
                        </ModalFooter>
                    </ModalContent>
                </Modal>            
            )}

            {status === "tagMenu" && (
                <Drawer isOpen={isOpen} placement="left" onClose={onClose} autoFocus={false}>
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerHeader>タグ一覧</DrawerHeader>
                        <DrawerCloseButton />
                        <DrawerBody p={0}>
                            <TagMenuButton>全て</TagMenuButton>
                            {tags?.map((tag) => (
                                <TagMenuButton key={tag.id} tagId={tag.id}>{tag.name}</TagMenuButton>
                            ))}
                        </DrawerBody>
                        <DrawerHeader borderBottom="1px solid #000">検索</DrawerHeader>
                        <DrawerBody>
                            <FormControl>
                                <FormLabel>タスク検索</FormLabel>
                                <Stack spacing={4}>
                                    <Input border="1px solid #aaa" onChange={onChangeSearchInput!} defaultValue={keyword} />
                                    <SearchButton keyword={keyword} width="100%">検索</SearchButton>
                                </Stack>
                            </FormControl>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            )}

        </>
    )
})