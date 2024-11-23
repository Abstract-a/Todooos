import axios from 'axios';
import Spinner from '../components/ui/Spinner.jsx';
import { useState, useEffect } from 'react';
import AddTodoPopup from '../components/AddTodoPopup.jsx';
import SingleTodo from '../components/SingleTodo.jsx';
import SearchBar from '../components/ui/SearchBar.jsx';

function TodosPage() {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [showAddTodoPopup, setShowAddTodoPopup] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5000/api/todos')
      .then((response) => {
        setTodos(response.data);
        setFilteredTodos(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  const handleAddTodo = (newTodo) => {
    setTodos((prev) => [...prev, newTodo]);
    setFilteredTodos((prev) => [...prev, newTodo]);
  };

  const handleDeleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    setFilteredTodos((prevTodos) =>
      prevTodos.filter((todo) => todo._id !== id)
    );
  };

  const handleUpdateTodo = (updatedTodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === updatedTodo._id ? updatedTodo : todo
      )
    );

    setFilteredTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === updatedTodo._id ? updatedTodo : todo
      )
    );
  };

  const handleSearch = (searchTerm) => {
    const lowercasedTerm = searchTerm.toLowerCase();
    setFilteredTodos(
      todos.filter((todo) => todo.title.toLowerCase().includes(lowercasedTerm))
    );
  };

  return (
    <div className="container">
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <div className="search-add-container">
            <SearchBar onSearch={handleSearch} />
            <button
              className="add-btn"
              onClick={() => setShowAddTodoPopup(true)}
            >
              Add
            </button>
          </div>
          <ul>
            {filteredTodos.map((todo) => (
              <SingleTodo
                key={todo._id}
                id={todo._id}
                title={todo.title}
                text={todo.text}
                onDeleteTodo={handleDeleteTodo}
                onUpdateTodo={handleUpdateTodo}
                createdAt={todo.createdAt}
                updatedAt={todo.updatedAt}
              />
            ))}
          </ul>
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
