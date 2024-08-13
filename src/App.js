import './App.css';
import NewTaskPopup from './components/NewTaskPopup.js';
import { strings } from "./localisation/Strings.js";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from 'react';
import TaskCardsGrid from './components/TaskCardsGrid.js';
import { TasksContext } from './utils/TasksContext.js';
import { Container } from 'react-bootstrap';
import TasksList from './models/Tasks.js';
import WeatherCard from './components/WeatherCard.js';


function App() {
  //Initialising List to store data objects
  const [tasksData, setTasksData] = useState(TasksList.getTasks());

  return (
    <div className='page'>
      <Container className='pt-5' id='header'>
        <div className='d-flex flex-column flex-lg-row'>
          <section className="mb-3 text-white">
            <h1 className='font-header tma-header'>
              {strings("TMAPP.title")}
            </h1>
            <p className='fst-italic fw-bold'>
              {strings("TMAPP.description")}
            </p>
          </section>
          <section id='weather' className='mb-4 ms-lg-auto'>
            <WeatherCard />
          </section>
        </div>
        <section id='tasks'>
          <TasksContext.Provider value={{ tasksData, setTasksData }}>
            <NewTaskPopup />
            <TaskCardsGrid tasksPerPage={10} />
          </TasksContext.Provider>
        </section>

      </Container>
    </div>
  );
}

export default App;
