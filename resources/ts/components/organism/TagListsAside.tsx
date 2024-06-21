import { Box, Container, FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";
import { ChangeEvent, FC, memo } from "react";
import { PrimaryButton } from "../atom/PrimaryButton";
import { Tag } from "../../types/api/tag";
import { TagMenuButton } from "../atom/TagMenuButton";
import { SearchButton } from "../atom/search/SearchButton";

type Props = {
    tags: Array<Tag>;
    onChangeSearchInput: (e: ChangeEvent<HTMLInputElement>) => void;
    keyword: string;
};

export const TagListsAside: FC<Props> = memo((props) => {
    const { tags, onChangeSearchInput, keyword } = props;

    return (
        <Container textAlign="center" mt="128px">
            <Box mb={8}>
                <FormControl>
                    <FormLabel>タスク検索</FormLabel>
                    <Stack spacing={4}>
                        <Input border="1px solid #aaa" onChange={onChangeSearchInput} defaultValue={keyword} />
                        <SearchButton keyword={keyword} width="100%">検索</SearchButton>
                    </Stack>
                </FormControl>
            </Box>
            <ul style={{ listStyle: "none" }}>
                <li style={{ marginBottom: "32px" }}>
                    <TagMenuButton>全て</TagMenuButton>
                </li>
                {tags.map((tag) => (
                    <li key={tag.id} style={{ marginBottom: "32px" }}>
                        <TagMenuButton tagId={tag.id}>{tag.name}</TagMenuButton>
                    </li>
                ))}
            </ul>
        </Container>
    )
})