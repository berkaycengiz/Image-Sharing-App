import React, { useState, useEffect } from 'react';
import Navbar from '../layouts/Navbar';
import { getUser } from '../services/userService';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useLoginStore } from '../store/loginStore';
import { IoCameraOutline } from "react-icons/io5";
import { updateProfilePic } from '../services/profilePictureService';
import CircleButton from '../components/CircleButton';
import { FaCheck } from 'react-icons/fa';
import { getUserPosts } from '../services/getUserPostsService';
import { FaHeart } from "react-icons/fa6";
import { GrView } from "react-icons/gr";

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
        const postData = await getUserPosts(username!);
        setUser(userData);
        setPosts(postData);
        setLoading(true);
        setError(null);
      } 
      catch (err: any) {
        setError(err);
      } 
      finally {
        setLoading(false);
      }
    };

    loadProfileData();
  }, []);

  if (loading) {
    return(
      <>
        <div className="min-h-screen overflow-hidden bg-background">
          <Navbar />
          <div className="text-center p-20 text-primary text-2xl font-bold">Loading profile...</div>;
        </div>
      </>
    )
  }

  else if (error) {
    return <div className="text-center p-10 text-error">{error} {countdown}</div>;
  }

  else if(!user && !loading) {
    return(
      <>
        <div className="min-h-screen overflow-hidden bg-background">
          <div className="text-center p-10">User not found. Redirecting to Home Page in {countdown}.</div>
        </div>
      </>
    )
  }


  return (
    <div className="min-h-screen overflow-hidden bg-background">
      <Navbar></Navbar>
        <div className="max-w-6xl mx-auto py-5 px-8 font-display">
          <div className="flex items-center my-10 gap-8">
            <div className="relative">
              {preview ? (
                <div className="relative flex flex-col">
                  <img src={preview} className="w-36 h-36 rounded-full object-cover border-4 border-hover" draggable="false" />
                  <CircleButton onClick={handleConfirm} style={{position: "absolute", zIndex: "5", top: "10px", scale: "0.8", fontSize: "20px"}}>
                    <FaCheck></FaCheck>
                  </CircleButton>
                </div>
              ) : (
                  <img src={user.profilePic} className="w-36 h-36 rounded-full object-cover border-4 border-hover" draggable="false"/>
              )}
              {nickname === user.username && (
                <>
                  <label
                    htmlFor="profilePicInput"
                    className="bg-primary/0 absolute w-full h-full rounded-full cursor-pointer top-0 hover:bg-hover/50 transition duration-300"
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

            <div className="flex items-center gap-6">
              <h2 className="text-2xl font-normal text-primary">{user.username}</h2>
                {/* <p className="text-secondary-700">{user.connected ? "Connected" : "Not Connected"}</p> */}
            </div>
          </div>
        
        <p className="text-lg font-normal text-primary">{posts.length} Posts</p>

        <hr className="my-5 border-secondary" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <Link to={`/profile/${post.postedBy.username}`} key={post._id} className="relative rounded-lg overflow-hidden shadow-sm bg-primary/0 cursor-pointer">
                <img src={post.photo} className="w-full h-auto block object-cover aspect-square" draggable="false"/>
                <div className="absolute inset-0 bg-primary/50 flex items-end opacity-0 hover:opacity-100 transition duration-400">
                  <div className="bg-primary/80 w-full flex p-4 justify-between">
                    <p className="text-white text-center">{post.description.length > 20 ? `${post.description.substring(0, 20)}...` : post.description}</p>
                    <div className="flex gap-3">
                      <p className="text-white font-light items-center gap-1.5 flex">{post.likeCount}<FaHeart></FaHeart></p>
                      <p className="text-white font-light  items-center gap-1.5 flex">{post.viewCount}<GrView></GrView></p>
                    </div>
                  </div>
                </div>
              </Link>
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