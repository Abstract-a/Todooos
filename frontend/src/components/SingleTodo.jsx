/* eslint-disable react/prop-types */
import axios from 'axios';
import { useState } from 'react';
import DeleteTodoPopup from './popups/DeleteTodoPopup';
import UpdateTodoPopup from './popups/UpdateTodoPopup';
import ShowTodoPopup from './popups/ShowTodoPopup';
import { formatTime } from '../utils/dateHelper';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CheckIcon from '@mui/icons-material/Check';
import VisibilityIcon from '@mui/icons-material/Visibility';

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
  const [showTodoPupup, setShowTodoPupup] = useState(false);
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

  const handleCancelShow = () => {
    setShowTodoPupup(false);
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
    <div className="todo-container">
      <li className="todo-container-li">
        <div className="todo-container-left">
          <button onClick={handleCompleted}>
            <CheckIcon />
          </button>
          <button onClick={() => setShowTodoPupup(true)}>
            <VisibilityIcon />
          </button>
        </div>
        <div className="todo-container-center">
          <h3 className={completed ? 'striked' : ''}>{title}</h3>
          {/* <p>{text}</p> */}
          {/* <p>{formatTime(createdAt)}</p> */}
          {/* <p>update date : {formatTime(updateDate)}</p> */}
          <p
            style={completed ? {} : { display: 'none' }}
          >{`completion date : ${formatTime(updateDate)}`}</p>
        </div>
        <div className="todo-container-right">
          <button onClick={() => setshowConfirmUpdatePopup(true)}>
            <ModeEditIcon />
          </button>
          <button onClick={() => setShowConfirmDeletePopup(true)}>
            <DeleteForeverIcon />
          </button>
        </div>
      </li>
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
      <ShowTodoPopup
        show={showTodoPupup}
        onCancel={handleCancelShow}
        initialText={text}
        initialTitle={title}
        createdAt={createdAt}
        updatedAt={updatedAt}
      />
    </div>
  );
}

export default SingleTodo;
