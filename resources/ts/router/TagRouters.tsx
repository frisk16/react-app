import { ErrorPage } from "../pages/ErrorPage";
import { TagDatasPage } from "../pages/TagDatasPage";
import { TagPage } from "../pages/TagPage";

export const TagRouters = [
    {
        path: "/tags",
        element: <TagPage />
    },
    {
        path: "/tags/:tagId",
        element: <TagDatasPage />
    }
]