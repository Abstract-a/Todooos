/* eslint-disable react/prop-types */
import axios from 'axios';
import { useState } from 'react';
import DeleteTodoPopup from '../popups/DeleteTodoPopup';
import UpdateTodoPopup from '../popups/UpdateTodoPopup';
import ShowTodoPopup from '../popups/ShowTodoPopup';
import { formatTime } from '../utils/dateHelper';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import VisibilityIcon from '@mui/icons-material/Visibility';

function SingleTodo({
  onDeleteTodo,
  onUpdateTodo,
  onCompleted,
  _id,
  title,
  text,
  createdAt,
  updatedAt,
  completed,
}) {
  const [showConfirmDeletePopup, setShowConfirmDeletePopup] = useState(false);
  const [showConfirmUpdatePopup, setshowConfirmUpdatePopup] = useState(false);
  const [showTodoPupup, setShowTodoPupup] = useState(false);
  const [isCompleted, setIsCompleted] = useState(completed);
  const [updateDate, setUpdateDate] = useState(updatedAt);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/todos/${_id}`
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
        `http://localhost:5000/api/todos/${_id}`,
        {
          title,
          text,
          completed: !isCompleted,
        }
      );

      setUpdateDate(response.data.updatedAt);
      setIsCompleted((prev) => !prev);
      onCompleted(_id, !isCompleted);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="todo-container">
      <li className="todo-container-li">
        <div className="todo-container-left">
          <button onClick={handleCompleted}>
            {isCompleted ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
          </button>
          <div className="todo-container-left-text">
            <h3
              className={isCompleted ? 'striked' : ''}
              onClick={() => {
                setShowTodoPupup(true);
              }}
            >
              {title}
            </h3>
            <p
              style={isCompleted ? {} : { display: 'none' }}
            >{`completion date : ${formatTime(updateDate)}`}</p>
          </div>
        </div>
        <div className="todo-container-center"></div>
        <div className="todo-container-right">
          <button onClick={() => setShowTodoPupup(true)}>
            <VisibilityIcon />
          </button>
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
        id={_id}
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
