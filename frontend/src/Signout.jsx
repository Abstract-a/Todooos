import { useContext } from "react";
import { AuthContext } from "./provider/AuthProvider.jsx";
import { useNavigate } from "react-router-dom";

const Signout = () => {
  const { token, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    setToken(null);
    console.log(localStorage.getItem("jwt"));
    navigate("/signin");
  };

  return (
    <button
      className="font-semibold tracking-wider transition-all duration-300 ease-in-out hover:opacity-80"
      onClick={handleSignOut}
    >
      Sign Out
    </button>
  );
};

export default Signout;
