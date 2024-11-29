/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import { useState } from 'react';
import axios from 'axios';
import DeleteComment from '../pages/todos/popups/DeleteComment';

function SingleComment({ comment, onDeleteComment }) {
  const [showConfirmDeletePopup, setShowConfirmDeletePopup] = useState(false);

  const handleDelete = async () => {
    const id = comment._id;
    try {
      //console.log(comment._id);
      const response = await axios.delete(
        `http://localhost:5000/api/comments/${id}`
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

  return (
    <div>
      <h3>{comment.comment}</h3>
      <button onClick={() => setShowConfirmDeletePopup(true)}>Delete</button>
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
