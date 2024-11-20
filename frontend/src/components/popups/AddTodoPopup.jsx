import { useState } from 'react';
import axios from 'axios';
// import Spinner from '../Spinner';

// eslint-disable-next-line react/prop-types
function AddTodoPopup({ onAddTodo, show, onCancel }) {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

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
  if (!show) return null;

  return (
    <div className="confirm-popup">
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
        <input
          type="textarea"
          id="text"
          name="text"
          value={text}
          required
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={onCancel}>cancel</button>
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

export default AddTodoPopup;
