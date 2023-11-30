import {TaskItem} from "./task-item";
import {useTasks} from "../model/use-tasks";
import {CreateTaskForm} from "./create-task-from";
import {StorageType} from "../model/types.ts";

type TasksListType = {
    storage: StorageType;
}

export function TasksList(props: TasksListType) {
    const {storage} = props;
    const {addTask, removeTask, tasks, toggleCheckTask, updateOwner} =
        useTasks({storage});

    return (
        <div>
            <CreateTaskForm onCreate={addTask}/>
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    done={task.done}
                    title={task.title}
                    ownerId={task.ownerId}
                    onToggleDone={() => toggleCheckTask(task.id)}
                    onDelete={() => removeTask(task.id)}
                    onChangeOwner={(ownerId) => updateOwner(task.id, ownerId)}
                />
            ))}
        </div>
    );
}
