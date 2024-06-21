import { useCallback, useState } from "react"

type Props = {
    id: number;
};

export const useActiveForm = () => {
    const [targetId, setTargetId] = useState(0);
    const [activeForm, setActiveForm] = useState(false);

    const onClickToggleForm = useCallback((props: Props) => {
        const { id } = props;

        setTargetId(id);
        if (targetId !== 0 || !activeForm) {
            setActiveForm(true);
        } else {
            setActiveForm(false);
        }
    }, []);

    return { targetId, activeForm, onClickToggleForm };
}