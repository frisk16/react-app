import { FC, memo } from "react";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { ParentTaskComponent } from "../components/organism/ParentTaskComponent";

export const TopPage: FC = memo(() => {
    
    return (
        <>
            <DefaultLayout>
                <ParentTaskComponent />
            </DefaultLayout>
        </>
    )
})