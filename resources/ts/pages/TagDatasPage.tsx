import { FC, memo } from "react";
import { useParams } from "react-router-dom";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { ParentTaskComponent } from "../components/organism/ParentTaskComponent";

export const TagDatasPage: FC = memo(() => {
    const { tagId } = useParams();
    
    return (
        <>
            <DefaultLayout tagId={tagId}>
                <ParentTaskComponent tagId={tagId} />
            </DefaultLayout>
        </>
    )
})