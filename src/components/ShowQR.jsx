import React from "react";
import { QRCodeSVG } from "qrcode.react";

const ShowQR = ({ customStyles, socket, roomId, setShrinkQR, shrinkQR }) => {
  const handleGenerateQRCode = () => {
    if (!socket) return;
    socket.send(
      JSON.stringify({
        action: "create-room-and-send-id",
        message: null,
        target: "",
        sender: null,
      })
    );
  };
  return (
    <div className="transition-all ease-in-out duration-500">
      {roomId ? (
        <QRCodeSVG
          onClick={() => setShrinkQR(!shrinkQR)}
          className={`="transition-all ease-in-out duration-500" shadow-md ${customStyles}`}
          value={
            window.location.host.includes("localhost")
              ? `http://localhost:5173?rid=${roomId}`
              : `https://${window.location.host}?rid=${roomId}`
          }
        />
      ) : (
        <div
          onClick={handleGenerateQRCode}
          className={`blob cursor-pointer bg-slate-900 flex justify-center items-center transition-all ease-in-out duration-500 uppercase text-white ${customStyles}`}
        >
          <span className="">Show QR</span>
        </div>
      )}
    </div>
  );
};

export default ShowQR;
