/* eslint-disable react/prop-types */

function DeleteComment({ show, onConfirm, onCancel }) {
  if (!show) return null;
  return (
    <div className="backdrop" onClick={onCancel}>
      <div className="" onClick={(e) => e.stopPropagation()}>
        <p>Are you sure you want to delete this comment?</p>
        <div>
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteComment;
