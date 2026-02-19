import { useLocation, useNavigate } from "react-router-dom";
import ReactCrop, { type Crop } from "react-image-crop";
import { useEffect, useRef, useState } from "react";
import "react-image-crop/dist/ReactCrop.css";
import { Button } from "../ui/button";

const CropImage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const file: File | undefined = location.state?.file;

  const [preview, setPreview] = useState<string>("");
  const [crop, setCrop] = useState<Crop>();
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!file) {
      navigate("/");
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [file, navigate]);

  if (!file) return null;

    const handleConfirmCrop = () => {
        if (!imgRef.current || !crop) {
            return;
        }

        const image = imgRef.current;
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width * scaleX;
        canvas.height = crop.height * scaleY;
        const ctx = canvas.getContext('2d');

        if (ctx) {
            ctx.drawImage(
                image,
                crop.x * scaleX,
                crop.y * scaleY,
                crop.width * scaleX,
                crop.height * scaleY,
                0,
                0,
                crop.width * scaleX,
                crop.height * scaleY
            );

            // Download the image
            const link = document.createElement('a');
            link.download = 'cropped-image.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        }
    };

    return (
    <div
    className="flex h-screen w-screen bg-[#1E1E1E] text-white"
      
     >
       {/* Main Content Area (Image Editor) */}
       <div
       className="flex grow items-center justify-center  p-4 overflow-hidden"
         style={{
           width: "calc(100vw - 200px)",
         }}
       >
          {preview && (
            <div style={{ maxWidth: "100%", maxHeight: "100%" }}>
             <ReactCrop crop={crop} onChange={setCrop}>
                <img
                className=""
                  ref={imgRef}
                  src={preview}
                  alt="to crop"
                 
                />
              </ReactCrop>
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
          
           onClick={handleConfirmCrop} // Add this line
         >
           Confirm
         </Button>
       </div>
      </div>

  );
};

export default CropImage;
