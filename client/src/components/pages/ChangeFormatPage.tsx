import React, { useState, useEffect, useRef } from 'react'
import MyDropzone from '../MyDropzone'

const ChangeFormatPage = () => {
  const [selectedFile, setSelectedFile] = useState<File[]>([])
  const [preview, setPreview] = useState<string>("")
  const [convertedPreview, setConvertedPreview] = useState<string>("")
  const [targetFormat, setTargetFormat] = useState<string>("image/png") // Default to PNG
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (selectedFile.length === 0) {
      setPreview("")
      return
    }
    const url = URL.createObjectURL(selectedFile[0])
    setPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [selectedFile])

  const handleConvert = () => {
    if (!imageRef.current || selectedFile.length === 0) return

    const image = imageRef.current
    const canvas = document.createElement('canvas')
    canvas.width = image.naturalWidth
    canvas.height = image.naturalHeight
    const ctx = canvas.getContext('2d')

    if (ctx) {
      ctx.drawImage(image, 0, 0)
      const convertedUrl = canvas.toDataURL(targetFormat)
      setConvertedPreview(convertedUrl)
    }
  }

  const handleDownload = () => {
    if (convertedPreview === "") return

    const link = document.createElement('a')
    link.href = convertedPreview
    const fileName = `converted_image.${targetFormat.split('/')[1]}`
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleClear = () => {
    setSelectedFile([])
    setPreview("")
    setConvertedPreview("")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-5xl my-8 font-extrabold text-gray-200 capitalize">Change Image Format</h1>

      <div className="bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-3xl flex flex-col items-center gap-6 border border-gray-700 mx-auto">
        <MyDropzone selectedFile={selectedFile} setSelectedFile={setSelectedFile} want_multiple_files={false} addClassName="border-dashed border-2 border-gray-600 p-10 rounded-lg w-full text-center cursor-pointer hover:border-gray-400 transition-colors duration-200"/>

        <div className="flex flex-col items-center w-full mt-4">
          <label htmlFor="format-select" className="text-gray-300 text-lg mb-2">Convert to:</label>
          <select
            id="format-select"
            value={targetFormat}
            onChange={(e) => setTargetFormat(e.target.value)}
            className="bg-gray-700 border border-gray-600 text-white rounded-md p-2 w-full max-w-xs focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="image/png">PNG</option>
            <option value="image/jpeg">JPEG</option>
            <option value="image/webp">WebP</option>
          </select>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={handleConvert}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50"
            disabled={selectedFile.length === 0}
          >
            Convert Image
          </button>
          <button
            onClick={handleClear}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50"
            disabled={selectedFile.length === 0 && convertedPreview === ""}
          >
            Clear
          </button>
        </div>

        <div className="mt-8 p-4 border border-gray-700 rounded-lg w-full max-w-3xl flex flex-col md:flex-row justify-around items-center gap-6 bg-gray-800 shadow-lg mx-auto">
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-bold mb-3 text-gray-300">Original Image</h3>
            {preview ? (
              <img ref={imageRef} src={preview} alt="Original" className="max-w-xs max-h-60 object-contain rounded border border-gray-600 shadow-md" />
            ) : (
              <p className="text-gray-500">No image selected</p>
            )}
          </div>

          <div className="flex flex-col items-center">
            <h3 className="text-xl font-bold mb-3 text-gray-300">Converted Image</h3>
            {convertedPreview ? (
              <img src={convertedPreview} alt="Converted" className="max-w-xs max-h-60 object-contain rounded border border-blue-500 shadow-md" />
            ) : (
              <p className="text-gray-500">No converted image</p>
            )}
            <button
              onClick={handleDownload}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 mt-4"
              disabled={!convertedPreview}
            >
              Download Converted
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangeFormatPage