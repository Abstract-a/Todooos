/* eslint-disable react/prop-types */
import axios from 'axios';
import { useState } from 'react';
import DeleteTodoPopup from './popups/DeleteTodoPopup';
import UpdateTodoPopup from './popups/UpdateTodoPopup';
import { formatTime } from '../utils/dateHelper';

function SingleTodo({
  onDeleteTodo,
  id,
  title,
  text,
  createdAt,
  updatedAt,
  onUpdateTodo,
}) {
  const [showConfirmDeletePopup, setShowConfirmDeletePopup] = useState(false);
  const [showConfirmUpdatePopup, setshowConfirmUpdatePopup] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [updateDate, setUpdateDate] = useState(updatedAt);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/todos/${id}`
      );
      onDeleteTodo(response.data.id);
    } catch (error) {
      console.error(error);
    } finally {
      setShowConfirmDeletePopup(false);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmDeletePopup(false);
  };

  const handleCancelUpdate = () => {
    setshowConfirmUpdatePopup(false);
  };

  const handleCompleted = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/todos/${id}`,
        {
          title,
          text,
          completed: !completed,
        }
      );
      setUpdateDate(response.data.updatedAt);
    } catch (error) {
      console.log(error);
    }
    setCompleted(!completed);
  };

  return (
    <div>
      <li>
        <h3 className={completed ? 'striked' : ''}>{title}</h3>
        <p>{text}</p>
        <p>{formatTime(createdAt)}</p>
        <p>update date : {formatTime(updateDate)}</p>
        <p
          style={completed ? {} : { display: 'none' }}
        >{`completion date : ${formatTime(updateDate)}`}</p>
      </li>
      <button onClick={() => setShowConfirmDeletePopup(true)}>X</button>
      <button onClick={() => setshowConfirmUpdatePopup(true)}>Edit</button>
      <button onClick={handleCompleted}>V</button>
      <DeleteTodoPopup
        show={showConfirmDeletePopup}
        onConfirm={handleDelete}
        onCancel={handleCancelDelete}
      />
      <UpdateTodoPopup
        show={showConfirmUpdatePopup}
        onCancel={handleCancelUpdate}
        initialTitle={title}
        initialText={text}
        id={id}
        onUpdateTodo={onUpdateTodo}
      />
    </div>
  );
}

export default SingleTodo;
