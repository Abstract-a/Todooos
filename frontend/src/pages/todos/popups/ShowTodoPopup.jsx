/* eslint-disable react/prop-types */
import { useState } from "react";
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
  const [expanded, setExpanded] = useState(false);

  if (!show) return null;

  return (
    <div className="relative flex">
      <div className="fixed inset-0 left-1/2 top-1/2 z-[1000] flex w-[90%] max-w-[500px] -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center gap-3 rounded-lg bg-gray-200 p-5 shadow-md">
        <button
          onClick={onCancel}
          className="absolute left-0 top-0 mr-3 cursor-pointer overflow-hidden rounded-lg border-none bg-red-500 px-6 py-3 text-white transition-all duration-500 ease-in-out hover:bg-red-600 hover:opacity-90"
        >
          <ClearIcon />
        </button>

        <h3 className="my-4 text-xl font-bold">{initialTitle}</h3>
        {/* <textarea value={initialText} disabled /> */}
        <div
          className={`mx-auto h-[400px] w-full ${expanded ? "overflow-y-scroll" : ""} overflow-y-hidden whitespace-normal break-words`}
        >
          <p
            className={`px-3 text-left ${expanded ? "" : "line-clamp-4"} text-gray-700`}
          >
            {initialText}
          </p>
          <span
            onClick={() => setExpanded(!expanded)}
            className="mt-2 inline-block cursor-pointer text-blue-500"
          >
            {expanded ? "Show Less" : "Show More"}
          </span>
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-xs text-gray-500">date of creation </p>
            <p className="text-xs text-gray-500">{formatTime(createdAt)}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs text-gray-500">latest update </p>
            <p className="text-xs text-gray-500">{formatTime(updatedAt)}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs text-gray-500">complete at </p>
            <p className="text-xs text-gray-500">{formatTime(completedAt)}</p>
          </div>
        </div>
      </div>
      <CommentsPage id={id} />
    </div>
  );
}

export default ShowTodoPopup;
