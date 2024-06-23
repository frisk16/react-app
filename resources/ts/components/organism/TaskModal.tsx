import { Checkbox, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stack, Text } from "@chakra-ui/react";
import { ChangeEvent, FC, memo, useEffect, useState } from "react";
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

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onChangeSearchInput: (e: ChangeEvent<HTMLInputElement>) => void;
    keyword: string;
    arrayId?: Array<string>;
    status?: string;
    id?: number;
    csrf?: string;
    tasks: Array<Task>;
    tags?: Array<Tag>;
    tagTaskLists?: Array<TagTask>;
    toggleTag?: ({}) => void;
    addTask: ({}) => void;
    deleteSelectedTask: ({}) => void;
};

export const TaskModal: FC<Props> = memo((props) => {
    const { isOpen, onClose, onChangeSearchInput, keyword, arrayId, status = "", id = 0, csrf = "", tasks, tags = null, tagTaskLists = null, toggleTag = null, addTask, deleteSelectedTask } = props;

    const { loading, disabled, setDisabled } = useTask();
    const { tagLoading, tagDisabled } = useTag();
    const [inputTitle, setInputTitle] = useState("");
    const [inputImportance, setInputImportance] = useState("");
    const { onChangeTagCheckbox, setDefaultTagCheckbox, tagIds } = useCheckedTagForm();

    useEffect(() => {
        if (status === "settingTag") {
            setDefaultTagCheckbox();
        }
    }, [isOpen, status]);

    // Form Validation
    useEffect(() => {
        if (status === "addTask") {
            if(inputTitle === "" || inputImportance === "") {
                setDisabled(true);
            } else if (inputTitle.length > 10) {
                setDisabled(true);
            } else {
                setDisabled(false);
            }
        } else {
            setDisabled(false);
        }
    }, [inputTitle, inputImportance, status]);

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
                                    <Input onChange={(e: ChangeEvent<HTMLInputElement>) => setInputTitle(e.target.value)} value={inputTitle} placeholder="10文字以内" />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>重要性</FormLabel>
                                    <Select onChange={(e: ChangeEvent<HTMLSelectElement>) => setInputImportance(e.target.value)}>
                                        <option value="">-- 選択 --</option>
                                        {[1, 2, 3, 4, 5].map((n) => (
                                            <option key={n} value={n}>{n}</option>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Stack>
                        </ModalBody>
                        <ModalFooter>
                            <PrimaryButton onClick={() => addTask({ inputTitle, inputImportance, tasks, csrf })} loading={loading} disabled={disabled} width="100%">追加</PrimaryButton>
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
                            <DangerButton onClick={() => deleteSelectedTask({ arrayId, tasks, onClose })} loading={loading} disabled={disabled ?? !arrayId} width="100%">全て削除</DangerButton>
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
                            <PrimaryButton onClick={() => toggleTag !== null && toggleTag({ csrf, tagIds, id, tagTaskLists })} loading={tagLoading} disabled={tagDisabled} width="100%">変更</PrimaryButton>
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
                                    <Input border="1px solid #aaa" onChange={onChangeSearchInput} defaultValue={keyword} />
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