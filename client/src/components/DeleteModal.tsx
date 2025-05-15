import { useState, useEffect } from "react";
import CircleButton from "./CircleButton";
import SubmitButton from "./SubmitButton";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { deletePost } from "../services/deletePostService";
import { useNavigate } from "react-router-dom";
import { useDeleteModalStore } from "../store/deleteModalStore";

interface DeleteModalProps {
  postId: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ postId }) => {
  const { isOpenDelete, closeDelete } = useDeleteModalStore();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (isOpenDelete) {
      setError("");
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpenDelete]);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await deletePost(postId);
      closeDelete();
      navigate(0);
    } 
    catch (err: any) {
      setError("An error occurred while deleting the post.");
    } 
    finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 overflow-hidden transition-opacity duration-300 ${
        isOpenDelete
          ? "opacity-100 visible bg-primary/60 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`bg-white p-6 rounded-xl w-full max-w-md relative transition-transform transform duration-300 origin-center ${
          isOpenDelete ? "scale-100" : "scale-0"
        }`}
      >
        <CircleButton
          onClick={closeDelete}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            fontSize: "20px",
            scale: "0.8",
          }}
          disabled={isLoading}
        >
          <RxCross2></RxCross2>
        </CircleButton>
        <h2 className="text-2xl text-primary font-semibold mb-4">
          Delete Post
        </h2>
        {error && (
          <p className="text-error text-sm font-display mb-4">{error}</p>
        )}
        <p className="text-primary font-display mb-4"> Are you sure you want to delete this post? </p>
          <SubmitButton
            onClick={handleConfirm}
            disabled={isLoading}
            style={{
              width: "20%",
            }}
          >
            {isLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin text-2xl" />
            ) : (
              "Confirm"
            )}
          </SubmitButton>
      </div>
    </div>
  );
};

export default DeleteModal;
