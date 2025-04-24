import React, { useState, useEffect } from 'react';
import Navbar from '../layouts/Navbar';
import { getUser } from '../services/userService';
import { useNavigate, useParams } from 'react-router-dom';
import { useLoginStore } from '../store/loginStore';
import { IoCameraOutline } from "react-icons/io5";
import { updateProfilePic } from '../services/profilePictureService';
import CircleButton from '../components/CircleButton';
import { FaCheck } from 'react-icons/fa';

const Profile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const { nickname } = useLoginStore();

  const { username } = useParams();
  
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePic(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleConfirm = async () => {
    try {
      if(username!){
        await updateProfilePic(profilePic, username);      
        navigate(0);    
      }
    } 
    catch (err: any) {
      setError(err);
    }
  };
    
  useEffect(() => {
    if (!user) {
      const timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);

      const redirect = setTimeout(() => {
        navigate("/");
      }, 3000);

      return () => {
        clearInterval(timer);
        clearTimeout(redirect);
      };
    }
  }, [user]);
  
  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const userData = await getUser(username!);
        setUser(userData);
        setLoading(true);
        setError(null);
        setPosts([
        ]);
      } 
      catch (err) {
        console.error("Error loading profile:", err);
        setError('Failed to load profile data.');
      } 
      finally {
        setLoading(false);
      }
    };

    loadProfileData();
  }, []);

  if(!user && !loading) {
    return(
      <>
        <Navbar />
        <div className="text-center p-10">User not found. Redirecting to Home Page in {countdown}.</div>
      </>
    )
  }

  if (loading) {
    return <div className="text-center p-20 text-primary text-2xl font-bold">Loading profile...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-error">{error}</div>;
  }

  return (
    <div className="min-h-screen overflow-hidden bg-background">
      <Navbar></Navbar>
        <div className="max-w-6xl mx-auto py-5 px-8 font-display">
          <div className="flex items-center my-10 gap-8">
            <div className="relative">
              {preview ? (
                <div className="relative flex flex-col">
                  <img src={preview} className="w-36 h-36 rounded-full object-cover border-4 border-hover" />
                  <CircleButton onClick={handleConfirm} style={{position: "absolute", zIndex: "5", top: "10px", scale: "0.8", fontSize: "20px"}}>
                    <FaCheck></FaCheck>
                  </CircleButton>
                </div>
              ) : (
                  <img
                  src={user.profilePic}
                  className="w-36 h-36 rounded-full object-cover border-4 border-hover"
                  />
              )}
              {nickname === user.username && (
                <>
                  <label
                    htmlFor="profilePicInput"
                    className="bg-primary/0 absolute w-36 h-36 mx-auto rounded-full cursor-pointer top-0 hover:bg-hover/50 transition duration-300"
                  >
                    <div className="w-full h-full flex items-center justify-center opacity-0 hover:opacity-100 transition duration-300">
                      <IoCameraOutline className='text-4xl text-highlight'></IoCameraOutline>
                    </div>
                  </label>
                  <input
                    id="profilePicInput"
                    type="file"
                    accept=".png,.jpg,.jpeg"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </>
              )}
            </div>

            <div className="flex-grow">
              <h2 className="text-2xl font-normal text-primary mb-2">{user.username}</h2>
                {/* <p className="text-secondary-700">{user.connected ? "Connected" : "Not Connected"}</p> */}
            </div>
          </div>

        <hr className="my-5 border-secondary" />

        <h3 className="text-xl font-semibold text-primary mb-4">Posts</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="border border-gray-200 rounded overflow-hidden shadow-sm">
                <img src={post.url} className="w-full h-auto block object-cover aspect-square" />
              </div>
            ))
          ) : (
            <p className="text-hover col-span-full text-center">No images shared yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;