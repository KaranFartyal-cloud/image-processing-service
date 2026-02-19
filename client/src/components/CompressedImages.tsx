import JSZip from "jszip";

type Props = {
  isCompressing: boolean;
  compressedPreviews: string[];
};

const CompressedImages = ({ isCompressing, compressedPreviews }: Props) => {

  const handleDownload = async () => {
    const zip = new JSZip();
    const folder = zip.folder("compressed_images"); // Create a folder inside the zip

    for (const [index, src] of compressedPreviews.entries()) {
      const response = await fetch(src);
      const blob = await response.blob();
      folder?.file(`image_${index + 1}.png`, blob);
    }

    zip.generateAsync({ type: "blob" }).then((content) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(content);
      link.download = "compressed_images.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg w-full max-w-3xl py-6 px-5 my-6 border border-gray-700">
      <h2 className="text-center font-bold text-xl mb-4 text-blue-400">
        Compressed Images {isCompressing && "(processing...)"}
      </h2>

      <div className="flex justify-center mb-4">
        <button
          onClick={handleDownload}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50"
          disabled={compressedPreviews.length === 0}
        >
          Download All
        </button>
      </div>

      <div className="mt-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto max-h-80 p-2 rounded bg-gray-700">
        {compressedPreviews.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`compressed-${index}`}
            className="h-40 w-full object-cover rounded-lg border border-blue-500 shadow-md"
          />
        ))}
      </div>
    </div>
  );
};

export default CompressedImages;
