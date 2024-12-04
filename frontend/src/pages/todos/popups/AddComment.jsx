import { useState } from "react";
import axios from "axios";
function AddComment({ id, onAddComment }) {
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/comments", {
        todo: id,
        comment: comment,
      });
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
