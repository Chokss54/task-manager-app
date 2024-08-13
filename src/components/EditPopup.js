import { strings } from '../localisation/Strings'
import { useState, useContext } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { TasksContext } from '../utils/TasksContext';
import TasksList from '../models/Tasks';

const EditPopup = ({ task, view, updateView }) => {

  const [form, setForm] = useState({
    ['title']: task.getTitle,
    ['desc']: task.getDesc,
    ['dueDate']: task.getDueDate
  });
  const [errors, setErrors] = useState({});
  const { tasksData, setTasksData } = useContext(TasksContext);

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    })

    if (!!errors[field]) {
      setErrors({
        ...errors,
        [field]: null
      })
    }
  }

  const handleClose = () => {
    updateView(false)
  }

  const handleSubmit = e => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      //TODO: Implement submit form
      const updatedTask = [...TasksList.editTask(task.getId, form.title, form.desc, form.dueDate)];
      setTasksData(updatedTask); 
      handleClose();
    }
  }

  const validateForm = () => {
    const { title, desc, dueDate } = form;
    const newErrors = {};

    //check for valid inputs
    if (!title || title == '') newErrors.title = 'Please provide a title!';
    if (!desc || desc == '') newErrors.desc = 'Please provide a description!';
    if (!dueDate) newErrors.dueDate = 'Please provide a due date!';

    return newErrors
  }

  return (
    <div className="mb-4">
      <Modal show={view} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{strings("TMAPP.popup.edit.header")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>{strings("TMAPP.input.title")}</Form.Label>
              <Form.Control
                as="textarea"
                onChange={(e) => setField('title', e.target.value)}
                value={form.title}
                isInvalid={errors.title} />
              <Form.Control.Feedback type='invalid'>
                {errors.title}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>{strings("TMAPP.input.description")}</Form.Label>
              <Form.Control
                as="textarea"
                onChange={(e) => setField('desc', e.target.value)}
                value={form.desc}
                isInvalid={errors.desc} />
              <Form.Control.Feedback type='invalid'>
                {errors.desc}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="dueDate">
              <Form.Label>{strings("TMAPP.input.dueDate")}</Form.Label>
              <Form.Control 
              type="date"
              onChange={(e) => setField('dueDate', e.target.value)}
              value={form.dueDate}
              isInvalid={errors.dueDate}/>
              <Form.Control.Feedback type='invalid'>
                {errors.dueDate}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger' onClick={handleClose}>
            {strings("TMAPP.button.close")}
          </Button>
          <Button variant='success' onClick={handleSubmit}>
            {strings("TMAPP.button.save")}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default EditPopup