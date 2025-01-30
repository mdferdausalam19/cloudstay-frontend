import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import Swal from "sweetalert2";

const SignIn = () => {
  const { signInUser, googleSignIn, resetPassword, loading, setLoading } =
    useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const handleSignIn = async (data) => {
    const { email, password } = data;
    try {
      await signInUser(email, password);
      navigate("/");
      toast.success("Sign in successful!");
      reset();
    } catch (err) {
      setLoading(false);
      if (err.code == "auth/invalid-credential") {
        return toast.error(
          "Invalid credentials. Please check your email and password."
        );
      } else {
        toast.error(err.message);
      }
    }
  };
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      navigate("/");
      toast.success("Sign in successful!");
    } catch (err) {
      toast.error(err.message);
    }
  };
  const handleResetPassword = async () => {
    const { value: email } = await Swal.fire({
      title: "Input email address",
      input: "email",
      inputLabel: "Your email address",
      inputPlaceholder: "Enter your email address",
      confirmButtonText: "Submit",
      confirmButtonColor: "#F43F5E",
    });
    if (email) {
      try {
        await resetPassword(email);
        toast.success("Please check your email!");
        setLoading(false);
      } catch (err) {
        toast.error(err.message);
        setLoading(false);
      }
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign In</h1>
          <p className="text-sm text-gray-400">
            Sign in to access your account
          </p>
        </div>
        <form
          onSubmit={handleSubmit(handleSignIn)}
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
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
                "Sign In"
              )}
            </button>
          </div>
        </form>
        <div className="space-y-1">
          <button
            onClick={handleResetPassword}
            className="text-xs hover:underline hover:text-rose-500 text-gray-400"
          >
            Forgot password?
          </button>
        </div>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          <p className="px-3 text-sm dark:text-gray-400">
            Or sign in with social accounts
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
          Don&apos;t have an account yet?{" "}
          <Link
            to="/sign-up"
            className="hover:underline hover:text-rose-500 text-gray-600"
          >
            Sign Up
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default SignIn;
