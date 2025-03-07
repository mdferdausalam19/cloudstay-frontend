import axios from "axios";

export const imageUpload = async (image) => {
  const formData = new FormData();
  formData.append("image", image);

  const { data } = await axios.post(
    `${import.meta.env.VITE_API_URL}/upload-image`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );

  return data?.display_url;
};
