import { useEffect, useMemo, useState } from "react"
import MyDropzone from "../MyDropzone";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";


const Transform = () => {
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
    
        navigate("/transform-editor", {
          state: { file: selectedFile[0] },
        });
      };

      const handleClear = () => {
        setSelectedFile([]);
      };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-5xl my-8 font-extrabold text-gray-200 capitalize">Transform Image</h1>

      <div className="bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-lg flex flex-col items-center gap-6 border border-gray-700">
        <MyDropzone want_multiple_files={false} selectedFile={selectedFile} setSelectedFile={setSelectedFile} addClassName="border-dashed border-2 border-gray-600 p-10 rounded-lg w-full text-center cursor-pointer hover:border-gray-400 transition-colors duration-200"/>

        {preview !== '' && 
          <div className="mt-6 p-4 border border-gray-700 rounded-lg max-w-lg w-full flex justify-center items-center min-h-[200px]">
            <img src={preview} alt="Selected" className="max-w-full max-h-[400px] object-contain rounded" />
          </div>
        }

        <div className="flex gap-4 mt-6">
          <Button 
            onClick={handleConfirm} 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50"
            disabled={selectedFile.length === 0}
          >
            Confirm
          </Button>
          <Button
            onClick={handleClear}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50"
            disabled={selectedFile.length === 0}
          >
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Transform