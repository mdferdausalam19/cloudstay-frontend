import { useState } from "react";
import AddRoomForm from "../../../components/Form/AddRoomForm";
import useAuth from "../../../hooks/useAuth";
import { imageUpload } from "../../../api/utils";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

const AddRoom = () => {
  const [imagePreview, setImagePreview] = useState([]);
  const [imageText, setImageText] = useState("Upload Image");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const handleDates = (item) => {
    setDates(item?.selection);
  };

  const { mutateAsync } = useMutation({
    mutationFn: async ({ roomData }) => {
      const { data } = await axiosSecure.post(`/rooms`, roomData);
      return data;
    },
    onSuccess: (data) => {
      if (data.insertedId) {
        toast.success("Room added Successfully");
        navigate("/dashboard/my-listings");
        setLoading(false);
      }
    },
    onError: () => {
      toast.error("Unable to add the room. Please try again.");
      setLoading(false);
    },
  });

  const handleAddRoom = async (data) => {
    setLoading(true);
    const {
      bathrooms,
      bedrooms,
      category,
      description,
      image,
      location,
      price,
      title,
      total_guest,
    } = data;
    const to = dates?.endDate;
    const from = dates?.startDate;
    const host = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    };

    try {
      const image_url = await imageUpload(image[0]);
      const roomData = {
        bathrooms,
        bedrooms,
        category,
        description,
        image: image_url,
        location,
        price,
        title,
        guests: total_guest,
        to,
        from,
        host,
      };
      await mutateAsync({ roomData });
    } catch (err) {
      toast.error(err?.message);
      setLoading(false);
    }
  };
  const handleImage = (file) => {
    setImagePreview(URL.createObjectURL(file[0]));
    setImageText(file[0]?.name);
  };
  return (
    <>
      <Helmet>
        <title>Add Room | Dashboard</title>
      </Helmet>
      <AddRoomForm
        dates={dates}
        handleDates={handleDates}
        handleAddRoom={handleAddRoom}
        setImagePreview={setImagePreview}
        imagePreview={imagePreview}
        handleImage={handleImage}
        imageText={imageText}
        loading={loading}
      ></AddRoomForm>
    </>
  );
};

export default AddRoom;
