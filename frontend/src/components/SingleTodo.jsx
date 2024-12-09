/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import { API_BASE_URL } from "../constants";
import DeleteTodoPopup from "../pages/todos/popups/DeleteTodoPopup";
import UpdateTodoPopup from "../pages/todos/popups/UpdateTodoPopup";
import ShowTodoPopup from "../pages/todos/popups/ShowTodoPopup";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

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

  const token = localStorage.getItem("jwt");

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/api/todos/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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

  const handleCompleted = async (e) => {
    e.stopPropagation();
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/todos/${_id}`,
        {
          title,
          text,
          completed: !isCompleted,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setUpdateDate(response.data.updatedAt);
      setIsCompleted((prev) => !prev);
      onCompleted(_id, !isCompleted);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="m-auto">
      <li
        onClick={() => {
          setShowTodoPupup(true);
        }}
        className="mb-3 flex cursor-pointer items-center justify-between rounded-md bg-slate-100 p-4 shadow-md"
      >
        <div className="flex gap-3">
          <button
            onClick={handleCompleted}
            className="ml-3 cursor-pointer border-none bg-none text-base transition-colors duration-300 ease-in-out hover:text-green-500"
          >
            {isCompleted ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
          </button>
          <div className="flex gap-3">
            <h3
              className={`cursor-pointer text-left text-[14px] font-bold md:text-lg ${`${completed ? "italic text-gray-600 line-through opacity-70 transition-all duration-500 ease-in-out hover:text-gray-700 hover:opacity-100" : ""}`}`}
            >
              {title}
            </h3>
          </div>
        </div>

        <div className={`flex flex-row gap-1`}>
          {/* <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTodoPupup(true);
            }}
            className="ml-3 hidden cursor-pointer border-none bg-none text-base transition-colors duration-300 ease-in-out hover:text-green-500 sm:block"
          >
            <VisibilityIcon />
          </button> */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setshowConfirmUpdatePopup(true);
            }}
            disabled={isCompleted}
            className={`ml-3 cursor-pointer border-none bg-none text-base transition-colors duration-300 ease-in-out hover:text-green-500`}
          >
            <ModeEditIcon style={{ color: `${completed ? "#4b5366" : ""}` }} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowConfirmDeletePopup(true);
            }}
            className="ml-3 cursor-pointer border-none bg-none text-base transition-colors duration-300 ease-in-out hover:text-red-600"
          >
            <DeleteForeverIcon />
          </button>
        </div>
      </li>
      <DeleteTodoPopup
        show={showConfirmDeletePopup}
        onConfirm={handleDelete}
        onCancel={handleCancelDelete}
        id={_id}
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
        id={_id}
        onCancel={handleCancelShow}
        initialText={text}
        initialTitle={title}
        createdAt={createdAt}
        updatedAt={updatedAt}
        completedAt={updateDate}
      />
    </div>
  );
}

export default SingleTodo;
