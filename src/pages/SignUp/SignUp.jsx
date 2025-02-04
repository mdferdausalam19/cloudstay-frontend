import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { TbFidgetSpinner } from "react-icons/tb";
import { FcGoogle } from "react-icons/fc";
import { imageUpload } from "../../api/utils";

const SignUp = () => {
  const { createUser, updateUserProfile, googleSignIn, loading, setLoading } =
    useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleSignUp = async (data) => {
    const { email, name, image, password } = data;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const lengthRegex = /^.{6,}$/;

    if (!lengthRegex.test(password)) {
      return toast.error("Password must be at least 6 characters long.");
    }
    if (!uppercaseRegex.test(password)) {
      return toast.error(
        "Password must include at least one uppercase letter."
      );
    }
    if (!lowercaseRegex.test(password)) {
      return toast.error(
        "Password must include at least one lowercase letter."
      );
    }
    try {
      setLoading(true);

      //upload image and get image url
      const image_url = imageUpload(image);

      await createUser(email, password);
      await updateUserProfile(name, image_url);

      navigate("/");
      toast.success("Sign up successful!");
      reset();
    } catch (err) {
      setLoading(false);
      toast.error(err.message);
    }
  };
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      navigate("/");
      toast.success("Sign up successful!");
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
          <p className="text-sm text-gray-400">Welcome to CloudStay</p>
        </div>
        <form onSubmit={handleSubmit(handleSignUp)} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your full name"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
            <div>
              <label htmlFor="image" className="block mb-2 text-sm">
                Profile Picture
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                {...register("image", { required: true })}
                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-200 text-gray-500 text-sm file:mr-4 file:py-1 file:px-2 file:rounded-md file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
              />
              {errors.image && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email address"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
            <div>
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm mb-2">
                  Password
                </label>
              </div>
              <input
                type="password"
                autoComplete="new-password"
                id="password"
                placeholder="Enter your password"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Password must be at least 6 characters long and include at least
                one uppercase and one lowercase letter.
              </p>
            </div>
          </div>

          <div>
            <button
              disabled={loading}
              type="submit"
              className="bg-rose-500 w-full rounded-md py-3 text-white cursor-pointer disabled:cursor-not-allowed"
            >
              {loading ? (
                <TbFidgetSpinner className="m-auto animate-spin" />
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          <p className="px-3 text-sm dark:text-gray-400">
            Or sign up with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        </div>
        <button
          disabled={loading}
          onClick={handleGoogleSignIn}
          className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer disabled:cursor-not-allowed"
        >
          <FcGoogle size={32} />
          <span>Continue with Google</span>
        </button>
        <p className="px-6 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link
            to="/sign-in"
            className="hover:underline hover:text-rose-500 text-gray-600"
          >
            Sign In
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default SignUp;
