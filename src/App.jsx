import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import FilePreview from "./components/FilePreview";
import FileUploader from "./components/FileUploader";
import ShowQR from "./components/ShowQR";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [socket, setSocket] = useState(null);
  const [roomId, setRoomId] = useState("");
  const [shrinkQR, setShrinkQR] = useState(false);
  const [fileURLS, setFileURLs] = useState([]);
  const [showUploader, setShowUploader] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();

  let rid = searchParams.get("rid");

  function uploadFile(file) {
    if (!file) {
      console.log("no file");
      return;
    }
    if (file.size > 10000000) {
      alert("File should be smaller than 1MB");
      return;
    }

    var reader = new FileReader();

    reader.onloadend = function (e) {
      // console.log(reader.result)
      socket.send(
        JSON.stringify({
          action: "send-message",
          message: {
            type: "file",
            data: reader.result,
            size: file.size,
            filename: file.name,
          },
          target: roomId,
          sender: null,
        })
      );
    };

    reader.readAsDataURL(file);
  }

  const handleFileSubmit = (e) => {
    uploadFile();
  };

  const parseSocketData = (data) => {
    const msg = JSON.parse(data);

    switch (msg.action) {
      case "send-message":
        console.log("send-message");
        console.log(msg);
        setFileURLs((pv) => [msg.message, ...pv]);
        // downloadFile(msg.message, "a.pdf");
        break;
      case "leave-room":
        console.log("Left the room");
        break;
      case "created-room":
        console.log("Created room");
        setRoomId(msg.message.data);
        toast("Scan the QR code with the other device");
        break;
      case "other-user-joined":
        console.log(`Someone connected to this network`);
        toast.success("You are ready to channel your files!");
        setShrinkQR(true);
        setShowUploader(true);
        break;
      default:
        console.log(msg);
    }
  };

  useEffect(() => {
    // a weird way to check prod env or dev env change this later :)
    let url =
      (window.location.host.includes("localhost") ? "ws://" : "wss://") +
      window.location.host +
      "/ws";
    let ws = new WebSocket("ws://" + window.location.host + "/ws");
    ws.onopen = () => {
      if (!ws) return;
      ws.addEventListener("message", (e) => parseSocketData(e.data));

      if (rid && ws) {
        console.log(rid);
        setShrinkQR(true);
        setShowUploader(true);
        setRoomId(rid);
        ws.send(
          JSON.stringify({
            action: "join-room",
            message: {
              type: "message",
              data: rid,
            },
            target: "",
            sender: null,
          })
        );
      }
      setSocket(ws);
    };

    return () => {
      ws.removeEventListener("message", (e) => parseSocketData(e.data));
      ws.close();
    };
  }, [setSocket, rid]);

  return (
    <div className="App">
      <div
        className={`flex m-4 justify-center items-center transition-all ease-in-out duration-500 ${
          shrinkQR ? "flex-row justify-between items-center" : "flex-col"
        }`}
      >
        <div
          className={`text-left mx-8 transition-all ease-in-out duration-500 ${
            shrinkQR ? "" : "w-full mb-20"
          }`}
        >
          <Link to="/">
            <p className="font-mono font-bold tracking-tighter text-2xl md:text-3xl flex justify-start items-center">
              <img className="w-12 h-12" src="/logo.svg" alt="logo" />
              <span>SendMe</span>
            </p>
          </Link>
        </div>
        <div className={"flex justify-center items-center"}>
          <ShowQR
            setShrinkQR={setShrinkQR}
            shrinkQR={shrinkQR}
            roomId={roomId}
            socket={socket}
            customStyles={
              shrinkQR
                ? `w-20 h-20 md:w-22 md:h-22 text-sm font-thin`
                : "w-64 h-64 md:w-80 md:h-80 font-bold tracking-wider text-2xl md:text-3xl"
            }
          />
        </div>
      </div>
      {showUploader && roomId && (
        <div className="m-8">
          <FileUploader uploadFile={uploadFile} />
        </div>
      )}
      <div className="flex justify-center md:justify-start items-center m-8 flex-wrap">
        {fileURLS.length > 0 &&
          fileURLS.map((f) => <FilePreview key={f?.id} file={f} />)}
      </div>
    </div>
  );
}

export default App;
