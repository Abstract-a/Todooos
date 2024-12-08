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

  return <button onClick={handleSignOut}>signout</button>;
};

export default Signout;
