/* eslint-disable react/prop-types */
import { formatTime } from "../../../utils/dateHelper.js";
import ClearIcon from "@mui/icons-material/Clear";
import CommentsPage from "../../comments/CommentsPage.jsx";
function ShowTodoPopup({
  createdAt,
  updatedAt,
  completedAt,
  initialTitle,
  initialText,
  onCancel,
  show,
  id,
}) {
  if (!show) return null;

  return (
    <div className="backdrop">
      <div className="fixed left-[50%] top-[50%] z-[1000] flex w-[90%] max-w-[500px] -translate-x-1/2 -translate-y-1/2 transform flex-col gap-3 rounded-lg bg-gray-200 p-5 shadow-md">
        <button onClick={onCancel}>
          <ClearIcon />
        </button>
        {/* <input type="text" value={initialTitle} disabled /> */}
        <h3>{initialTitle}</h3>
        <textarea value={initialText} disabled />
        {/* <p>{initialText}</p> */}
        <div>
          <div className="date-left">
            <p>date of creation </p>
            <p>{formatTime(createdAt)}</p>
          </div>
          <div className="date-right">
            <p>latest update </p>
            <p>{formatTime(updatedAt)}</p>
          </div>
          <div className="date-right">
            <p>complete at </p>
            <p>{formatTime(completedAt)}</p>
          </div>
        </div>
      </div>
      <CommentsPage id={id} />
    </div>
  );
}

export default ShowTodoPopup;
