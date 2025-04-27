import React, { useEffect, useState } from "react";
import Navbar from "../layouts/Navbar";
import { useModalStore } from "../store/modalStore";
import { PostModal } from "../components/PostModal";
import SubmitButton from "../components/SubmitButton";
import { Link, useNavigate } from "react-router-dom";
import { getPosts } from "../services/getAllPostsService";
import { FaHeart } from "react-icons/fa6";
import { FaComment } from "react-icons/fa";
import { GrView } from "react-icons/gr";

const Home: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const open = useModalStore((state) => state.open);

  const navigate = useNavigate();

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const posts = await getPosts();
        setLoading(true);
        setError(null);
        setPosts(posts);
      } 
      catch (err: any) {
        console.error(err);
        setError(err);
      } 
      finally {
        setLoading(false);
      }
    };

    loadProfileData();
  }, []);

  if (error) {
    return <div className="text-center p-10 text-error">{error}</div>;
  }
  
  return (
    <div className="min-h-screen overflow-hidden bg-background">
      <Navbar></Navbar>
      <div className="max-w-6xl mx-auto py-5 px-8 font-display">
        <PostModal></PostModal>
        <SubmitButton onClick={open}>Create Post</SubmitButton>
        <hr className="my-5 border-secondary"/>
        
        <h3 className="text-2xl font-extrabold text-primary mb-4">Posts</h3>
        {loading ? (
        <div className="text-center p-20 text-primary text-2xl font-bold">Loading Posts...</div>
        ) : (
          <div className="grid grid-cols-1 max-w-md gap-32">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post._id} className="py-4 border-secondary bg-secondary rounded-xl overflow-hidden flex flex-col shadow-2xl">
                  <div className="flex items-center gap-4 mb-4 px-6">
                    <Link to={`/profile/${post.postedBy.username}`} className="rounded-full">
                    <img src={post.postedBy.profilePic} className="w-20 h-20 rounded-full object-cover border-2 border-hover"/>
                    </Link>
                    <Link to={`/profile/${post.postedBy.username}`} className="text-background text-2xl font-bold hover:text-highlight cursor-pointer transition">{post.postedBy.username}</Link>
                  </div>
                  <img src={post.photo} className="w-full h-auto block object-cover aspect-square"/>
                  <div className="flex justify-between items-center mt-4 px-6">
                    <div className="flex items-center gap-6">
                      <FaHeart className="text-3xl text-background cursor-pointer hover:text-highlight transition"></FaHeart>
                      <FaComment className="text-3xl text-background cursor-pointer hover:text-highlight transition"></FaComment>
                    </div>
                    <div className="flex items-center gap-2">
                      <GrView className="text-xl text-background"></GrView>
                      <p className="text-background text-md flex items-center">
                      {post.viewCount}
                      </p>
                    </div>
                  </div>
                  {post.likeCount > 0 && (
                  <p className="text-background text-lg flex items-center mt-2 px-6">
                    {post.likeCount} likes
                  </p>
                  )}
                  <div className="flex gap-4 mt-2 px-6">
                    <Link to={`/profile/${post.postedBy.username}`} className="text-background text-xl font-bold hover:text-highlight cursor-pointer transition">{post.postedBy.username}</Link>
                    <div className="text-background text-xl">{post.description}</div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-hover col-span-full text-center">No images shared yet.</p>
            )}
        </div>
      )}
      </div>
    </div>
  );
};

export default Home;
