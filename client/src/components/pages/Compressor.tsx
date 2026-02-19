import React, { useEffect, useState } from "react";
import MyDropzone from "../MyDropzone";
import { Button } from "../ui/button";
import imageCompression from "browser-image-compression";
import CompressedImages from "../CompressedImages";
import ImagesPreview from "../ImagesPreview";
import { useDarkMode } from "@/hooks/useDarkMode";

const Compressor: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [compressedPreviews, setCompressedPreviews] = useState<string[]>([]);
  const [isCompressing, setIsCompressing] = useState(false);

  const { isDarkEnabled } = useDarkMode();

  useEffect(() => {
    if (selectedFile.length === 0) {
      setPreviews([]);
      return;
    }

    // create preview URLs
    const objectUrls = selectedFile.map((file) => URL.createObjectURL(file));

    setPreviews(objectUrls);

    // cleanup
    return () => {
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [selectedFile]);

  const compressHandler = async () => {
    if (selectedFile.length === 0) return;

    setIsCompressing(true);

    try {
      const compressedFiles = await Promise.all(
        selectedFile.map((file) =>
          imageCompression(file, {
            maxSizeMB: 0.5,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
          }),
        ),
      );

      const compressedUrls = compressedFiles.map((file) =>
        URL.createObjectURL(file),
      );

      setCompressedPreviews(compressedUrls);
    } catch (error) {
      console.error("Compression failed", error);
    } finally {
      setIsCompressing(false);
    }
  };

  const clearHandler = () => {
    setSelectedFile([]);
    setPreviews([]);
    setCompressedPreviews([]);
  };

  return (
    <div
      className={`${isDarkEnabled && "dark"} flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900 text-white p-4`}
    >
      <h1 className="text-5xl my-8 font-extrabold text-center font-roboto text-black dark:text-gray-200 capitalize">
        Compress your image online
      </h1>

      <div className="dark:bg-gray-800 bg-gray-300 rounded-xl shadow-lg p-6 w-full max-w-3xl flex flex-col items-center gap-6 border dark:border-gray-700 border-white">
        <MyDropzone
          addClassName=""
          want_multiple_files={true}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
        />

        <ImagesPreview previews={previews} />

        <div className="flex justify-center py-3 w-full gap-5">
          <Button
            onClick={compressHandler}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50"
            disabled={selectedFile.length === 0 || isCompressing}
          >
            {isCompressing ? "Compressing..." : "Compress images"}
          </Button>
          <Button
            onClick={clearHandler}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50"
            disabled={selectedFile.length === 0 || isCompressing}
          >
            Clear
          </Button>
        </div>
      </div>

      {compressedPreviews.length > 0 && (
        <CompressedImages
          isCompressing={isCompressing}
          compressedPreviews={compressedPreviews}
        />
      )}
    </div>
  );
};

export default Compressor;
