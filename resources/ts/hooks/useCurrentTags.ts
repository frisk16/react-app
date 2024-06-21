import { useCallback, useState } from "react"
import { Tag } from "../types/api/tag";
import { TagTask } from "../types/api/tagTask";

type Props = {
    taskId: number;
    tags: Array<Tag>;
    tagTaskLists: Array<TagTask>;
};

export const useCurrentTags = () => {
    const [currentTags, setCurrentTags] = useState<Array<Tag>>([]);

    const getCurrentTags = useCallback((props: Props) => {
        const { taskId, tags, tagTaskLists } = props;
        
        const targetTags = tagTaskLists.filter((lists) => lists.task_id === taskId);
        let targetLists: Array<Tag> = [];
        targetTags.map((target) => (
            tags.map((tag) => {
                target.tag_id === tag.id ? targetLists = [...targetLists, tag] : null;
            })
        ))
        setCurrentTags(targetLists);
    }, []);

    return { getCurrentTags, currentTags };
}