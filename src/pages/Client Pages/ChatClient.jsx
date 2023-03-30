import React, { useEffect, useState } from "react";
import "./ChatClient.css";
import { useDispatch } from "react-redux";
import { connectChat } from "../../features/chat/client/clientChatSlice";
import { io } from "socket.io-client";

//SocketIO Implementation...
const socket = io("http://localhost:5555");

function ChatClient() {
  //   const dispatch = useDispatch();
  const [sendMessage, setSendMessage] = useState("");
  const [receiveMessage, setReceiveMessage] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setReceiveMessage((prevState) => [...prevState, data]);
      console.log("LOG ", receiveMessage);
    });
  }, [socket]);

  const handleMessageChanges = (e) => {
    setSendMessage(e.target.value);
  };

  const handleSendButton = async () => {
    await socket.emit("send_message", sendMessage);
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
        {receiveMessage.map((message) => {
          return <div>{message}</div>;
        })}
      </div>
      <input
        type="text"
        className="chat-text-box"
        value={sendMessage}
        onChange={handleMessageChanges}
      />
      <button onClick={handleSendButton}>Send</button>
      {/* {console.log("IO : ", socket)} */}
    </>
  );
}

export default ChatClient;
