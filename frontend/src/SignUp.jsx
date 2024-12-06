import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [passowrd, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const response = await axios.post("http://localhost:5000/register", {
        email,
        passowrd,
      });
      if (response.status === 201) {
        setSuccess("Registration successful! You can now log in");
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Registration failed");
      } else {
        setError("Something went wrong. please try again");
      }
    }
  };
  return (
    <div>
      <h1>Sign up</h1>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
      <form onSubmit={handleSignUp}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={passowrd}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};
