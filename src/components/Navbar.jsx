import React, { useEffect, useState } from "react";
import { FaAccusoft, FaAmilia } from "react-icons/fa";
import { Link, NavLink } from "react-router";
import useAuth from "../Hook/useAuth";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, signOutUser, setLoading } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  const handleLogOut = () => {
    signOutUser()
      .then(() => {
        toast.success("Logged out successfully 👋");
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };
  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "border-b-2 border-primary font-bold" : "font-semibold"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "border-b-2 border-primary font-bold" : "font-semibold"
          }
          to={"/arts"}
        >
          Explore Artworks
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-primary font-bold"
                  : "font-semibold"
              }
              to="/arts/myGallery"
            >
              My Gallery
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-primary font-bold"
                  : "font-semibold"
              }
              to="/arts/addArtWork"
            >
              Add Artwork
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-primary font-bold"
                  : "font-semibold"
              }
              to="/arts/favorites"
            >
              My Favorites
            </NavLink>
          </li>
        </>
      )}
    </>
  );
  return (
    <div className=" sticky top-0 z-50 bg-base-100 shadow-sm">
      <div className="navbar w-11/12 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <a className="btn btn-ghost text-primary font-bold text-xl">
            <FaAmilia size={24} />
            <span className="-ml-1.5 font-extrabold text-2xl">rtify</span>
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          {!user ? (
            <>
              <Link to="/auth" className="btn bg-primary text-white">
                Login
              </Link>
              <Link to="/auth/register" className="btn bg-primary text-white">
                Register
              </Link>
            </>
          ) : (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="avatar">
                <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={
                      user.photoURL ||
                      "https://i.ibb.co/5vFdhSM/default-avatar.png"
                    }
                    alt="User Avatar"
                    title={user.displayName}
                  />
                </div>
              </div>
              <ul className="dropdown-content mt-3  p-2 shadow bg-base-100 rounded-box w-44 text-center">
                <li className="font-semibold my-2">
                  {user.displayName || "User"}
                </li>
                <Link to={`/arts/art/artist/${user.email}`}>
                  <li className="font-semibold my-2">Profile</li>
                </Link>
                <li className="font-semibold my-2">
                  <input
                    onChange={(e) => handleTheme(e.target.checked)}
                    type="checkbox"
                    checked={theme === "dark"}
                    className="toggle"
                  />
                </li>
                <li>
                  <button
                    onClick={handleLogOut}
                    className="btn btn-sm bg-primary text-white w-full"
                  >
                    Log Out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
