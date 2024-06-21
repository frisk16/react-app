import { useCallback, useState } from "react";
import { Task } from "../types/api/task";

type Props = {
    id: number;
    tasks: Array<Task>;
};

export const useSelectTask = () => {
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const onSelectTask = useCallback((props: Props) => {
        const {id, tasks} = props;
        const targetTask = tasks.find((task) => task.id === id);
        setSelectedTask(targetTask ?? null);
    }, []);

    return { selectedTask, onSelectTask };
}