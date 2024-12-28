import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const authUser = useSelector((store) => store.auth.authUser);
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="flex justify-between items-center px-20 py-5 mb-10">
      <Link to={"/"} className="logo font-bold text-2xl">
        Goal-app
      </Link>
      <div className="flex items-center gap-7">
        {authUser && (
          <button
            onClick={handleLogout}
            className="font-bold flex items-center gap-1"
          >
            <MdOutlineLogout size={20} />
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
