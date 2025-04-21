import React, { useState, useEffect } from 'react';
import Navbar from '../layouts/Navbar';
import { getUser } from '../services/userService';
import { useParams } from 'react-router-dom';

const Profile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { username } = useParams();
  
  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const userData = await getUser(username!);
        console.log(userData);
        setUser(userData);
        setLoading(true);
        setError(null);
        setImages([
        ]);
      } catch (err) {
        console.error("Error loading profile:", err);
        setError('Failed to load profile data.');
      } finally {
        setLoading(false);
      }
    };

    loadProfileData();
  }, []);

  if (loading) {
    <Navbar></Navbar>
    return <div className="text-center p-20 text-primary text-2xl font-bold">Loading profile...</div>;
  }

  if (error) {
    <Navbar></Navbar>
    return <div className="text-center p-10 text-red-600">{error}</div>;
  }

  if (!user) {
    <Navbar></Navbar>
    return <div className="text-center p-10">User not found.</div>;
  }

  return (
    <div className="min-h-screen overflow-hidden bg-background">
      <Navbar></Navbar>
        <div className="max-w-4xl mx-auto p-5 font-display">
          <div className="flex items-center mb-5">
            <img
              src={user.profilePic}
              alt={`${user.username}'s profile`}
              className="w-36 h-36 rounded-full object-cover mr-8 border-2 border-gray-300"
            />
            <div className="flex-grow">
              <h2 className="text-2xl font-semibold mb-2">{user.username}</h2>
              <p className="text-gray-700">{user.connected || 'No bio available.'}</p>
            </div>
          </div>

        <hr className="my-5 border-gray-300" />

        <h3 className="text-xl font-semibold mb-4">Posts</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {images.length > 0 ? (
            images.map((image) => (
              <div key={image.id} className="border border-gray-200 rounded overflow-hidden shadow-sm">
                <img src={image.url} alt={image.caption || 'User image'} className="w-full h-auto block object-cover aspect-square" />
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">No images shared yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;