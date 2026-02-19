import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

const TransformEditor = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const file: File | undefined = location.state?.file;
    const imgRef = useRef<HTMLImageElement | null>(null);


  const [preview, setPreview] = useState<string>("");

    useEffect(() => {
        if (!file) {
          navigate("/");
          return;
        }
    
        const url = URL.createObjectURL(file);
        setPreview(url);
    
        return () => URL.revokeObjectURL(url);
      }, [file, navigate]);

      if(!file )return null;

      const handleTransform = () => {

      }
    
  return (
    <div
    className="flex h-screen w-screen bg-[#1E1E1E] text-white"
      
     >
       {/* Toolbar */}
       <div className="w-full bg-[#252525] p-3 border-b border-[#333333] flex justify-center items-center gap-4 absolute top-0 left-0 right-0">
         {/* Placeholder for toolbar buttons */}
         <Button className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded text-sm">Brightness</Button>
         <Button className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded text-sm">Contrast</Button>
         <Button className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded text-sm">Add Text</Button>
         <Button className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded text-sm">Add Watermark</Button>
       </div>
       {/* Main Content Area (Image Editor) */}
       <div
       className="flex-grow flex items-center justify-center  p-4 overflow-hidden mt-16"
         style={{
           width: "calc(100vw - 260px)", // Adjusted width to be slightly smaller
          
         }}
       >
          {preview && (
            <div style={{ maxWidth: "100%", maxHeight: "100%" }}>
             
                <img
                className="max-w-full max-h-[80vh] object-contain"
                  ref={imgRef}
                  src={preview}
                  alt="to transform"
                 
                />
            
            </div>
          )}
       </div>

       {/* Right Sidebar (Properties/Layers) */}
       <div
       className="w-[200px] bg-[#252525] border-l border-[#333333] p-4 flex flex-col"
        
       >
         {/* Placeholder for properties/layers */}
         <div
         className="pb-3 text-center border-b border-[#333333] mb-3 text-lg font-bold"
         >

           Properties
         </div>
         {/* Back to Upload Button */}
         <Button
         className="bg-[#555555] text-white px-4 py-2 rounded cursor-pointer font-size-1em align-self-center width-90 mb-10"
         
           onClick={() => navigate("/crop-image")} // Navigate back to upload page
         >
           Back to Upload
         </Button>
         {/* Confirm Button */}
         <Button
         className="bg-[#007ACC] text-white px-4 py-2 rounded cursor-pointer font-size-1em align-self-center width-90 mt-auto"
          
           onClick={handleTransform} // Add this line
         >
           Confirm
         </Button>
       </div>
      </div>

  )
}

export default TransformEditor