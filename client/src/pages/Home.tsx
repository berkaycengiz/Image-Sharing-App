import React, { useEffect, useState } from "react";
import Navbar from "../layouts/Navbar";
import { useModalStore } from "../store/modalStore";
import { PostModal } from "../components/PostModal";
import SubmitButton from "../components/SubmitButton";
import { Link } from "react-router-dom";
import { getPosts } from "../services/getAllPostsService";
import { FaHeart } from "react-icons/fa6";
import { FaComment } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { BsThreeDotsVertical } from "react-icons/bs";
import DropdownMenu from "../components/DropdownMenu";
import { FaTrash } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";import { useLoginStore } from "../store/loginStore";
import UpdateModal from "../components/UpdateModal"
import { useUpdateModalStore } from "../store/updateModalStore";
import { useDeleteModalStore } from "../store/deleteModalStore";
import DeleteModal from "../components/DeleteModal";


const Home: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [selectedDescription, setSelectedDescription] = useState<string>('');

  const open = useModalStore((state) => state.open);
  const openUpdate = useUpdateModalStore((state) => state.openUpdate);
  const openDelete = useDeleteModalStore((state) => state.openDelete);
  
  const { nickname } = useLoginStore();

  useEffect(() => {
    const loadPosts = async () => {
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

    loadPosts();
  }, []);

  if (error) {
    return <div className="text-center p-10 text-error">{error}</div>;
  }

  const handleDeletePost = async (id: string) => {
    setSelectedPostId(id);
    openDelete();
  };

  const handleEditPost = (id: string, description: string) => {
    setSelectedPostId(id);
    setSelectedDescription(description);
    openUpdate();
  };

  return (
    <div className="min-h-screen overflow-hidden bg-background">
      <Navbar></Navbar>
      <div className="max-w-6xl mx-auto py-5 px-8 font-display">
        <PostModal></PostModal>
        {selectedPostId && (
          <UpdateModal
            postId={selectedPostId}
            currentDescription={selectedDescription}
          />
        )}
        {selectedPostId && (
          <DeleteModal
            postId={selectedPostId}
          />
        )}
        <SubmitButton onClick={open} style={{}}>Create Post</SubmitButton>
        
        <hr className="my-5 border-secondary"/>
        
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-extrabold text-primary">Latest Posts</h3>
        </div>
        {loading ? (
        <div className="text-center p-20 text-primary text-2xl font-bold">Loading Posts...</div>
        ) : (
          <div className="flex justify-around">
            <div className="grid grid-cols-1 max-w-lg gap-32">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post._id} className="py-4 border-secondary bg-secondary rounded-xl overflow-hidden flex flex-col shadow-2xl">
                  <div className="flex justify-between items-center mb-4 px-6">
                    <div className="flex gap-4 items-center">
                      <Link to={`/profile/${post.postedBy.username}`} className="rounded-full">
                      <img src={post.postedBy.profilePic} className="w-20 h-20 rounded-full object-cover border-2 border-hover" draggable="false"/>
                      </Link>
                      <Link to={`/profile/${post.postedBy.username}`} className="text-background text-2xl font-bold hover:text-highlight cursor-pointer transition">{post.postedBy.username}</Link>
                    </div>
                    { nickname === post.postedBy.username && (
                      <DropdownMenu
                        items={[
                          { label: 'Delete Post', onClick: () => handleDeletePost(post._id), icon: <FaTrash></FaTrash> },
                          { label: 'Edit Post', onClick: () => handleEditPost(post._id, post.description), icon: <FaPencilAlt></FaPencilAlt> }
                        ]}
                        trigger={
                          <div className="flex gap-4 items-center text-3xl cursor-pointer text-background hover:text-highlight transition">
                            <BsThreeDotsVertical></BsThreeDotsVertical>
                          </div>
                        }
                      />
                    )}
                  </div>
                  <Link to={`/post/${post._id}`}>
                    <img src={post.photo} className="w-full h-auto block object-cover aspect-square" draggable="false"/>
                  </Link>
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
                    <div className="text-background text-xl">{post.description.length > 28 ? `${post.description.substring(0, 28)}...` : post.description}</div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-hover col-span-full text-center">No images shared yet.</p>
            )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
