import React from "react";
import Navbar from "../layouts/Navbar";
import { useModalStore } from "../store/modalStore";
import { PostModal } from "../components/PostModal";

const Home: React.FC = () => {

  const open = useModalStore((state) => state.open);
  
  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-background">
        <Navbar></Navbar>
        <button onClick={open} className="">
          Share Post
        </button>
        <PostModal></PostModal>
        {/* <hr className="my-5 border-secondary" /> */}
    </div>
  );
};

export default Home;
