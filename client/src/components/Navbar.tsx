import { useDarkMode } from "@/hooks/useDarkMode";
import { Baseline, Crop, Gavel, Home, Image, Sparkle } from "lucide-react";
import { Link, NavLink, Outlet } from "react-router-dom";

const Navbar = () => {
  const { isDarkEnabled, setIsDarkEnabled } = useDarkMode();
  return (
    <>
      <nav
        className={
          `${isDarkEnabled && "dark"}` +
          "  fixed top-1.25  z-50 flex flex-col gap-3 md:gap-0 md:flex-row justify-center items-center md:justify-between px-3 md:w-full w-screen "
        }
      >
        <Image className="hidden md:block" size={40} />
        <div className="flex  gap-3 text-sm items-center w-fit md:w-175 md:translate-x-10 justify-around nav-background glassify cust-dropShadow">
          <NavLink to="/">
            <span className="text-normal flex-center cust-dropShadow">
              <Home size={18} />
              Home
            </span>
          </NavLink>

          <NavLink to="/compressor">
            <span className="text-normal flex-center cust-dropShadow">
              <Gavel size={18} />
              Compress
            </span>
          </NavLink>

          <NavLink to="/change-format">
            <span className="text-normal flex-center cust-dropShadow">
              <Baseline size={18} />
              Convert
            </span>
          </NavLink>

          <NavLink to="/crop-image">
            <span className="text-normal flex-center cust-dropShadow">
              <Crop size={18} /> Crop
            </span>
          </NavLink>

          <NavLink to="/transform">
            <span className="text-normal flex-center cust-dropShadow">
              <Sparkle size={18} />
              Transform
            </span>
          </NavLink>
        </div>

        {/* auth buttons */}
        <div className="flex gap-9 md:mr-10 items-center ">
          <Link to={"/login"} className="link-primary ">
            Login
          </Link>
          <Link
            to={"/sign-up"}
            className="text-white px-3 py-2 bg-blue-500 rounded-lg "
          >
            Register
          </Link>
        </div>
      </nav>

      <button
        className={`ml-2 mb-4 px-5 py-2 text-center rounded-lg fixed bottom-0 ${isDarkEnabled ? "text-white bg-gray-800" : "bg-blue-500 text-white"}`}
        onClick={() => setIsDarkEnabled((prev) => !prev)}
      >
        {isDarkEnabled ? "Light" : "dark"}
      </button>
      <Outlet />
    </>
  );
};

export default Navbar;
