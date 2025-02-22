import { useState } from "react";
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { AiOutlineBars } from "react-icons/ai";
import { BsGraphUp } from "react-icons/bs";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import MenuItem from "./Menu/MenuItem";
import toast from "react-hot-toast";
import HostMenu from "./Menu/HostMenu";
import GuestMenu from "./Menu/GuestMenu";
import AdminMenu from "./Menu/AdminMenu";
import ToggleBtn from "../../Shared/Button/ToggleBtn";

const Sidebar = () => {
  const { signOutUser } = useAuth();
  const [isActive, setActive] = useState(false);
  const [toggle, setToggle] = useState(true);
  const [role] = useRole();
  const navigate = useNavigate();

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };

  const toggleHandler = () => {
    setToggle(!toggle);
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
      navigate("/sign-in");
      toast.success("Sign out successful.");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to="/">
              <p className="text-2xl font-semibold text-rose-500 cursor-pointer bg-rose-100 p-2 rounded-lg shadow-lg">
                CloudStay
              </p>
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5"></AiOutlineBars>
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className="w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-rose-100 mx-auto">
              <Link to="/">
                <p className="text-2xl font-semibold text-rose-500">
                  CloudStay
                </p>
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            {role === "host" && (
              <ToggleBtn
                toggleHandler={toggleHandler}
                toggle={toggle}
              ></ToggleBtn>
            )}

            {/*  Menu Items */}
            <nav>
              {/* Statistics */}
              <MenuItem
                address={"/dashboard"}
                label={"Statistics"}
                icon={BsGraphUp}
              ></MenuItem>

              {role === "guest" && <GuestMenu></GuestMenu>}
              {role === "host" ? (
                toggle ? (
                  <HostMenu></HostMenu>
                ) : (
                  <GuestMenu></GuestMenu>
                )
              ) : undefined}
              {role === "admin" && <AdminMenu></AdminMenu>}
            </nav>
          </div>
        </div>

        <div>
          <hr />
          {/* Profile Menu */}
          <MenuItem
            address={"/dashboard/profile"}
            label={"Profile"}
            icon={FcSettings}
          ></MenuItem>

          <button
            onClick={handleSignOut}
            className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform cursor-pointer"
          >
            <GrLogout className="w-5 h-5"></GrLogout>

            <span className="mx-4 font-medium">Sign Out</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
