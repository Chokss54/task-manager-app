import Task from "./Task";

/**
 * Singletons Tasks class stores all tasks data object locally
 * Only one instance (TaskList) will be created and shared throughout the app
 */

let instance;

export class Tasks {
  constructor() {
    if (instance) {
      throw new Error('This instance already exist...');
    };
    this.tasks = [];
    instance = this;
  }

  addTask(title, desc, dueDate) {
    const task = new Task(title, desc, dueDate);
    task.toString();
    this.tasks.push(task);
    return task;
  }

  getTasks() {
    return this.tasks;
  }

  deleteTask(id) {
    const index = this.getTaskIndex(id);
    this.tasks.splice(index, 1);
    console.log("updatedArray after deletion", index, this.getTasks())
    return this.getTasks()
  }

  editTask(id, title, desc, dueDate) {
    const index = this.getTaskIndex(id);
    this.tasks.splice(index, 1, new Task(title, desc, dueDate));

    return this.getTasks();
  }

  getTaskIndex(id) {
    return this.tasks.findIndex((task) => task.getId === id);
  }

  updateTasksList(updatedTasks) {
    this.tasks = [...updatedTasks];
  }
}

const TasksList = Object.freeze(new Tasks());

export default TasksList;