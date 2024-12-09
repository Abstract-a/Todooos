import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../constants";

function AddComment({ id, onAddComment }) {
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const token = localStorage.getItem("jwt");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/comments`,
        {
          todo: id,
          comment: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      onAddComment(response.data);
      setLoading(false);
      setComment("");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className="flex w-full gap-4">
      <form onSubmit={handleSubmit} className="flex w-full">
        <input
          className="m-3 w-[80%] rounded-md p-3"
          type="text"
          placeholder="Write a comment..."
          id="comment"
          name="comment"
          value={comment}
          required
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          className="m-3 cursor-pointer rounded-lg border-none bg-green-500 px-6 text-white transition-all duration-500 ease-in-out hover:bg-green-600 hover:opacity-90"
          type="submit"
          disabled={loading}
        >
          {loading ? "Saving" : "Save"}
        </button>
      </form>
    </div>
  );
}

export default AddComment;
