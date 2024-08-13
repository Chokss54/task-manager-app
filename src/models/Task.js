import IDGenerator from "../utils/IDGenerator";

/**
 * Task Class stores all task attributes
 */
class Task {
  constructor(title, desc, dueDate) {
    this.id = IDGenerator.generateId();
    this.title = title;
    this.desc = desc;
    const [year, month, day] = dueDate.split('-');
    this.dueDate = `${day}-${month}-${year}`;
  }

  get getId() {
    return this.id;
  }

  get getTitle() {
    return this.title;
  }

  get getDesc() {
    return this.desc;
  }

  get getDueDate() {
    return this.dueDate;
  }

  toString() {
    return `id: ${this.id}, title: ${this.title}, desc: ${this.desc}, date: ${this.getDueDate}`
  }
}

export default Task;