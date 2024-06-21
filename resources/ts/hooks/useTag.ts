import { useCallback, useState } from "react";
import { Tag } from "../types/api/tag";
import axios from "axios";
import { useMessage } from "./useMessage";
import { TagTask } from "../types/api/tagTask";

type Props = {
    csrf?: string;
    tagIds?: Array<string>;
    tagTaskLists?: Array<TagTask>;
    id?: number;
};

export const useTag = () => {
    const [tags, setTags] = useState<Array<Tag>>([]);
    const [tagTaskLists, setTagTaskLists] = useState<Array<TagTask>>([]);
    const { getMessage } = useMessage();
    const [tagLoading, setTagLoading] = useState(false);
    const [tagDisabled, setTagDisabled] = useState(false);
    let hostName = new URL(window.location.href).host;
    let protocol = new URL(window.location.href).protocol;
    
    const getTags = useCallback(() => {
        axios.get(`${protocol}//${hostName}/api/tags`)
            .then((res) => setTags(res.data.tags))
            .catch((err) => {
                getMessage({ title: "タグを取得できませんでした", status: "error" });
                console.log(err);
            });
    }, []);

    const getTagTaskLists = useCallback(() => {
        axios.get(`${protocol}//${hostName}/api/tags/tag_task_lists`)
            .then((res) => setTagTaskLists(res.data.tagTaskLists))
            .catch((err) => {
                getMessage({ title: "タグデータ取得中にエラーが発生しました", status: "error" });
                console.log(err);
            });
    }, []);

    const toggleTag = useCallback((props: Props) => {
        const { csrf = "", tagIds = null, tagTaskLists = null, id = null } = props;
        let newTagTaskLists: Array<TagTask> = [];
        tagTaskLists ? newTagTaskLists = tagTaskLists?.filter((lists) => lists.task_id !== id) : newTagTaskLists = [];

        setTagLoading(true);
        setTagDisabled(true);
        axios.put(`${protocol}//${hostName}/api/tasks/${id}/toggle_tag`, {
            tagIds,
        },
        {
            headers: {
                "X-CSRF-TOKEN": csrf,
                "X-HTTP-Method-Override": "PUT",
            }
        })
        .then((res) => {
            getMessage({ title: `タグを更新しました(タスクID: ${res.data.id})`, status: "success" });            
            tagIds?.map((tagId) => {
                newTagTaskLists = [...newTagTaskLists, {tag_id: Number(tagId), task_id: Number(id)}];
            });
            setTagTaskLists(newTagTaskLists);
        })
        .catch((err) => {
            getMessage({ title: "タグ更新中にエラーが発生しました", status: "error" });
            console.log(err);
        })
        .finally(() => {
            setTagLoading(false);
            setTagDisabled(false);
        });
    }, []);

    return { tags, getTags, getTagTaskLists, tagTaskLists, toggleTag, tagLoading, tagDisabled };
}