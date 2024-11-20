import axios from 'axios';
import { useState } from 'react';
import DeleteTodoPopup from './popups/DeleteTodoPopup';

// eslint-disable-next-line react/prop-types
function SingleTodo({ onDeleteTodo, id, title, text }) {
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/todos/${id}`
      );
      onDeleteTodo(response.data.id);
    } catch (error) {
      console.error(error);
    } finally {
      setShowConfirmPopup(false);
    }
  };
  return (
    <div>
      <li>
        <h3>{title}</h3>
        <p>{text}</p>
      </li>
      <button onClick={() => setShowConfirmPopup(true)}>X</button>
      <DeleteTodoPopup
        show={showConfirmPopup}
        onConfirm={handleDelete}
        onCancel={() => setShowConfirmPopup(false)}
      />
    </div>
  );
}

export default SingleTodo;
