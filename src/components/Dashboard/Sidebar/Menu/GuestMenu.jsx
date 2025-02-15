import { BsFingerprint } from "react-icons/bs";
import { GrUserAdmin } from "react-icons/gr";
import MenuItem from ".//MenuItem";
import useRole from "../../../../hooks/useRole";
import { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import HostRequestModal from "../../../Modal/HostRequestModal";

const GuestMenu = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const [role] = useRole();
  const axiosSecure = useAxiosSecure();

  const closeModal = () => {
    setIsModalOpen(false);
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
        toast.success("Success! Please wait for admin confirmation.");
      } else {
        toast.error("Please wait for admin approval.");
      }
      console.log(currentUser);
    } catch (err) {
      toast.error(err.message);
    } finally {
      closeModal();
    }
  };
  return (
    <>
      <MenuItem
        icon={BsFingerprint}
        label="My Bookings"
        address="my-bookings"
      ></MenuItem>

      {role === "guest" && (
        <div
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300   hover:text-gray-700 cursor-pointer"
        >
          <GrUserAdmin className="w-5 h-5"></GrUserAdmin>

          <button className="mx-4 font-medium">Become A Host</button>
        </div>
      )}
      <HostRequestModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        handleModal={handleModal}
      ></HostRequestModal>
    </>
  );
};

export default GuestMenu;
