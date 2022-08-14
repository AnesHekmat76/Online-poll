import Logo2 from "../../assets/Logo2.svg";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [navIsOpen, setNavIsOpen] = useState(false);
  const onLinksClick = () => {
    setNavIsOpen(false);
  };
  return (
    <>
      <nav className="border-b border-gray-300 py-3 px-4 sm:py-4 sm:px-6 max-w-6xl mx-auto flex justify-between sticky top-0 bg-white z-10">
        <Link to="/">
          <div>
            <img className="h-8" alt="logo" src={Logo2} />
          </div>
        </Link>
        <div className="mr-4 hidden md:block">
          <Link
            to="/"
            className="ml-14 text-gray-600 hover:text-black"
            href="123"
          >
            Home
          </Link>
          <Link
            to="/pollList"
            className="ml-14 text-gray-600 hover:text-black"
            href="123"
          >
            Poll list
          </Link>
          <Link
            to="/createPoll"
            className="ml-14 text-gray-600 hover:text-black"
            href="123"
          >
            Create
          </Link>
          <Link
            to="/signIn"
            className="ml-14 text-gray-600 hover:text-black hover:border-gray-600 transition-all border border-gray-300 px-4 py-2 rounded-lg"
            href="123"
          >
            Sign In
          </Link>
        </div>
        <div className="md:hidden">
          {!navIsOpen && (
            <button
              onClick={() => {
                setNavIsOpen(true);
              }}
            >
              <MenuIcon className="text-gray-600" />
            </button>
          )}
          {navIsOpen && (
            <button
              onClick={() => {
                setNavIsOpen(false);
              }}
            >
              <CloseIcon className="text-gray-600" />
            </button>
          )}
        </div>
      </nav>
      {navIsOpen && (
        <div className="w-full h-screen sticky z-20 bg-white top-16 left-0 md:hidden pt-16">
          <div className="flex flex-col items-center h-full z-20">
            <Link
              onClick={onLinksClick}
              to="/"
              className="m-7 text-gray-500 sm:text-lg"
            >
              Home
            </Link>
            <Link
              onClick={onLinksClick}
              to="/pollList"
              className="m-7 text-gray-500 sm:text-lg"
            >
              Poll list
            </Link>
            <Link
              onClick={onLinksClick}
              to="/createPoll"
              className="m-7 text-gray-500 sm:text-lg"
            >
              Create
            </Link>
            <Link
              onClick={onLinksClick}
              to="/"
              className="m-7 text-gray-500 sm:text-lg"
            >
              Sign out
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
export default Navigation;
