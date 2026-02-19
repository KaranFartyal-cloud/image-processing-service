import { useDarkMode } from "@/hooks/useDarkMode";
import { useLoading } from "@/hooks/useLoading";
import { useForm, type SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useBackendUrl } from "@/hooks/useBackendUrl";
import { toast } from "sonner";

type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

const Register = () => {
  const { isDarkEnabled } = useDarkMode();
  const { url } = useBackendUrl();
  const { loading, startLoading, stopLoading } = useLoading();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>();

  const registerHandler: SubmitHandler<RegisterInput> = async (data) => {
    try {
      startLoading();

      await axios.post(
        `${url}/api/user/register`,
        {
          name: data.name,
          email: data.email,
          password: data.password,
        },
        { withCredentials: true },
      );

      console.log("Registered successfully");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    } finally {
      stopLoading();
    }
  };

  return (
    <div
      className={`bg-sky-100 dark:bg-black flex justify-center items-center h-screen ${
        isDarkEnabled && "dark"
      }`}
    >
      {/* Left: Image */}
      <div className="w-1/2 h-screen hidden lg:block">
        <img
          src="https://img.freepik.com/fotos-premium/imagen-fondo_910766-187.jpg?w=826"
          alt="Placeholder Image"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right: Register Form */}
      <div className="lg:p-36 md:p-52 sm:p-20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl dark:text-white font-semibold mb-4">Sign Up</h1>

        <form onSubmit={handleSubmit(registerHandler)}>
          {/* Name */}
          <div className="mb-4">
            <label className="block dark:text-white text-gray-600">Name</label>
            <input
              type="text"
              className="w-full border rounded-md py-2 px-3 dark:text-white"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block dark:text-white text-gray-600">Email</label>
            <input
              type="email"
              className="w-full border rounded-md py-2 px-3 dark:text-white"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block dark:text-white text-gray-600">
              Password
            </label>
            <input
              type="password"
              className="w-full border rounded-md py-2 px-3 dark:text-white"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-md py-2 px-4 text-white font-semibold ${
              loading
                ? "opacity-60 cursor-not-allowed"
                : "bg-red-500 hover:bg-blue-600 dark:bg-gray-800"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="mt-6 text-center text-green-500 dark:text-blue-500">
          <a href="#" className="hover:underline">
            Login here
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
