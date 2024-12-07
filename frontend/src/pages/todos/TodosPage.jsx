import axios from "axios";
import Spinner from "../../components/ui/Spinner.jsx";
import { useState, useEffect } from "react";
import AddTodoPopup from "../todos/popups/AddTodoPopup.jsx";
import SingleTodo from "../../components/SingleTodo.jsx";
import SearchBar from "../../components/ui/SearchBar.jsx";
import { useNavigate } from "react-router-dom";

function TodosPage() {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [showAddTodoPopup, setShowAddTodoPopup] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getTodos = async () => {
      const token = localStorage.getItem("jwt");
      if (!token) {
        navigate("/signin");
        return;
      }
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/todos");
        setTodos(response.data);
        setFilteredTodos(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err.response?.data?.message || "Failed to fetch todos");

        if (err.response?.status === 401) {
          localStorage.removeItem("jwt");
          navigate("/signin");
        }
      }
    };
    getTodos();
  }, []);

  const handleAddTodo = (newTodo) => {
    setTodos((prev) => [...prev, newTodo]);
    setFilteredTodos((prev) => [...prev, newTodo]);
  };

  const handleDeleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    setFilteredTodos((prevTodos) =>
      prevTodos.filter((todo) => todo._id !== id),
    );
  };

  const handleUpdateTodo = (updatedTodo) => {
    setFilteredTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === updatedTodo._id ? updatedTodo : todo,
      ),
    );

    setFilteredTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === updatedTodo._id ? updatedTodo : todo,
      ),
    );
  };

  function sortTodos(todos) {
    return todos.sort((a, b) => {
      if (a.completed === b.completed) {
        return 0;
      }
      return a.completed ? 1 : -1;
    });
  }

  const handleCompleted = (id, newCompletedStatus) => {
    setFilteredTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === id ? { ...todo, completed: newCompletedStatus } : todo,
      ),
    );
  };

  const handleSearch = (searchTerm) => {
    const lowercasedTerm = searchTerm.toLowerCase();
    setFilteredTodos(
      todos.filter((todo) => todo.title.toLowerCase().includes(lowercasedTerm)),
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/signin");
  };

  return (
    <div className="z-[900] h-screen w-screen min-w-[320px] overflow-auto rounded-xl bg-[#d6d6d6] p-5 text-center shadow-md sm:h-[500px] sm:max-w-[600px]">
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <div className="flex items-center justify-between pb-4">
            <SearchBar onSearch={handleSearch} />
            <button
              className="cursor-pointer rounded-md border-none bg-green-500 px-6 py-3 text-base text-white transition-all duration-500 ease-in-out hover:bg-green-600 md:mr-0"
              onClick={() => setShowAddTodoPopup(true)}
            >
              Add
            </button>
          </div>
          <ul className="m-0 list-none p-0">
            {sortTodos(filteredTodos).map((todo) => (
              <SingleTodo
                key={todo._id}
                {...todo}
                onDeleteTodo={handleDeleteTodo}
                onUpdateTodo={handleUpdateTodo}
                onCompleted={handleCompleted}
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
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default TodosPage;
