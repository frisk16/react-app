import axios from "axios";
import { useCallback, useState } from "react";
import { Task } from "../types/api/task";
import { useMessage } from "./useMessage";
import { Paginator } from "../types/api/paginator";

type Props = {
    csrf?: string;
    id?: number;
    arrayId?: Array<string>;
    tagId?: string;
    inputTitle?: string;
    inputImportance?: string;
    inputCompleted?: string;
    tasks?: Array<Task>;
    keywordParam?: string;
    pageParam?: string;
    onClose?: () => void;
};

export const useTask = () => {
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [tasks, setTasks] = useState<Array<Task>>([]);
    const [tasksPaginator, setTasksPaginator] = useState<Paginator | null>(null);
    const { getMessage } = useMessage();
    let hostName = new URL(window.location.href).host;
    let protocol = new URL(window.location.href).protocol;

    /**
     * All Tasks
     */
    const getTasks = useCallback((props: Props) => {
        const { keywordParam = "", pageParam = "1" } = props;

        setLoading(true);
        axios.get(`${protocol}//${hostName}/api/tasks`, {
            params: {
                keyword: keywordParam,
                page: pageParam,
            }
        })
            .then((res) => {
                setTasks(res.data.tasks.data);
                setTasksPaginator(res.data.tasks);
            })
            .catch((err) => {
                getMessage({ title: "タスクが取得できませんでした", status: "error" });
                console.log(err);
            })
            .finally(() => setLoading(false));
    }, []);

    /**
     * Tag Data Tasks
     */
    const getTagDatas = useCallback((props: Props) => {
        const { tagId = "", pageParam = "1" } = props;

        setLoading(true);
        axios.get(`${protocol}//${hostName}/api/tags/${tagId}/task_datas`, {
            params: {
                page: pageParam,
            }
        })
            .then((res) => {
                setTasks(res.data.tasks.data);
                setTasksPaginator(res.data.tasks);
            })
            .catch((err) => {
                getMessage({ title: "タスクを取得できませんでした", status: "error" });
                console.log(err);
            })
            .finally(() => setLoading(false));
    }, []);

    /**
     * Add Task
     */
    const addTask = useCallback((props: Props) => {
        const { inputTitle, inputImportance, csrf = "", tasks = [] } = props;

        setLoading(true);
        setDisabled(true);
        axios.post(`${protocol}//${hostName}/api/tasks/add`, {
            title: inputTitle,
            importance: inputImportance,
        },{
            headers: {
                "X-CSRF-TOKEN": csrf
            }
        })
        .then((res) => {
            setTasks([res.data.task, ...tasks]);
            getMessage({ title: `タスクを追加しました：${res.data.title}`, status: "success" });
        })
        .catch((err) => {
            getMessage({ title: "追加時にエラーが発生しました", status: "error" });
            console.log(err);
        })
        .finally(() => {
            setLoading(false);
            setDisabled(false);
        });
    }, []);

    /**
     * Edit Task
     */
    const editTask = useCallback((props: Props) => {
        const { csrf, id, inputTitle = "", inputImportance = "", inputCompleted = "", tasks = [] } = props;

        setLoading(true);
        setDisabled(true);

        const currentTask = tasks.find((task) => task.id === id);
        axios.put(`${protocol}//${hostName}/api/tasks/${id}/update`, {
            title: inputTitle === "" ? currentTask?.title : inputTitle,
            importance: inputImportance === "" ? currentTask?.importance : inputImportance,
            completed: inputCompleted === "" ? currentTask?.completed : inputCompleted,
        }, {
            headers: {
                "X-CSRF-TOKEN": csrf,
            },
        })
        .then((res) => {
            getMessage({ title: `タスクを更新しました：${res.data.id}`, status: "success" });
            const newTasks = tasks.map((task) => {
                if (task.id === id) {
                    return {
                        id: id,
                        title: inputTitle === "" ? currentTask!.title : inputTitle,
                        importance: inputImportance === "" ? currentTask!.importance : Number(inputImportance),
                        completed: inputCompleted === "" ? currentTask?.completed : Number(inputCompleted),
                        created_at: task.created_at,
                    }
                } else {
                    return task;
                }
            });
            setTasks(newTasks);
        })
        .catch((err) => {
            getMessage({ title: "更新中にエラーが発生しました", status: "error" });
            console.log(err);
        })
        .finally(() => {
            setLoading(false);
            setDisabled(false);
        });
    }, []);

    /**
     * Delete Task
     */
    const deleteSelectedTask = useCallback((props: Props) => {
        const { csrf = "", arrayId = [], tasks = [], onClose = null } = props;

        setLoading(true);
        setDisabled(true);
        axios.post(`${protocol}//${hostName}/api/tasks/selected_delete`, {
            arrayId: arrayId,
        },{
            headers: {
                "X-CSRF-TOKEN": csrf
            }
        })
        .then((res) => {
            let newTasks = tasks;
            arrayId.map((id) => {
                newTasks = newTasks.filter((task) => task.id !== Number(id));
            })
            setTasks(newTasks);
            getMessage({ title: `${res.data.delete_count}件のタスクを削除しました`, status: "success" });
        })
        .catch((err) => {
            getMessage({ title: "削除中にエラーが発生しました", status: "error" });
            console.log(err);
        })
        .finally(() => {
            setLoading(false);
            setDisabled(false);
            onClose!();
        });
    }, []);

    return { getTasks, addTask, editTask, loading, disabled, setDisabled, tasks, deleteSelectedTask, tasksPaginator, getTagDatas };
}