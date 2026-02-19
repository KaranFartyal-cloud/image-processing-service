import { useDarkMode } from "@/hooks/useDarkMode";

const Home = () => {
  const { isDarkEnabled } = useDarkMode();
  console.log(isDarkEnabled);
  return (
    <div className={`${isDarkEnabled && "dark dark:bg-background"}`}>
      <section className=" flex justify-center items-center flex-col">
        <div className="mt-16 relative">
          {/* images */}
          <div className="relative  w-full mt-10">
            <img
              src="no_internet.jpeg"
              className="base-image -rotate-6  img-shadow absolute"
              alt=""
            />
            <img
              src="cat.jpeg"
              alt="cat-image"
              className="base-image   img-shadow "
            />
          </div>
          <div className="absolute z-50 top-[40%] left-20 ">
            <h1 className="text-2xl font-roboto font-bold char-shadow">
              MAKE YOUR
            </h1>

            <h1 className="text-4xl">IMAGES</h1>
            <h1>YOUR WAY</h1>
          </div>
        </div>
      </section>

      {/* grid  */}

      <div className="md:flex md: justify-center mt-10 ">
        <section className="flex flex-col gap-10 items-center md:grid md:grid-cols-2   w-full md:w-3/4 ">
          <div className="flex dark:bg-[#212120] bg-[#ece4dc] px-5 py-3 rounded-2xl flex-col justify-center ">
            <img src="./crop.png" alt="crop-image" className="grid-image" />
            <span className="norm-text">Crop Your Images</span>
          </div>

          <div className="flex dark:bg-[#212120] bg-[#ece4dc] px-5 py-3 rounded-2xl flex-col justify-center ">
            <img
              src="./compress.png"
              alt="compress-image"
              className="grid-image"
            />

            <span className="norm-text">Compress Your Images</span>
          </div>
        </section>
      </div>
      <div></div>
    </div>
  );
};

export default Home;
