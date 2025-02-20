import PropTypes from "prop-types";
import { categories } from "../Categories/CategoriesData";
import { DateRange } from "react-date-range";
const UpdateRoomForm = ({
  handleUpdateRoom,
  dates,
  handleDates,
  roomData,
  loading,
  handleImage,
  setRoomData,
  imageText,
}) => {
  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={handleUpdateRoom}>
        <div className="grid grid-cols-1 gap-10">
          <div className="space-y-1 text-sm">
            <label htmlFor="location" className="block text-gray-600">
              Location
            </label>
            <input
              className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
              name="location"
              id="location"
              type="text"
              placeholder="Location"
              required
              value={roomData?.location}
              onChange={(e) =>
                setRoomData({ ...roomData, location: e.target.value })
              }
            />
          </div>
          <div className="space-y-1 text-sm">
            <label htmlFor="title" className="block text-gray-600">
              Title
            </label>
            <input
              className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
              name="title"
              id="title"
              type="text"
              placeholder="Title"
              required
              value={roomData?.title}
              onChange={(e) =>
                setRoomData({ ...roomData, title: e.target.value })
              }
            />
          </div>

          <div className="space-y-1 text-sm">
            <label htmlFor="category" className="block text-gray-600">
              Category
            </label>
            <select
              required
              className="w-full px-4 py-3 border border-rose-300 focus:outline-rose-500 rounded-md"
              name="category"
              value={roomData?.category}
              onChange={(e) =>
                setRoomData({ ...roomData, category: e.target.value })
              }
            >
              {categories.map((category) => (
                <option value={category.label} key={category.label}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label htmlFor="location" className="block text-gray-600">
              Select Availability Range
            </label>
            <div className="flex justify-center pt-2">
              <DateRange
                showDateDisplay={false}
                rangeColors={["#F43F5E"]}
                editableDateInputs={true}
                onChange={(item) => handleDates(item)}
                moveRangeOnFirstSelection={false}
                ranges={[dates]}
              />
            </div>
          </div>
          <div className="rounded-lg border border-rose-300">
            <input
              onChange={(e) => {
                handleImage(e.target.files);
              }}
              name="image"
              type="file"
              id="image"
              accept="image/*"
              className="px-3 py-2 rounded-md text-sm file:mr-4 file:py-1 file:px-2 file:rounded-md file:font-semibold file:bg-gray-50 file:text-gray-700 cursor-pointer"
            />
          </div>
          <div className="flex justify-between gap-2">
            <div className="space-y-1 text-sm">
              <label htmlFor="price" className="block text-gray-600">
                Price
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                name="price"
                id="price"
                type="number"
                placeholder="Price"
                required
                value={roomData?.price}
                onChange={(e) =>
                  setRoomData({ ...roomData, price: e.target.value })
                }
              />
            </div>

            <div className="space-y-1 text-sm">
              <label htmlFor="guest" className="block text-gray-600">
                Total guest
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                name="guests"
                id="guests"
                type="number"
                placeholder="Total guest"
                required
                value={roomData?.guests}
                onChange={(e) =>
                  setRoomData({ ...roomData, guests: e.target.value })
                }
              />
            </div>
          </div>

          <div className="flex justify-between gap-2">
            <div className="space-y-1 text-sm">
              <label htmlFor="bedrooms" className="block text-gray-600">
                Bedrooms
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                name="bedrooms"
                id="bedrooms"
                type="number"
                placeholder="Bedrooms"
                required
                value={roomData?.bedrooms}
                onChange={(e) =>
                  setRoomData({ ...roomData, bedrooms: e.target.value })
                }
              />
            </div>

            <div className="space-y-1 text-sm">
              <label htmlFor="bathrooms" className="block text-gray-600">
                Bathrooms
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                name="bathrooms"
                id="bathrooms"
                type="number"
                placeholder="Bathrooms"
                required
                value={roomData?.bathrooms}
                onChange={(e) =>
                  setRoomData({ ...roomData, bathrooms: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-1 text-sm">
            <label htmlFor="description" className="block text-gray-600">
              Description
            </label>

            <textarea
              id="description"
              className="block rounded-md focus:rose-300 w-full h-32 px-4 py-3 text-gray-800  border border-rose-300 focus:outline-rose-500 "
              name="description"
              value={roomData?.description}
              onChange={(e) =>
                setRoomData({ ...roomData, description: e.target.value })
              }
            ></textarea>
          </div>
        </div>

        <button
          type="submit"
          className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-rose-500 cursor-pointer"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateRoomForm;

UpdateRoomForm.propTypes = {
  roomData: PropTypes.object,
};
