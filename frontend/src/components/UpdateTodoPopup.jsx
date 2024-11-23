/* eslint-disable react/prop-types */
import { useState } from 'react';
import axios from 'axios';

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
        { title, text }
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
      <div className="confirm-popup" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="text">text</label>
          <textarea
            id="text"
            name="text"
            value={text}
            required
            onChange={(e) => setText(e.target.value)}
          />
          <button type="button" onClick={handleCancel}>
            cancel
          </button>
          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateTodoPopup;
