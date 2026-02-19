import { useDarkMode } from "@/hooks/useDarkMode";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface MyDropzoneProps {
  selectedFile: File[] | undefined;
  setSelectedFile: React.Dispatch<React.SetStateAction<File[]>>;
  want_multiple_files: boolean;
  addClassName: string;
}

const MyDropzone: React.FC<MyDropzoneProps> = ({
  setSelectedFile,
  want_multiple_files,
  addClassName,
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      if (want_multiple_files) {
        setSelectedFile(acceptedFiles); // Replace with new multiple files
      } else {
        setSelectedFile([acceptedFiles[0]]); // Only keep the first file
      }
    },
    [setSelectedFile, want_multiple_files],
  );
  const { isDarkEnabled } = useDarkMode();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: want_multiple_files,
  });

  return (
    <div
      {...getRootProps()}
      className={`${isDarkEnabled && "dark"} w-125 border-2 self-center border-blue-300 p-10 border-dashed cursor-pointer dark:border-black dark:bg-gray-600 ${addClassName}`}
      style={{
    
        opacity: isDragActive ? 30 : 100,
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-center dark:text-white text-blue-500 ">Drop the file here...</p>
      ) : (
        <p className="dark:text-black  text-center  font-roboto  text-blue-500">
          Drag & drop an image here, or click to select
        </p>
      )}
    </div>
  );
};

export default MyDropzone;
