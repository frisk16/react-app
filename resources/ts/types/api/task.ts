export type Task = {
    id: number;
    title: string;
    importance: number;
    completed?: number;
    created_at?: string;
    updated_at?: string;
};