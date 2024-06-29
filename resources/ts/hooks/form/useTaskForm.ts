import { ChangeEvent, useCallback, useState } from "react";

export const useTaskForm = () => {
    const [editTitle, setEditTitle] = useState("");
    const [editImportance, setEditImportance] = useState("");
    const [editCompleted, setEditCompleted] = useState("");
    const [selectedId, setSelectedId] = useState<string[]>([]);

    const onChangeEditTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => setEditTitle(e.target.value), [editTitle]);
   
    const onChangeEditImportance = useCallback((e: ChangeEvent<HTMLSelectElement>) => setEditImportance(e.target.value), [editImportance]);
    
    const onChangeEditCompleted = useCallback((e: ChangeEvent<HTMLSelectElement>) => setEditCompleted(e.target.value), [editCompleted]);

    const onChangeCheckbox = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (selectedId.includes(e.target.value)) {
            setSelectedId(selectedId.filter((selectedId) => selectedId !== e.target.value));
        } else {
            setSelectedId([...selectedId, e.target.value]);
        }
    }, [selectedId]);

    const setDefaultForms = useCallback(() => {
        setEditTitle("");
        setEditImportance("");
        setEditCompleted("");
    }, []);

    return { editTitle, editImportance, editCompleted, selectedId, setSelectedId, onChangeEditTitle, onChangeEditImportance, onChangeEditCompleted, onChangeCheckbox, setDefaultForms };
}