import { Card } from 'react-bootstrap';
import { DeleteIcon, EditIcon } from '../assets/icons';
import React, { useContext, useState } from 'react';
import { TasksContext } from '../utils/TasksContext';
import TasksList from '../models/Tasks';
import EditPopup from './EditPopup';
import '../App.css';


const TaskCard = ({ task, onDelete }) => {
  const title = task.getTitle;
  const desc = task.getDesc;
  const date = task.getDueDate;

  console.log(date);

  const { tasksData, setTasksData } = useContext(TasksContext);
  const [display, setDisplay] = useState(false);

  const handleDelete = () => {
    //TODO implement delete task
    TasksList.deleteTask(task.getId);
    const updatedTasks = [...TasksList.getTasks()]
    setTasksData(updatedTasks);
    onDelete();
  }

  const handleEdit = () => {
    //TODO implement edit task
    setDisplay(true);
  }

  const updateDisplay = (view) => {
    setDisplay(view);
  };

  return (
    <div className='h-100 position-relative task-card-layout'>
      <div className="mb-5">
        <div className="mb-1 fs-4 task-card-title">{title}</div>
        <div className="mb-1 fs-5">
          {desc}
        </div>
        <div className="position-absolute bottom-0 start-0 end-0 d-flex justify-content-between align-items-end py-3 px-4">
          <div className="mb-0 text-muted fs-6">
            due: {date}
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-danger" onClick={handleDelete}>
              <DeleteIcon />
            </button>
            <button className="btn btn-success" onClick={handleEdit}>
              <EditIcon />
            </button>
            {display && (
              <EditPopup task={task} view={display} updateView={updateDisplay} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;