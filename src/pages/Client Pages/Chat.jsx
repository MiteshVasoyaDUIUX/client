import React, { useEffect, useState, useRef } from "react";
import "./Chat.css";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { fetchChat, saveChat } from "../../features/chat/client/chatSlice";
import Messages from "../Admin Pages/Messages";

function Message({ message, own }) {
  return (
    <div>
      <div className={own ? "own-message" : "message-from-other"}>
        <div>{message.message}</div>
        <div
          className={
            own
              ? "client-time-of-sent-message"
              : "client-time-of-received-message"
          }
        >
          {message.time.slice(4, 21)}
        </div>
      </div>
    </div>
  );
}

function Chat() {
  const dispatch = useDispatch();

  const [socket, setSocket] = useState(null);
  const [allMessages, setAllMessage] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { messages } = useSelector((state) => state.clientChat);

  let messageArray = [];
  const messageData = messages.messageData;
  let conversationId = "";
  let users = messages.users;
  let senderId = "";
  let receiverId = "";

  users?.map((id) => {
    if (user.user._id === id) {
      senderId = id;
    } else if (user.user._id !== id) {
      receiverId = id;
    }
  });

  messageData?.map((message) => {
    messageArray.push(message);
    conversationId = message.conversationId;
  });

  useEffect(() => {
    if (user) {
      dispatch(fetchChat());
      setAllMessage(messageData);
    }

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

    socketIO.on("privatemessage", (receivedMessage) => {
      // console.log("Received Message : ", receivedMessage.message);
      const date = new Date();
      const time = String(date).slice(4, 21);
      const messageArea = document.getElementById("message-area-id");

      const div = document.createElement("div");
      div.classList.add("message-from-other");

      const messageDiv = document.createElement("div");
      messageDiv.textContent = receivedMessage.message;

      const timeDiv = document.createElement("div");
      timeDiv.classList.add("client-time-of-received-message");
      timeDiv.textContent = time;

      div.append(messageDiv, timeDiv);

      messageArea.append(div);
    });

    socketIO.on("save-chat", (data) => {
      dispatch(saveChat(data));
    });

    socketIO.on("disconnect", () => {
      console.log("Disconnect From....");
      const socketIOData = {
        userId: user.user._id,
        socketId: socketIO.id,
      };
    });
  }, []);

  const handleSendButton = async () => {
    const messageValue = document.getElementById("message-box-id").value;
    const date = new Date();
    const time = String(date).slice(4, 21);

    const message = {
      conversationId: conversationId,
      senderId: senderId,
      receiverId: receiverId,
      message: messageValue,
    };

    const messageArea = document.getElementById("message-area-id");

    const div = document.createElement("div");
    div.classList.add("own-message");

    const messageDiv = document.createElement("div");
    messageDiv.textContent = message.message;

    const timeDiv = document.createElement("div");
    timeDiv.classList.add("client-time-of-sent-message");
    timeDiv.textContent = time;

    div.append(messageDiv, timeDiv);

    messageArea.append(div);

    socket.emit("sendMessage", message);

    document.getElementById("message-box-id").value = "";
  };

  return (
    <>
      <div>
        <div className="client-chat-area">
          <div className="message-area" id="message-area-id">
            {messageArray.map((message) => (
              <div>
                <Message
                  message={message}
                  own={message.senderId === user.user._id}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="client-chat-box-button">
          <input
            type="text"
            name="message"
            className="client-message-box"
            id="message-box-id"
          />
          <button
            className="client-send-message-button"
            onClick={handleSendButton}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}

export default Chat;
