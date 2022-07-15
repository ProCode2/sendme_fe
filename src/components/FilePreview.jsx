import React, { useEffect, useState } from "react";

const FilePreview = ({ file }) => {
  const [renderAble, setRenderAble] = useState(false);
  useEffect(() => {
    const renderAbleExtensions = ["jpg", "jpeg", "png", "webp"];
    // console.log(file.filename.split(".").pop());
    setRenderAble(
      renderAbleExtensions.includes(file.filename.split(".").pop())
    );
  }, []);
  return (
    <div className="m-4">
      {renderAble ? (
        <a
          className="w-full h-full"
          href={file.data}
          download={file?.filename || "file"}
        >
          <div className="w-32 h-32 flex justify-center items-center border shadow-md rounded-md overflow-hidden">
            <img className="w-full h-full" src={file.data} alt="file preview" />
          </div>
        </a>
      ) : (
        <a
          className="w-full h-full"
          href={file.data}
          download={file?.filename || "file"}
        >
          <div className="w-32 h-32 flex justify-center items-center border shadow-md rounded-md p-2 text-ellipsis">
            {`${file.filename.slice(0, 8)}...` || "Download"}
          </div>
        </a>
      )}
    </div>
  );
};

export default FilePreview;
