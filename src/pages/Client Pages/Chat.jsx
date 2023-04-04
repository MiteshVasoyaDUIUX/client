import React, { useEffect, useState, useRef } from "react";
import "./Chat.css";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchChat,
  saveChat,
} from "../../features/chat/client/clientChatSlice";

function Chat() {
  const dispatch = useDispatch();

  const [socket, setSocket] = useState(null);
  const [sendMessage, setSendMessage] = useState("");
  const [receiveMessage, setReceiveMessage] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const { messages } = useSelector((state) => state.clientChat);

  let allMessages = [];

  messages.map((message) => allMessages.push(message));

  useEffect(() => {
    if (user) {
      dispatch(fetchChat());
    }

    console.log("Client Chat ", messages);

    const socketIO = io("ws://localhost:8888");
    setSocket(socketIO);
    socketIO.on("connect", () => {
      console.log("Connected with Id : ", socketIO.id);

      const socketIdData = {
        userId: user.user._id,
        socketId: socketIO.id,
      };

      if (user.user.role === "admin") {
        socketIO.emit("addActiveAdmin", socketIdData);
      } else if (user.user.role === "buyer") {
        socketIO.emit("addActiveClient", socketIdData);
      }
    });

    socketIO.on("privatemessage", (data) => {
      // allMessages.push(data);
      console.log("Received Message : ", data);
      // console.log("All Message : ", allMessages);
    });

    socketIO.on("disconnect", () => {
      console.log("Disconnect From....");
      const socketIOData = {
        userId: user.user._id,
        socketId: socketIO.id,
      };
    });
  }, []);

  const handleMessageChanges = (e) => {
    //
  };

  const handleSendButton = async () => {
    const message = document.getElementById("messageBox").value;

    // console.log(ref.current.value);
    setSendMessage(message);
    let fromBuyer, fromAdmin;

    if (user.user.role === "buyer") {
      fromBuyer = true;
      fromAdmin = false;
    } else if (user.user.role === "admin") {
      fromBuyer = false;
      fromAdmin = true;
    }

    const data = {
      senderId: user.user._id,
      fromBuyer,
      fromAdmin,
      text: message,
    };

    const div = document.createElement("p");
    div.textContent = message;

    if (user.user.role === "buyer") {
      div.classList.add("message-from-buyer");
      document.getElementById("message-area-id").append(div);
    } else if (user.user.role === "admin") {
      div.classList.add("message-from-buyer");
      document.getElementById("message-area-id").append(div);
    }

    // if (user.user.role === "buyer") {
    //   socket.emit("isAdminActive");

    // } else if (user.user.role === "admin") {
    // }

    socket.emit("sendMessage", data);
    // console.log("Sent Message :", sent);

    socket.on("privatemessage", (data) => {
      allMessages.push(data);
      console.log("Received Message : ", data);
      console.log("All Message : ", allMessages);
    });
    // console.log("Sent Message :", user.user.role);

    dispatch(saveChat(data));
  };

  return (
    <>
      <div className="client-chat-area">
        <div className="message-area" id="message-area-id">
          {allMessages.map((message) => {
            return message.message.fromAdmin ? (
              <>
                <p className="message-from-admin" key={message.message.text}>
                  {message.message.text}
                </p>
              </>
            ) : message.message.fromBuyer ? (
              <>
                <p className="message-from-buyer" key={message.message.text}>
                  {message.message.text}
                </p>
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
