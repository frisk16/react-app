import { FC, createContext, memo } from "react";
import { Route, Routes } from "react-router";
import { TopPage } from "../pages/TopPage";
import { TagDatasPage } from "../pages/TagDatasPage";

export const QueryContext = createContext("");

const Web: FC = memo(() => {
    return (
        <Routes>
            <Route index element={<TopPage />} />
            <Route path="/tags/:tagId" element={<TagDatasPage />} />
        </Routes>
    )
});

export default Web;