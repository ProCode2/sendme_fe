import { useDropzone } from "react-dropzone";
import { FcUpload } from "react-icons/fc";

const FileUploader = ({ uploadFile }) => {
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({});
  return (
    <div>
      <div
        {...getRootProps({
          className: "w-full",
        })}
      >
        <input className="input-zone" {...getInputProps()} />
        <div
          className={`shadow-md rounded-md w-full h-full border-2 border-slate-500 border-spacing-2 border-dashed transition-all ease-in-out duration-300 flex flex-col justify-center items-center py-4 ${
            isDragActive && "bg-slate-900 text-white"
          }`}
        >
          <FcUpload size={40} color={"#525252"} />
          <p className="w-full h-ful text-slate-700 text-center uppercase font-semibold text-2xl mt-3">
            Drag n drop files here
          </p>
          <button
            className={`shadow-md rounded-md py-2 px-4 mt-3 hover:scale-110 transition-all ease-in-out duration-300 ${
              isDragActive
                ? "bg-white text-slate-900"
                : "bg-slate-900 text-white"
            }`}
          >
            Browse
          </button>
        </div>
      </div>
      <div className="w-full">
        {acceptedFiles.length > 0 && (
          <div className="flex justify-between items-center my-4 mx-8 px-4 py-3 rounded-md text-slate-700 border">
            <span>{acceptedFiles[0].name}</span>
            <button
              onClick={(e) => {
                e.preventDefault();
                uploadFile(acceptedFiles[0]);
              }}
              className={`shadow-md rounded-md py-2 px-4 hover:bg-slate-700 transition-all ease-in-out duration-300 ${
                isDragActive
                  ? "bg-white text-slate-900"
                  : "bg-slate-900 text-white"
              }`}
            >
              Upload
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
