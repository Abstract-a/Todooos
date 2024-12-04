/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import { useState } from "react";
import axios from "axios";
import DeleteComment from "../pages/todos/popups/DeleteComment";
import { formatTime } from "../utils/dateHelper";

function SingleComment({ comment, onDeleteComment, onUpdateComment }) {
  const [showConfirmDeletePopup, setShowConfirmDeletePopup] = useState(false);
  const [currentComment, setCurrentComment] = useState(comment.comment);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  //const [tempContent, setTempContent] = useState("");
  const id = comment._id;
  const handleDelete = async () => {
    try {
      //console.log(comment._id);
      const response = await axios.delete(
        `http://localhost:5000/api/comments/${id}`,
      );
      //console.log(response.data);
      onDeleteComment(response.data.id);
    } catch (error) {
      console.error(error);
    } finally {
      setShowConfirmDeletePopup(false);
    }
  };

  const handleCancel = () => {
    setShowConfirmDeletePopup(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:5000/api/comments/${id}`,
        {
          comment: currentComment,
        },
      );
      //console.log(response.data);
      onUpdateComment(response.data);
      setLoading(false);
      setIsEditing(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    // console.log(response.data);
  };

  const handleEditChange = (e) => {
    setCurrentComment(e.target.value);
  };
  return (
    <div className="w-full pb-2">
      {isEditing ? (
        <div className="mx-2 flex w-full rounded-sm bg-gray-400 py-3">
          <textarea
            className="mx-auto w-[90%] rounded-md border-2 border-gray-900 px-2 text-left text-[13px]"
            type="text"
            value={currentComment}
            onChange={handleEditChange}
          />
        </div>
      ) : (
        <div className="mx-4 rounded-lg bg-gray-400 p-3">
          <h3 className="break-words px-2 text-left text-[15px]">
            {comment.comment}
          </h3>
        </div>
      )}
      <div className="mx-4 flex items-center justify-start gap-1">
        <p className="text-xs text-gray-500">{formatTime(comment.createdAt)}</p>
        {"•"}
        {isEditing && (
          <button
            type="button"
            className="font-bold text-green-500 transition-all duration-300 ease-in-out hover:text-green-800 hover:underline"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? "saving..." : "save"}
          </button>
        )}
        {!isEditing && (
          <button
            onClick={handleEdit}
            className="text-gray-500 transition-all duration-300 ease-in-out hover:text-gray-800 hover:underline"
          >
            Edit
          </button>
        )}

        {"•"}
        <button
          className="text-gray-500 transition-all duration-300 ease-in-out hover:text-gray-800 hover:underline"
          onClick={() => setShowConfirmDeletePopup(true)}
        >
          Delete
        </button>
      </div>
      <DeleteComment
        onDeleteComment={onDeleteComment}
        show={showConfirmDeletePopup}
        onConfirm={handleDelete}
        onCancel={handleCancel}
        id={comment._id}
      />
    </div>
  );
}

export default SingleComment;
