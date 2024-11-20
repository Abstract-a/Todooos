// eslint-disable-next-line react/prop-types
function DeleteTodoPopup({ show, onConfirm, onCancel }) {
  if (!show) return null;
  return (
    <div className="confirm-popup">
      <p>Are you sure you want to delete this todo?</p>
      <button onClick={onConfirm}>Yes</button>
      <button onClick={onCancel}>No</button>
    </div>
  );
}

export default DeleteTodoPopup;
