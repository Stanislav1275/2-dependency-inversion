import {useEffect, useState} from "react";
import {nanoid} from "nanoid";
import {StorageType} from "./types.ts";

type Task = {
    id: string;
    title: string;
    done: boolean;
    ownerId?: string;
};

const STORAGE_KEY = "tasks";

export function useTasks(props: {
    storage: StorageType
}) {
    const {storage} = props;
    const [tasks, setTasks] = useState<Task[]>(() =>
        storage.get(STORAGE_KEY, [])
    );

    const addTask = (value: string) => {
        setTasks((tasks) => [
            {id: nanoid(), title: value, done: false},
            ...tasks,
        ]);
    };

    const removeTask = (id: string) => {
        setTasks((tasks) => tasks.filter((t) => t.id !== id));
    };

    const toggleCheckTask = (id: string) => {
        setTasks((tasks) =>
            tasks.map((task) =>
                task.id === id ? {...task, done: !task.done} : task
            )
        );
    };

    const updateOwner = (id: string, ownerId: string) => {
        setTasks((tasks) =>
            tasks.map((task) => (task.id === id ? {...task, ownerId} : task))
        );
    };

    useEffect(() => {
        storage.set(STORAGE_KEY, tasks);
    }, [tasks, storage]);

    return {
        tasks,
        addTask,
        removeTask,
        toggleCheckTask,
        updateOwner,
    };
}
