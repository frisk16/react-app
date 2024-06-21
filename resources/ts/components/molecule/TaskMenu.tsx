import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { FC, memo } from "react";

type Props = {
    id: number;
    onClick: (id: number, status: string) => void;
};

export const TaskMenu: FC<Props> = memo((props) => {
    const { id, onClick } = props;

    return (
        <Menu>
            <MenuButton bg="gray.400" _hover={{opacity: 0.7}} as={Button} rightIcon={<span>▼</span>}>選択</MenuButton>
            <MenuList>
                <MenuItem onClick={() => onClick(id, "editTask")}>編集</MenuItem>
                <MenuItem onClick={() => onClick(id, "deleteTask")}>削除</MenuItem>
            </MenuList>
        </Menu>
    )
})