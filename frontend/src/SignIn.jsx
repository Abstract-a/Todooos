import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./provider/AuthProvider";
import axios from "axios";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassord] = useState("");
  const [error, setError] = useState("");
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        },
      );
      //console.log(response.data);

      localStorage.setItem("jwt", response.data.token);
      setToken(response.data.token);
      navigate("/todos");
    } catch (err) {
      console.log(err);
      setError("Failed to log in");
    }
  };

  return (
    <div>
      <h1>Sign in</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSignIn}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Passowrd"
          value={password}
          onChange={(e) => setPassord(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
