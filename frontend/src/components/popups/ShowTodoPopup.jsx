/* eslint-disable react/prop-types */
import { formatTime } from '../../utils/dateHelper';
import ClearIcon from '@mui/icons-material/Clear';

function ShowTodoPopup({
  createdAt,
  updatedAt,
  initialTitle,
  initialText,
  onCancel,
  show,
}) {
  if (!show) return null;
  return (
    <div className="backdrop" onClick={onCancel}>
      <div className="confirm-popup show-popup">
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
        </div>
      </div>
    </div>
  );
}

export default ShowTodoPopup;
