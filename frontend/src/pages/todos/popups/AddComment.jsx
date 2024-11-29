import { useState } from 'react';
import axios from 'axios';
function AddComment({ id, onAddComment }) {
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/comments', {
        todo: id,
        comment: comment,
      });
      onAddComment(response.data);
      setLoading(false);
      setComment('');
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Write a comment..."
          id="comment"
          name="comment"
          value={comment}
          required
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
}

export default AddComment;
