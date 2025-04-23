import { useModalStore } from "../store/modalStore";
import CircleButton from "./CircleButton";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



export const PostModal = () => {
    const { isOpen, close } = useModalStore();

    const [post, setPost] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const navigate = useNavigate();

      const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          setPost(file);
          setPreview(URL.createObjectURL(file));
        }
      };
    
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 overflow-hidden">
        <div className="bg-white p-6 rounded-xl w-full max-w-md relative">
          <CircleButton onClick={close} style={{position: "absolute", top: "20px", right: "20px", fontSize: "20px", scale: "0.8"}}>
            <RxCross2></RxCross2>
          </CircleButton>
          <h2 className="text-2xl text-primary font-semibold mb-8">Share Post</h2>
          <label htmlFor="postInput" className="cursor-pointer block w-48 h-48 mx-auto mb-8">
            <div className="w-full h-full border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition duration-300 ease-in-out">
              {preview ? (
                <img src={preview} className="w-full h-full rounded-md self-center object-cover" />
              ) : (
              <div className="text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-md">Upload Photo</span>
              </div>
              )}
            </div>
          </label>
          <input
            id="postInput"
            type="file"
            accept=".png,.jpg,.jpeg"
            className="hidden"
            onChange={handleFileChange}
          />
          <textarea
            placeholder="Description"
            maxLength={120}
            className="w-full border-2 resize-none placeholder:text-secondary focus:outline-none focus:ring-1 focus:ring-primary text-secondary rounded-md p-2 h-24 mb-4"
          />
          <div className="flex justify-end">
            <button className="px-4 py-2 bg-primary text-white rounded hover:bg-hover cursor-pointer transition">Post</button>
          </div>
        </div>
      </div>
    );
  };