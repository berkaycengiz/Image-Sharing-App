import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/loginService";
import SliderCheckbox from "../components/SliderCheckbox";
import SubmitButton from "../components/SubmitButton";

interface FormData {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
  const { email, password } = formData;

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    if ((name === 'email' && value.length > 0)){
        setError('');
    }
    else {
        setError('Please make sure all fields are filled in correctly.');
    }
    if((name === 'password' && value.length > 0)){
        setError('');
    }
    else{
        setError('Please make sure all fields are filled in correctly.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      navigate("/");
    } catch (err: any) {
      setError(err);
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-6 rounded-2xl shadow-secondary shadow-2xl w-97">
        <h2 className="text-xl self-center font-display text-primary mb-2 font-bold">Login</h2>
        {error && <p className="text-error text-sm font-display">{error}</p>}
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
        <SliderCheckbox></SliderCheckbox>
        <Link to="/register" className="underline text-secondary mb-2 font-display hover:text-hover transition">
        Don't have an account yet?</Link>
        <SubmitButton>LOGIN</SubmitButton>
      </form>
    </div>
  );
};

export default Login;
