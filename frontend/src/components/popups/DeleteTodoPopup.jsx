// eslint-disable-next-line react/prop-types
function DeleteTodoPopup({ show, onConfirm, onCancel }) {
  if (!show) return null;
  return (
    <div className="backdrop" onClick={onCancel}>
      <div
        className="confirm-popup delete-popup"
        onClick={(e) => e.stopPropagation()}
      >
        <p>Are you sure you want to delete this todo?</p>
        <div>
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteTodoPopup;
