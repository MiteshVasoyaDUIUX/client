/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import "./ChatAdmin.css";
// import { useDispatch } from "react-redux";
// import { connectChat } from "../../features/chat/client/clientChatSlice";
import { io } from "socket.io-client";

//SocketIO Implementation...
const socket = io("http://localhost:5555");

function ChatClient() {
  // console.log("Main");
  //   const dispatch = useDispatch();
  const [socketId, setSocketId] = useState("");
  const [sendMessage, setSendMessage] = useState("");
  const [receiveMessage, setReceiveMessage] = useState([]);

  let ref = useRef("");

  useEffect(() => {
    console.log("Log 1 ");

    socket.on("receive_message", (data) => {
      // console.log(data);
      setReceiveMessage((prevState) => [...prevState, data]);
    });

    socket.on("connect", () => {
      setSocketId(socket.id);
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
        {receiveMessage.map((message) => {
          return <div>{message}</div>;
        })}
      </div>
      <input type="text" className="chat-text-box" ref={ref} />
      <button onClick={handleSendButton}>Send</button>
      {console.log("IO : ", receiveMessage)}
    </>
  );
}

export default ChatClient;
