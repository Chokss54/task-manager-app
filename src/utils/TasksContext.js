import { createContext } from "react";

/**
 * useContext hook for handling data that will be passed between components
 */

const defaultContextValue = {
  tasksData: [],
  setTasksData: () => {}
};

export const TasksContext = createContext(defaultContextValue);