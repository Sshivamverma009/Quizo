import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import getId from "../context/userContext.js";
import axios from "axios";

const Login = () => {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [error, setError] = useState(null);
  let { teacherId, setTeacher_Id } = getId();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/user/login", {
        username: loginUsername,
        password: loginPassword,
      })
      .then((response) => {
        setError("");
        const id = response.data?.id;
        if (id) {
          setTeacher_Id(id);
          localStorage.setItem("t_id", id);
          navigate(`/dashboard/${id}`);
        } else {
          setError("Invalid response from server.");
        }
      })
      .catch((error) => {
        setError("Invalid credentials or server error.");
        console.error("Login failed:", error);
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/user/register", {
        username: registerUsername,
        password: registerPassword,
      })
      .then((response) => {
        setError("");
        const id = response.data?.id;
        if (id) {
          setTeacher_Id(id);
          localStorage.setItem("t_id", id);
          navigate(`/dashboard/${id}`);
        }
      })
      .catch((error) => {
        setError("Registration failed or server error.");
        console.error("Registration failed:", error);
      });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h1>
        <form onSubmit={handleLogin}>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <Input
            type="text"
            placeholder="Enter username"
            value={loginUsername}
            onChange={(e) => setLoginUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Enter password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <Button type="submit">Login</Button>
        </form>

        <h2 className="text-xl font-bold mt-8 mb-4 text-gray-800 text-center">Register</h2>
        <form onSubmit={handleRegister}>
          <Input
            type="text"
            placeholder="Enter username"
            value={registerUsername}
            onChange={(e) => setRegisterUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Enter password"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
          />
          <Button type="submit">Register</Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
