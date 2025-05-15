import { useState, useEffect } from "react";
import CircleButton from "./CircleButton";
import SubmitButton from "./SubmitButton";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { updatePost } from "../services/updatePostService";
import { useNavigate } from "react-router-dom";
import { useUpdateModalStore } from "../store/updateModalStore";

interface UpdateModalProps {
  postId: string;
  currentDescription: string;
}

const UpdateModal: React.FC<UpdateModalProps> = ({
  postId,
  currentDescription
}) => {
  const { isOpenUpdate, closeUpdate } = useUpdateModalStore();

  const [description, setDescription] = useState(currentDescription);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isOpenUpdate) {
      setDescription(currentDescription);
      setError("");
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpenUpdate, currentDescription]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setDescription(value);
    setError(value.trim() === "" ? "Description cannot be empty." : "");
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await updatePost(postId, description.trim());
      closeUpdate();
      navigate(0);
    } 
    catch (err: any) {
      setError(err);
    } 
    finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 overflow-hidden transition-opacity duration-300 ${isOpenUpdate ? 'opacity-100 visible bg-primary/60 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      <div className={`bg-white p-6 rounded-xl w-full max-w-md relative transition-transform transform duration-300 origin-center ${isOpenUpdate ? 'scale-100' : 'scale-0'}`}>
        <CircleButton onClick={closeUpdate} style={{ position: "absolute", top: "20px", right: "20px", fontSize: "20px", scale: "0.8" }} disabled={isLoading}>
          <RxCross2></RxCross2>
        </CircleButton>
        <h2 className="text-2xl text-primary font-semibold mb-4">Update Post</h2>
        {error && <p className="text-error text-sm font-display mb-4">{error}</p>}
        <textarea
          placeholder="Description"
          maxLength={120}
          onChange={handleChange}
          value={description}
          className="w-full border-2 resize-none placeholder:text-secondary focus:outline-none focus:ring-1 focus:ring-primary text-secondary rounded-md p-2 h-24"
          disabled={isLoading}
        />
        <p className="text-secondary mb-4">{description.length}/120 characters</p>
        <div className="flex">
          <SubmitButton style={{ width: "20%" }} onClick={handleConfirm} disabled={isLoading || !description.trim()}>
            {isLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin text-2xl" />
            ) : (
              "Save"
            )}
          </SubmitButton>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
