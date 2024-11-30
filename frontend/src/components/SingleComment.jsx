/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import { useState } from 'react';
import axios from 'axios';
import DeleteComment from '../pages/todos/popups/DeleteComment';
import { formatTime } from '../utils/dateHelper';

function SingleComment({ comment, onDeleteComment, onUpdateComment }) {
  const [showConfirmDeletePopup, setShowConfirmDeletePopup] = useState(false);
  const [currentComment, setCurrentComment] = useState(comment.comment);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [tempContent, setTempContent] = useState('');
  const id = comment._id;
  const handleDelete = async () => {
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
        }
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
    <div>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={currentComment}
            onChange={handleEditChange}
          />
          {isEditing && (
            <button type="submit" disabled={loading}>
              {loading ? 'saving...' : 'save'}
            </button>
          )}
        </form>
      ) : (
        <h3>{comment.comment}</h3>
      )}
      <p>{formatTime(comment.createdAt)}</p>
      {!isEditing && <button onClick={handleEdit}>Edit</button>}

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
