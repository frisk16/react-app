import { Stack } from "@chakra-ui/react";
import { FC, memo, useEffect } from "react";
import { TagBadge } from "../atom/TagBadge";
import { Tag } from "../../types/api/tag";
import { TagTask } from "../../types/api/tagTask";
import { useCurrentTags } from "../../hooks/useCurrentTags";

type Props = {
    tags: Array<Tag>;
    tagTaskLists: Array<TagTask>;
    taskId: number;
};

export const TagLists: FC<Props> = memo((props) => {
    const { tags, tagTaskLists, taskId } = props;
    const { getCurrentTags, currentTags } = useCurrentTags();
    

    useEffect(() => getCurrentTags({ tags, tagTaskLists, taskId }), [tagTaskLists]);
    
    return (
        <Stack direction="row">
            {currentTags.map((tag) => (
                    <TagBadge key={tag.id}>{tag.name}</TagBadge>
                )
            )}
        </Stack>
    )
})