import { FC, memo } from "react";
import { Route, Routes } from "react-router";
import { TopPage } from "../pages/TopPage";
import { ErrorPage } from "../pages/ErrorPage";
import { TagRouters } from "./TagRouters";

const Web: FC = memo(() => {
    return (
        <Routes>
            <Route index element={<TopPage />} />
            {TagRouters.map((router) => (
                <Route key={router.path} path={router.path} element={router.element} />
            ))}
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    )
});

export default Web;