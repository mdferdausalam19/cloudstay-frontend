import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { categories } from "../Categories/CategoriesData";
import { useForm } from "react-hook-form";
import { TbFidgetSpinner } from "react-icons/tb";
const AddRoomForm = ({ dates, handleDates, handleAddRoom, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={handleSubmit(handleAddRoom)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
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
                {...register("location", { required: true })}
              />
              {errors.location && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>

            <div className="space-y-1 text-sm">
              <label htmlFor="category" className="block text-gray-600">
                Category
              </label>
              <select
                className="w-full px-4 py-3 border border-rose-300 focus:outline-rose-500 rounded-md"
                name="category"
                {...register("category", { required: true })}
              >
                {categories.map((category) => (
                  <option value={category.label} key={category.label}>
                    {category.label}
                  </option>
                ))}
              </select>
              {errors.category && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>

            <div className="space-y-1">
              <label htmlFor="location" className="block text-gray-600">
                Select Availability Range
              </label>
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
          <div className="space-y-6">
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
                {...register("title", { required: true })}
              />
              {errors.title && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
            <div className="rounded-lg border border-rose-300">
              <input
                name="image"
                type="file"
                id="image"
                accept="image/*"
                {...register("image", { required: true })}
                className="px-3 py-2 rounded-md text-sm file:mr-4 file:py-1 file:px-2 file:rounded-md file:font-semibold file:bg-gray-50 file:text-gray-700 cursor-pointer"
              />
              {errors.image && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
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
                  {...register("price", { required: true })}
                />
                {errors.price && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>

              <div className="space-y-1 text-sm">
                <label htmlFor="guest" className="block text-gray-600">
                  Total guest
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                  name="total_guest"
                  id="guest"
                  type="number"
                  placeholder="Total guest"
                  {...register("total_guest", { required: true })}
                />
                {errors.total_guest && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
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
                  {...register("bedrooms", { required: true })}
                />
                {errors.bedrooms && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
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
                  {...register("bathrooms", { required: true })}
                />
                {errors.bathrooms && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
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
                {...register("description", { required: true })}
              ></textarea>
              {errors.description && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
          </div>
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-rose-500 cursor-pointer"
        >
          {loading ? (
            <TbFidgetSpinner className="m-auto animate-spin" />
          ) : (
            "Sava & Continue"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddRoomForm;
