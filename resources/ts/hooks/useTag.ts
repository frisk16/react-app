import { useCallback, useState } from "react";
import { Tag } from "../types/api/tag";
import axios from "axios";
import { useMessage } from "./useMessage";
import { TagTask } from "../types/api/tagTask";
import { TagCount } from "../types/api/tagCount";

type Props = {
    csrf?: string;
    tagIds?: Array<string>;
    tagTaskLists?: Array<TagTask>;
    tags?: Array<Tag>;
    id?: number;
    tagName?: string;
    onClose?: () => void;
};

export const useTag = () => {
    const [tags, setTags] = useState<Array<Tag>>([]);
    const [tagTaskLists, setTagTaskLists] = useState<Array<TagTask>>([]);
    const { getMessage } = useMessage();
    const [tagLoading, setTagLoading] = useState(false);
    const [tagDisabled, setTagDisabled] = useState(false);
    const [tagCounts, setTagCounts] = useState<Array<TagCount>>([]);
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

    const getCounts = useCallback(() => {
        axios.get(`${protocol}//${hostName}/api/tags/count`)
            .then((res) => setTagCounts(res.data.tagCount))
            .catch((err) => console.log(err));
    }, []);

    const addTag = useCallback((props: Props) => {
        const { csrf = "", tagName = "", tags = [] } = props;

        setTagLoading(true);
        setTagDisabled(true);
        axios.post(`${protocol}//${hostName}/api/tags/add`, {
            tagName
        },{
            headers: {
                "X-CSRF-TOKEN": csrf,
            }
        })
        .then((res) => {
            const newTags = [res.data.tag, ...tags];
            setTags(newTags);
            getMessage({ title: "タグを追加しました", status: "success" });
        })
        .catch((err) => {
            getMessage({ title: "タグ追加中にエラーが発生しました", status: "error" });
            console.log(err);
        })
        .finally(() => {
            setTagLoading(false);
            setTagDisabled(false);
        });
    }, []);

    const deleteTag = useCallback((props: Props) => {
        const { csrf = "", id = null, tags = [], onClose = null } = props;

        setTagLoading(true);
        setTagDisabled(true);
        axios.delete(`${protocol}//${hostName}/api/tags/${id}/delete`, {
            headers: {
                "X-CSRF-TOKEN": csrf
            }
        })
        .then((res) => {
            const newTags = tags.filter((tag) => tag.id !== id);
            setTags(newTags);
            getMessage({ title: `「${res.data.tagName}」を削除しました`, status: "success" });
        })
        .catch((err) => {
            getMessage({ title: "削除中にエラーが発生しました", status: "error" });
            console.log(err);
        })
        .finally(() => {
            setTagLoading(false);
            setTagDisabled(false);
            onClose!();
        });
    }, []);

    return { tags, getTags, getTagTaskLists, tagTaskLists, toggleTag, tagLoading, tagDisabled, getCounts, tagCounts, setTagDisabled, addTag, deleteTag };
}