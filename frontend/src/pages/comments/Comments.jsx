/* eslint-disable react/prop-types */
import axios from 'axios';
import { useState, useEffect } from 'react';
import Spinner from '../../components/ui/Spinner';
import SingleComment from './SingleComment';
import AddComment from '../todos/popups/AddComment';

function Comments({ id }) {
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

  return (
    <div className="container">
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <div>
            {comments.map((comment) => (
              <SingleComment comment={comment} key={comment._id} />
            ))}
          </div>
          <AddComment onAddComment={handleAddComment} id={id} />
        </div>
      )}
    </div>
  );
}

export default Comments;
