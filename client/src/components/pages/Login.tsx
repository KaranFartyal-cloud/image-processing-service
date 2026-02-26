import { useDarkMode } from "@/hooks/useDarkMode";
import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useBackendUrl } from "@/hooks/useBackendUrl";
import { useLoading } from "@/hooks/useLoading";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";

type loginInput = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const { isDarkEnabled } = useDarkMode();
  const { url } = useBackendUrl();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginInput>();
  const { loading, startLoading, stopLoading } = useLoading();

  const onSubmit: SubmitHandler<loginInput> = async (data) => {
    try {
      startLoading();

      console.log(`${url}/login`);

      const res = await axios.post(
        `${url}/login`,
        {
          email: data.email,
          password: data.password,
        },
        {
          withCredentials: true,
        },
      );

      console.log(res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
        toast.error(error.response?.data.message);
      }

      console.log("unexpected error", error);
    } finally {
      stopLoading();
    }
  };

  const handleGoogle = async () => {
    console.log("inside");
    window.location.href = `${url}/google`;
  };

  return (
    <div
      className={`bg-sky-100 dark:bg-black flex justify-center items-center h-screen ${isDarkEnabled && "dark"}`}
    >
      {/* Left: Image */}
      <div className="w-1/2 h-screen hidden lg:block">
        <img
          src="https://img.freepik.com/fotos-premium/imagen-fondo_910766-187.jpg?w=826"
          alt="Placeholder Image"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right: Login Form */}
      <div className="lg:p-36 md:p-52 sm:p-20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl dark:text-white font-semibold mb-4">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* email Input */}
          <div className="mb-4 ">
            <label
              htmlFor="email"
              className="block dark:text-white text-gray-600"
            >
              email
            </label>
            <input
              type="text"
              id="email"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 dark:text-white"
              autoComplete="off"
              {...register("email", { required: true })}
            />
          </div>

          {errors.email && (
            <span className="error-text">This field is required</span>
          )}

          {/* Password Input */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-800 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: true })}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 dark:text-white"
              autoComplete="off"
            />
          </div>

          {errors.password && (
            <span className="error-text">This field is required</span>
          )}

          {/* Remember Me Checkbox */}
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="remember"
              name="remember"
              className=" text-red-500"
            />
            <label
              htmlFor="remember"
              className="text-green-900 dark:text-blue-500 ml-2"
            >
              Remember Me
            </label>
          </div>

          {/* Forgot Password Link */}
          <div className="mb-6 text-blue-500">
            <a href="#" className="hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          {loading ? (
            <>loading</>
          ) : (
            <button
              type="submit"
              className="bg-red-500 dark:bg-gray-800 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
            >
              Login
            </button>
          )}
        </form>

        <div className="flex  w-full flex-col items-center  py-2 ">
          <span className="text-normal">or</span>

          <Separator className="bg-gray-300 my-2" />

          <Button className="w-full" onClick={handleGoogle}>
            <i className="fa-brands fa-google"></i>Sign in with google
          </Button>
        </div>

        {/* Sign up Link */}
        <div className="mt-6 text-green-500 dark:text-blue-500 text-center">
          <a href="#" className="hover:underline">
            Sign up Here
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
