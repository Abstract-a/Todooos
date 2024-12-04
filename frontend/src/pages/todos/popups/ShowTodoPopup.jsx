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
    <div
      onClick={onCancel}
      className="absolute inset-0 flex h-screen w-screen flex-col items-center justify-center bg-green-500 md:flex-row md:gap-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-[1000] flex w-screen min-w-[384px] max-w-[500px] flex-col items-center justify-center gap-3 rounded-lg bg-gray-200 p-5 shadow-md md:max-h-[560px] md:w-[90%]"
      >
        <button
          onClick={onCancel}
          className="absolute left-0 top-0 mr-3 cursor-pointer overflow-hidden rounded-lg border-none p-3 text-red-500 transition-all duration-500 ease-in-out hover:bg-gray-300 hover:text-red-700"
        >
          <ClearIcon className="text-[50px]" />
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
