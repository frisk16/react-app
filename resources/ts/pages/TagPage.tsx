import { FC, memo } from "react";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { TagSettingComponent } from "../components/organism/TagSettingComponent";

export const TagPage: FC = memo(() => {
    return (
        <DefaultLayout>
            <TagSettingComponent />
        </DefaultLayout>
    )
})