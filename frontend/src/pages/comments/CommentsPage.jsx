/* eslint-disable react/prop-types */
import axios from "axios";
import { useState, useEffect } from "react";
import Spinner from "../../components/ui/Spinner";
import SingleComment from "../../components/SingleComment";
import AddComment from "../todos/popups/AddComment";

function CommentsPage({ id }) {
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/comments/${id}`)
      .then((response) => {
        setComments(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  const handleAddComment = (newComment) => {
    setComments((prev) => [...prev, newComment]);
  };

  const handleUpdateComment = (updatedComment) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment._id === updatedComment._id ? updatedComment : comment,
      ),
    );
  };

  const handleDeleteComment = (id) => {
    setComments((prev) => prev.filter((comment) => comment._id != id));
  };

  const sortedComments = (comments) => {
    return comments.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );
  };
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="z-[1000] h-[40%] w-screen bg-gray-200 md:h-[560px] md:min-w-[384px] md:max-w-[500px] md:rounded-md"
    >
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex h-full w-full flex-col items-start justify-center">
          <AddComment onAddComment={handleAddComment} id={id} />
          <div className="mt-4 flex h-full w-full flex-col items-start justify-start overflow-auto overflow-x-hidden">
            {sortedComments(comments).map((comment) => (
              <SingleComment
                comment={comment}
                key={comment._id}
                onDeleteComment={handleDeleteComment}
                onUpdateComment={handleUpdateComment}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CommentsPage;
