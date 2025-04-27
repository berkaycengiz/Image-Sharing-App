import React, { useState } from "react";
import { useRegisterStore } from "../store/registerStore";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/registerService";
import SubmitButton from "../components/SubmitButton";
import Navbar from "../layouts/Navbar";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import CircleButton from "../components/CircleButton";
import { uploadProfilePic } from "../services/uploadService";
import { AiOutlineLoading3Quarters } from "react-icons/ai";


const Register: React.FC = () => {
  const { username, email, password, confirmPassword, setUsername, setEmail, setPassword, setConfirmPassword } = useRegisterStore();

  const [error, setError] = useState("");
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [activeCard, setActiveCard] = useState<1 | 2>(1);
  
  const navigate = useNavigate();

  const setters: { [key: string]: (value: string) => void } = {
  username: setUsername,
  email: setEmail,
  password: setPassword,
  confirmPassword: setConfirmPassword,
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePic(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    const value = event.target.value.trim();
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
    setIsLoading(true);
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    try {
      await registerUser(username, email, password);
      await uploadProfilePic(profilePic, username);
      navigate("/login");
    } 
    catch (err: any) {
      setIsLoading(false);
      setError(err);
    }
  };
  
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Navbar></Navbar>
      <div className="flex flex-col relative items-center mt-24">
        <form className="flex flex-col gap-4 bg-white p-6 rounded-2xl absolute shadow-secondary shadow-2xl w-97 transition-all duration-1000" style={{
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
            maxLength={20}
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
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-6 rounded-2xl absolute -translate-y- shadow-secondary shadow-2xl w-97 transition-all duration-1000" style={{
            transform: `translateX(${activeCard === 2 ? '0%' : '200%'})`,
            opacity: activeCard === 2 ? 1 : 0,
          }}>
          <h2 className="text-xl self-center font-display font-bold text-primary mb-2">Profile Picture</h2>
          {error && <p className="text-error text-sm mb-4">{error}</p>}
          <label htmlFor="profilePicInput" className="cursor-pointer block w-36 h-36 mx-auto">
            <div className="w-full h-full border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition duration-300 ease-in-out">
              {preview ? (
                <img src={preview} className="w-34 h-34 rounded-full self-center object-cover" draggable="false"/>
              ) : (
                <div className="text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs">Upload Photo</span>
                </div>
              )}
            </div>
          </label>
          <input
            id="profilePicInput"
            type="file"
            accept=".png,.jpg,.jpeg"
            className="hidden"
            onChange={handleFileChange}
          />
          <CircleButton onClick={() => setActiveCard(1)}><BsArrowLeft className="text-2xl"></BsArrowLeft></CircleButton>
          <SubmitButton disabled={isLoading} >
            {isLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin text-2xl"/>
            ) : (
              'REGISTER'
            )}
          </SubmitButton>
        </form>
      </div>
    </div>
  );
};

export default Register;
