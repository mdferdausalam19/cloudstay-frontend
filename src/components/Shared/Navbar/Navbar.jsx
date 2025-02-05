import Container from "../Container";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "/placeholder.jpg";
import toast from "react-hot-toast";
import HostRequestModal from "../../Modal/HostRequestModal";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Navbar = () => {
  const { user, signOutUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const closeModal = () => {
    setIsModalOpen(false);
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

  const handleModal = async () => {
    try {
      const currentUser = {
        email: user?.email,
        role: "guest",
        status: "Requested",
      };
      const { data } = await axiosSecure.put(`/users`, currentUser);
      if (data.modifiedCount > 0) {
        toast.success("Success! Please wait of admin confirmation.");
      } else {
        toast.error("Please wait for admin approval.");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      closeModal();
    }
  };

  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px] border-b-rose-400">
        <Container>
          <div className="flex flex-row  items-center justify-between gap-3 md:gap-0">
            {/* Logo */}
            <Link to="/">
              <button className="text-2xl font-semibold text-rose-500 cursor-pointer">
                CloudStay
              </button>
            </Link>
            {/* Dropdown Menu */}
            <div className="relative">
              <div className="flex flex-row items-center gap-3">
                {/* Become A Host btn */}
                <div className="hidden md:block">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    disabled={!user}
                    className="disabled:cursor-not-allowed cursor-pointer hover:bg-neutral-100 py-3 px-4 text-sm font-semibold rounded-full  transition"
                  >
                    Host your home
                  </button>
                </div>
                <HostRequestModal
                  isModalOpen={isModalOpen}
                  closeModal={closeModal}
                  handleModal={handleModal}
                ></HostRequestModal>
                {/* Dropdown btn */}
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                >
                  <AiOutlineMenu />
                  <div className="hidden md:block">
                    {/* Avatar */}
                    <img
                      className="rounded-full"
                      referrerPolicy="no-referrer"
                      src={user && user?.photoURL ? user?.photoURL : avatarImg}
                      alt="profile"
                      height="30"
                      width="30"
                    />
                  </div>
                </div>
              </div>
              {isOpen && (
                <div className="absolute rounded-xl shadow-md   bg-white overflow-hidden right-0 top-12 text-sm">
                  <div className="flex flex-col cursor-pointer">
                    <Link
                      to="/"
                      className="block md:hidden px-3 py-3 hover:bg-neutral-100 transition font-semibold"
                    >
                      Home
                    </Link>

                    {user ? (
                      <>
                        <Link
                          to={"/dashboard"}
                          className="px-3 py-3 hover:bg-neutral-100  font-semibold cursor-pointer"
                        >
                          Dashboard
                        </Link>
                        <div
                          onClick={handleSignOut}
                          className="px-3 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer"
                        >
                          Sign Out
                        </div>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/sign-in"
                          className="px-3 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          Sign In
                        </Link>
                        <Link
                          to="/sign-up"
                          className="px-3 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
