import TodosPage from "./pages/todos/TodosPage";
import { useContext } from "react";
import { AuthContext } from "./provider/AuthProvider";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Navbar from "./Navbar";

function App() {
  const { token } = useContext(AuthContext);

  return (
    <Router>
      <Navbar />
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
          path="/todos"
          element={token ? <TodosPage /> : <Navigate to="/signin" />}
        />
        {/* Catch all */}
        <Route
          path="*"
          element={<Navigate to={token ? "/todos" : "/signin"} />}
        />
        {/* <TodosPage /> */}
      </Routes>
    </Router>
  );
}

export default App;
