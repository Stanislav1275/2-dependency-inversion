import { TasksList } from "./tasks/ui/tasks-list";
import {getFromStorage, saveToStorage} from "./lib/storage.ts";

export function App() {
  return (
    <>
      <TasksList storage={{set:saveToStorage, get:getFromStorage}}/>
    </>
  );
}
