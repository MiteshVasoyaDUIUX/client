import React, { useEffect, useState, useRef } from "react";
import "./Chat.css";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchChat,
  saveChat,
} from "../../features/chat/client/chatSlice";
import Messages from "../Admin Pages/Messages";

function Message({ message, own }) {
  return (
    <div>
      <div className="messageTop">
        <p className={own ? "own-message" : "message-from-other"}>
          {message.message}
        </p>
        {/* {console.log("Message : ", message, "Owned : ", own)} */}
      </div>
      {/* <div className="messageBottom">{format(message.createdAt)}</div> */}
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

  const handleSendButton = async () => {
    const messageValue = document.getElementById("messageBox").value;

    const message = {
      conversationId: conversationId,
      senderId: senderId,
      receiverId: receiverId,
      message: messageValue,
    };

    // console.log(
    //   "User ID  : ",
    //   user.user._id,
    //   "Sender ID :",
    //   senderId,
    //   "Receiver Id : ",
    //   receiverId
    // );

    const div = document.createElement("div");
    div.textContent = message.message;
    div.classList.add("own-message");
    document.getElementById("message-area-id").append(div);

    socket.emit("sendMessage", message);

    socket.on("privatemessage", (receivedMessage) => {
      console.log("Received Message : ", receivedMessage.text);
      const div = document.createElement("div");
      div.textContent = receivedMessage.message;
      div.classList.add("message-from-other");
      document.getElementById("message-area-id").append(div);
    });

    dispatch(saveChat(message));
  };

  return (
    <>
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

          {/* {console.log("All Messages : ", receiverId)} */}
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
