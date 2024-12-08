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
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="mx-auto mt-12 flex h-[calc(100vh-3rem)] w-screen flex-col gap-8 rounded-lg bg-gray-200 pt-40 shadow-lg sm:mt-0 sm:h-[400px] sm:w-[400px] sm:gap-4 sm:pt-0">
      <h1 className="pt-6 text-center text-xl font-bold">Sign in</h1>
      <form onSubmit={handleSignIn} className="flex flex-col gap-8 sm:gap-4">
        <input
          className="mx-2 rounded-md border border-gray-400 p-2 text-lg font-medium tracking-wide"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="mx-2 rounded-md border border-gray-400 p-2 text-lg font-medium tracking-wide"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassord(e.target.value)}
          required
        />
        {error && <p className="pl-2 text-left text-red-500">{error}</p>}
        <button
          className="mx-2 cursor-pointer rounded-lg border-none bg-blue-500 px-6 py-3 text-white transition-all duration-500 ease-in-out hover:bg-blue-600 hover:opacity-90"
          type="submit"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
