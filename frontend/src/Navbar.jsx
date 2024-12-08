import { Link } from "react-router-dom";
import Signout from "./Signout";

const Navbar = () => {
  return (
    <div className="fixed left-0 top-0 z-[1000] flex h-12 w-screen items-center justify-between bg-gray-800 px-3 text-white sm:px-10">
      <Link to="/todos">
        <h1 className="text-2xl font-semibold tracking-widest transition-all duration-300 ease-in-out hover:opacity-80">
          Todoo
        </h1>
      </Link>
      <div className="flex gap-4">
        {!localStorage.getItem("jwt") ? (
          <>
            <Link to="/signin">
              <button className="font-semibold tracking-wider transition-all duration-300 ease-in-out hover:opacity-80">
                Sign In
              </button>
            </Link>
            <Link to="/signup">
              <button className="font-semibold tracking-wider transition-all duration-300 ease-in-out hover:opacity-80">
                Sign Up
              </button>
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
