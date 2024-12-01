/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";

function UpdateTodoPopup({
  show,
  onCancel,
  initialTitle,
  initialText,
  id,
  onUpdateTodo,
}) {
  const [title, setTitle] = useState(initialTitle);
  const [text, setText] = useState(initialText);
  const [loading, setLoading] = useState(false);

  let handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:5000/api/todos/${id}`,
        { title, text },
      );
      onUpdateTodo(response.data);
      setLoading(false);
      onCancel();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setTitle(initialTitle);
    setText(initialText);
    onCancel();
  };

  if (!show) return null;
  return (
    <div className="backdrop" onClick={onCancel}>
      <div
        className="fixed left-[50%] top-[50%] z-[1000] flex w-[90%] max-w-[500px] -translate-x-1/2 -translate-y-1/2 transform flex-col gap-3 rounded-lg bg-gray-200 p-5 shadow-md"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit}>
          <label className="" htmlFor="title">
            title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            className="mb-3 w-full rounded-md border border-gray-100 p-3"
          />
          <label className="" htmlFor="text">
            text
          </label>
          <textarea
            className="mb-3 min-h-80 w-full resize-none overflow-auto rounded-md border border-gray-100 p-3"
            id="text"
            name="text"
            value={text}
            required
            onChange={(e) => setText(e.target.value)}
          />
          <button
            type="button"
            className="mr-3 cursor-pointer rounded-lg border-none bg-red-500 px-6 py-3 text-white transition-all duration-500 ease-in-out hover:bg-red-600 hover:opacity-90"
            onClick={handleCancel}
          >
            cancel
          </button>
          <button
            className="cursor-pointer rounded-lg border-none bg-green-500 px-6 py-3 text-white transition-all duration-500 ease-in-out hover:bg-green-600 hover:opacity-90"
            type="submit"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateTodoPopup;
