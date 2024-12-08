import { Link } from "react-router-dom";
import Signout from "./Signout";

const Navbar = () => {
  return (
    <div className="fixed left-0 top-0 flex h-12 w-screen items-center justify-between bg-gray-800 px-5 text-white">
      <Link to="/todos">
        <h1 className="text-2xl text-white">Todoo</h1>
      </Link>
      <div className="flex gap-2">
        {!localStorage.getItem("jwt") ? (
          <>
            <Link to="/signin">
              <button>signin</button>
            </Link>
            <Link to="/signup">
              <button>signup</button>
            </Link>
          </>
        ) : (
          <Link to="/signin">
            <Signout />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
