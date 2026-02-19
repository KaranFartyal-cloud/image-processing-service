import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import MyDropzone from "../MyDropzone";

const CropImage = () => {
  const [selectedFile, setSelectedFile] = useState<File[]>([]);
  const navigate = useNavigate();

  const preview = useMemo(() => {
    if (selectedFile.length === 0) return "";
    return URL.createObjectURL(selectedFile[0]);
  }, [selectedFile]);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleConfirm = () => {
    if (selectedFile.length === 0) return;

    navigate("/crop-editor", {
      state: { file: selectedFile[0] },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-200">Upload Image</h1>

      <MyDropzone
        want_multiple_files={false}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        addClassName="border-dashed border-2 border-gray-600 p-10 rounded-lg w-full max-w-lg text-center cursor-pointer hover:border-gray-400 transition-colors duration-200"
      />

      <div className="flex gap-4 mt-6">
        <button
          onClick={handleConfirm}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50"
          disabled={selectedFile.length === 0}
        >
          Confirm & Edit
        </button>
        <button
          onClick={() => setSelectedFile([])}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50"
          disabled={selectedFile.length === 0}
        >
          Clear
        </button>
      </div>
      <div className="mt-8 p-4 border border-gray-700 rounded-lg max-w-lg w-full flex justify-center items-center min-h-[200px]">
        {preview !== "" ? (
          <img className="max-w-full max-h-[400px] object-contain rounded" src={preview} alt="Selected" />
        ) : (
          <p className="text-gray-500">No image selected</p>
        )}
      </div>
    </div>
  );
};

export default CropImage;
