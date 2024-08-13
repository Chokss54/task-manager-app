import { useContext, useEffect, useState } from 'react';
import { TasksContext } from '../utils/TasksContext';
import TaskCard from './TaskCard';
import { Row, Col, Pagination } from 'react-bootstrap';

const TaskCardsGrid = ({ tasksPerPage }) => {
  const { tasksData } = useContext(TasksContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationItems, setPaginationItems] = useState([]);
  const [viewTasksInPage, setViewTasksInPage] = useState([]);

  const handlePageClick = (pageNo) => {
    setCurrentPage(pageNo)
  }

  const generatePaginationItems = () => {
    const maxPages = Math.ceil(tasksData.length / 10);
    const items = [];

    for (let pageNo = 1; pageNo <= maxPages; pageNo++) {
      items.push(<Pagination.Item key={pageNo} active={pageNo === currentPage} onClick={() => handlePageClick(pageNo)}>
        {pageNo}
      </Pagination.Item>)
    }
    setPaginationItems(items)
  }

  const calculateTasksInPage = () => {
    const pageIndex = currentPage - 1;
    const firstIndex = pageIndex * tasksPerPage;
    const lastIndex = firstIndex + tasksPerPage;

    const tasksInPage = tasksData.slice(firstIndex, lastIndex);

    return tasksInPage
  }

  const generateTasksInPage = (tasksInPage) => {
    const updatedTasks = tasksInPage.map(task => (
      <Col key={task.getId} >
        <TaskCard key={task.getId} task={task} onDelete={() => handlePagesAfterDelete()} />
      </Col>
    ))

    setViewTasksInPage(updatedTasks)
  }

  // Using a callback function to be notified when a task is deleted
  // this is to handle cases to return to previous page when the last item of a page is deleted
  // I'm sure using a callback is not the best solution... need advice 
  const handlePagesAfterDelete = () => {
    const tasksInPage = calculateTasksInPage();
    console.log("tasks in page: ", tasksInPage.length)
    console.log("current page: ", currentPage)
    if (tasksInPage.length <= 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  // re-render page and tasks to be displayed on the view
  useEffect(() => {
    generatePaginationItems();
    generateTasksInPage(calculateTasksInPage())
  }, [currentPage, tasksData]);

  return (
    <div>
      <div className='mb-5'>
        <Row xs={1} md={2} className="g-4">
          {viewTasksInPage}
        </Row>
      </div>
      <Pagination className='d-flex justify-content-center pb-4'>
        {paginationItems}
      </Pagination>
    </div>
  );
};

export default TaskCardsGrid;