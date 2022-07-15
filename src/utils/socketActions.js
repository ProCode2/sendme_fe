const parseSocketData = (data) => {
  switch (data.action) {
    case "join-room":
      console.log("joined a room");
      console.log(data);
      break;
    case "send-message":
      console.log("send-message");
      console.log(data);
      downloadFile(data.message, "a.pdf");
      break;
    case "leave-room":
      console.log("Left the room");
      break;
    case "created-room":
      console.log("Created room");
      console.log(data);
      room = data.message;
      document.querySelector(".roomid").innerHTML = data.message;
      break;
    case "other-user-joined":
      console.log(`Someone connected to this network`);
      break;
    default:
      console.log(data);
  }
};
