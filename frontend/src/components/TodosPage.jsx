import axios from 'axios';
import Spinner from './Spinner';
import { useState, useEffect } from 'react';
import AddTodoPopup from './popups/AddTodoPopup';
import SingleTodo from './SingleTodo';

function TodosPage() {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);

  const [showAddTodoPopup, setShowAddTodoPopup] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5000/api/todos')
      .then((response) => {
        setTodos(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(true);
        console.log(error);
      });
  }, []);

  const handleAddTodo = (newTodo) => {
    setTodos((prev) => [...prev, newTodo]);
  };

  const handleDeleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
  };

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <ul>
            {todos.map((todo) => (
              <SingleTodo
                key={todo._id}
                id={todo._id}
                title={todo.title}
                text={todo.text}
                onDeleteTodo={handleDeleteTodo}
              />
            ))}
          </ul>
          <button onClick={() => setShowAddTodoPopup(true)}>add</button>
          <AddTodoPopup
            onAddTodo={handleAddTodo}
            onCancel={() => setShowAddTodoPopup(false)}
            show={showAddTodoPopup}
          />
        </div>
      )}
    </div>
  );
}

export default TodosPage;
