/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
// import Spinner from '../Spinner';

function AddTodoPopup({ onAddTodo, show, onCancel }) {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onCancel();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onCancel]);

  const token = localStorage.getItem("jwt");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/todos",
        {
          title,
          text,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      // console.log('success', response.data);
      onAddTodo(response.data);
      setLoading(false);
      setTitle("");
      setText("");
      onCancel();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setText("");
    onCancel();
  };
  if (!show) return null;

  return (
    <div className="backdrop" onClick={onCancel}>
      <div
        className="confirm-popup fixed left-[50%] top-[50%] z-[1000] flex w-[90%] max-w-[500px] -translate-x-1/2 -translate-y-1/2 transform flex-col gap-3 rounded-lg bg-gray-200 p-5 shadow-md"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="title"
            id="title"
            name="title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            className="mb-3 w-full rounded-md border border-gray-100 p-3"
          />

          <textarea
            className="mb-3 min-h-80 w-full resize-none overflow-auto rounded-md border border-gray-100 p-3"
            placeholder="description"
            id="text"
            name="text"
            value={text}
            required
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className="mr-3 cursor-pointer rounded-lg border-none bg-red-500 px-6 py-3 text-white transition-all duration-500 ease-in-out hover:bg-red-600 hover:opacity-90"
            onClick={handleCancel}
          >
            cancel
          </button>
          <button
            className="cursor-pointer rounded-lg border-none bg-green-500 px-6 py-3 text-white transition-all duration-500 ease-in-out hover:bg-green-600 hover:opacity-90"
            type=" submit"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTodoPopup;
