import React, { useEffect, useState, useRef } from "react";
import "./Chat.css";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { fetchChat, insertSocketID } from "../../features/chat/client/clientChatSlice";

function Chat() {
  const dispatch = useDispatch();

  const [socket, setSocket] = useState(null);
  const [sendMessage, setSendMessage] = useState("");
  const [receiveMessage, setReceiveMessage] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const { messages } = useSelector((state) => state.clientChat);

  let message = "";

  useEffect(() => {
    if (user) {
      dispatch(fetchChat());
    }

    console.log("Client Chat ", messages);

    const socketIO = io("ws://localhost:8888");
    setSocket(socketIO);
    socketIO.on("connect", () => {
      console.log("Connected with Id : ", socketIO.id)
      dispatch(insertSocketID(socketIO.id))
    })
    console.log("Socket IO ", socketIO);
  }, []);

  useEffect(() => {

    socket?.emit("addUser", user.adminId);

    socket?.on("getUsers", (users) => {
      console.log("Users : ", users);
    });
  }, [socket]);

  const handleMessageChanges = (e) => {
    //
  };

  const handleSendButton = async () => {
    const message = document.getElementById("messageBox").value;
    // console.log(ref.current.value);
    setSendMessage(message);

    const sent = await socket.emit("sendMessage", {
      senderId: user.id,
      text: message,
    });

    socket.on("receive-message", (data) => {
      console.log(data);
    });
    console.log(sent);
  };

  return (
    <>
      <div className="client-chat-area">
        <div className="message-area">
          {messages.map((message) => {
            return message.message.fromAdmin ? (
              <>
                <p className="message-from-admin">{message.message.text}</p>
              </>
            ) : message.message.fromBuyer ? (
              <>
                <p className="message-from-buyer">{message.message.text}</p>
              </>
            ) : (
              <></>
            );
          })}
        </div>
      </div>
      <div className="message-send-area">
        <input type="text" className="chat-text-box" id="messageBox" />
        <button onClick={handleSendButton} className="chat-send-button">
          Send
        </button>
      </div>
    </>
  );
}

export default Chat;
