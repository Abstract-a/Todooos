import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const response = await axios.post("http://localhost:5000/api/users", {
        name,
        email,
        password,
      });
      if (response.status === 201) {
        setSuccess("Registration successful! You can now log in");
        setTimeout(() => {
          navigate("/todos");
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
    <div className="mx-auto mt-12 flex h-[calc(100vh-3rem)] w-screen flex-col gap-8 rounded-lg bg-gray-200 pt-40 shadow-lg sm:mt-0 sm:h-[400px] sm:w-[400px] sm:gap-4 sm:pt-0">
      <h1 className="pt-6 text-center text-xl font-bold">Sign up</h1>
      <form onSubmit={handleSignUp} className="flex flex-col gap-8 sm:gap-4">
        <input
          className="mx-2 rounded-md border border-gray-400 p-2 text-lg font-medium tracking-wide"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="pl-2 text-left text-red-500">{error}</p>}
        {success && <p className="pl-2 text-left text-green-500">{success}</p>}
        <button
          className="mx-2 cursor-pointer rounded-lg border-none bg-blue-500 px-6 py-3 text-white transition-all duration-500 ease-in-out hover:bg-blue-600 hover:opacity-90"
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
