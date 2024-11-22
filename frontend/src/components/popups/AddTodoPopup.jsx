/* eslint-disable react/prop-types */
import { useState } from 'react';
import axios from 'axios';
// import Spinner from '../Spinner';

function AddTodoPopup({ onAddTodo, show, onCancel }) {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/todos', {
        title,
        text,
      });
      // console.log('success', response.data);
      onAddTodo(response.data);
      setLoading(false);
      setTitle('');
      setText('');
      onCancel();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setTitle('');
    setText('');
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
          <button onClick={handleCancel}>cancel</button>
          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTodoPopup;
