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
        // console.log(response.data);
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
  return (
    // <div className="h-[560px] w-[500px] bg-gray-200">
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <div>
            {comments.map((comment) => (
              <SingleComment
                comment={comment}
                key={comment._id}
                onDeleteComment={handleDeleteComment}
                onUpdateComment={handleUpdateComment}
              />
            ))}
          </div>
          <AddComment onAddComment={handleAddComment} id={id} />
        </div>
      )}
    </div>
  );
}

export default CommentsPage;
