import React, { useEffect, useState, useRef } from "react";
import "./ChatClient.css";

import { io } from "socket.io-client";

function ChatClient() {
  const socket = io("http://localhost:5555");

  const [socketId, setSocketId] = useState("");
  const [sendMessage, setSendMessage] = useState("");
  const [receiveMessage, setReceiveMessage] = useState([]);

  let ref = useRef("");

  useEffect(() => {
    console.log("Log 1 ");

    socket.on("receive_message", (data) => {
      // console.log(data);
      const newData = `"Message : ", ${data.message}, "from User : ", ${data.user}`;
      setReceiveMessage((prevState) => [...prevState, newData]);
      console.log(data);
    });

    socket.on("connect", () => {
      console.warn("Connected...");
    });

    socket.on("send-message", (data) => {
      console.log("Message : ", data.message, "from User : ", data.user);
    });
  }, []);

  const handleMessageChanges = (e) => {
    //
  };

  const handleSendButton = async () => {
    const message = ref.current.value;
    // console.log(ref.current.value);
    setSendMessage(message);
    await socket.emit("send_message", message);
  };

  return (
    <>
      <div
        className="client-chat-area"
        style={{
          wordWrap: "break-word",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        <div className="socketId">Socket ID : {socketId}</div>
        <div className="display-message">
          {receiveMessage.map((message) => {
            return <div>{message}</div>;
          })}
        </div>
      </div>
      <input type="text" className="chat-text-box" ref={ref} />
      <button onClick={handleSendButton}>Send</button>
      {console.log("IO : ", receiveMessage)}
    </>
  );
}

export default ChatClient;
