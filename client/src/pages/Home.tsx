import React, { useState } from "react";
import Navbar from "../layouts/Navbar";

const Home: React.FC = () => {
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
        <Navbar></Navbar>
    </div>
  );
};

export default Home;
