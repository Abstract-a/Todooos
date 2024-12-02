/* eslint-disable react/prop-types */

function DeleteComment({ show, onConfirm, onCancel }) {
  if (!show) return null;
  return (
    <div className="backdrop z-[1000]" onClick={onCancel}>
      <div
        className="fixed left-[50%] top-[50%] z-[1000] flex w-[90%] max-w-96 -translate-x-1/2 -translate-y-1/2 transform flex-col gap-3 rounded-lg bg-gray-200 p-5 shadow-md"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="py-2">Are you sure you want to delete this comment?</p>
        <div className="flex items-center justify-center gap-4">
          <button
            className="cursor-pointer rounded-lg border-none bg-red-500 px-6 py-3 text-white transition-all duration-500 ease-in-out hover:bg-red-600 hover:opacity-90"
            onClick={onConfirm}
          >
            Yes
          </button>

          <button
            className="cursor-pointer rounded-lg border-none bg-green-500 px-6 py-3 text-white transition-all duration-500 ease-in-out hover:bg-green-600 hover:opacity-90"
            onClick={onCancel}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteComment;
