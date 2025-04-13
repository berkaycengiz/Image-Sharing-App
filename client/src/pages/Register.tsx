import React, { useState } from "react";
import { useRegisterStore } from "../store/registerStore";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/registerService";
import SubmitButton from "../components/SubmitButton";
import Navbar from "../layouts/Navbar";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import CircleButton from "../components/CircleButton";

const Register: React.FC = () => {
  const { username, email, password, confirmPassword, setUsername, setEmail, setPassword, setConfirmPassword } = useRegisterStore();

  const [error, setError] = useState("");

  const [activeCard, setActiveCard] = useState<1 | 2>(1);
  
  const navigate = useNavigate();

  const setters: { [key: string]: (value: string) => void } = {
  username: setUsername,
  email: setEmail,
  password: setPassword,
  confirmPassword: setConfirmPassword,
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const setter = setters[name];
    if (setter) {
      setter(value);
      setError("");
    }
    if (name === 'password' && value.length < 6) {
      setError('Password must be at least 6 characters long.');
      return
    }
    else if(name === 'confirmPassword' && value !== password){
      setError('Passwords do not match!');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    try {
      await registerUser(username, email, password);
      navigate("/login");
    } catch (err: any) {
      setError(err);
    }
  };
  
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Navbar></Navbar>
      <div className="flex flex-col items-center justify-center mt-24">
        <form className="flex flex-col gap-4 bg-white p-6 rounded-2xl shadow-secondary shadow-2xl w-97 transition-all duration-1000" style={{
            transform: `translateX(${activeCard === 1 ? '0%' : '-200%'})`,
            opacity: activeCard === 1 ? 1 : 0,
          }}>
          <h2 className="text-xl self-center font-display font-bold text-primary mb-2">Register</h2>
          {error && <p className="text-error text-sm">{error}</p>}
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={handleChange}
            className="w-full px-3 py-2 border placeholder:text-secondary focus:outline-none focus:ring-1 focus:ring-primary text-secondary rounded mb-2"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
            className="w-full px-3 py-2 border placeholder:text-secondary focus:outline-none focus:ring-1 focus:ring-primary text-secondary rounded mb-2"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
            className="w-full px-3 py-2 border placeholder:text-secondary focus:outline-none focus:ring-1 focus:ring-primary text-secondary rounded mb-2"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 border placeholder:text-secondary focus:outline-none focus:ring-1 focus:ring-primary text-secondary rounded mb-2"
          />
          <Link to="/login" className="underline text-secondary mb-2 font-display hover:text-hover transition">
          Already registered?</Link>
          <CircleButton onClick={() => setActiveCard(2)}><BsArrowRight className="text-2xl"></BsArrowRight></CircleButton>
        </form>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-6 rounded-2xl -translate-y-75 shadow-secondary shadow-2xl w-97 transition-all duration-1000" style={{
            transform: `translateX(${activeCard === 2 ? '0%' : '200%'})`,
            opacity: activeCard === 2 ? 1 : 0,
          }}>
          <h2 className="text-xl self-center font-display font-bold text-primary mb-2">Profile Picture</h2>
          {error && <p className="text-error text-sm">{error}</p>}
          <CircleButton onClick={() => setActiveCard(1)}><BsArrowLeft className="text-2xl"></BsArrowLeft></CircleButton>
          <SubmitButton>REGISTER</SubmitButton>
        </form>
      </div>
    </div>
  );
};

export default Register;
