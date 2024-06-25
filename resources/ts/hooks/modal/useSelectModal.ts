import { useCallback, useState } from "react";

type Props = {
    status: string;
    id?: number;
};

export const useSelectModal = () => {
    const [modalStatus, setModalStatus] = useState("");
    const [modalId, setModalId] = useState(0);

    const onSelectModal = useCallback((props: Props) => {
        const { status, id = null } = props;

        setModalStatus(status);
        id && setModalId(id);
    }, []);

    return { modalStatus, modalId, onSelectModal };
}