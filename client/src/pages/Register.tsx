import React, { useState } from "react";
import { useRegisterStore } from "../store/registerStore";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/registerService";

const Register: React.FC = () => {
  const { username, email, password, setUsername, setEmail, setPassword } = useRegisterStore();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(username, email, password);
      console.log("Registration Successful!");
      navigate("/login");
    } catch (err: any) {
      setError(err || "Registration failed");
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-6 rounded-2xl shadow-2xl w-90">
        <h2 className="text-xl self-center font-display mb-4">Register</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 py-2 border rounded mb-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded mb-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded mb-2"
        />
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
