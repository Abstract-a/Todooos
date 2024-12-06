import TodosPage from "./pages/todos/TodosPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
function App() {
  const token = localStorage.getItem("jwt");
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route
          path="/signin"
          element={!token ? <SignIn /> : <Navigate to="/todos" />}
        />
        <Route
          path="/signup"
          element={!token ? <SignUp /> : <Navigate to="/todos" />}
        />
        {/* Private routes */}
        <Route
          path="/todo"
          element={token ? <TodosPage /> : <Navigate to="/signin" />}
        />
        {/* Catch all */}
        <Route
          path="*"
          element={<Navigate to={token ? "/todos" : "/signin"} />}
        />
        <TodosPage />
      </Routes>
    </Router>
  );
}

export default App;
