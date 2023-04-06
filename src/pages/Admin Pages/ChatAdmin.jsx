import React, { useEffect, useState, useRef } from "react";
import "./ChatAdmin.css";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllConversation,
  fetchChat,
  saveChat,
} from "../../features/chat/client/chatSlice";
import Messages from "../Admin Pages/Messages";

function Conversation({ conversation, openConversation, setOpenConversation }) {
  const handleOpenConversation = () => {
    setOpenConversation(conversation.conversationId);
  };
  return (
    <>
      <div className="conversation-tab" onClick={handleOpenConversation}>
        {conversation.conversationId}
      </div>
    </>
  );
}

function Message({ message, own }) {
  return (
    <div>
      <div className={own ? "own-message-admin" : "message-from-other-client"}>
        <div>{message.message}</div>
        <div
          className={own ? "time-of-sent-message" : "time-of-received-message"}
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
  const [openConversation, setOpenConversation] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const { messages, conversations } = useSelector((state) => state.clientChat);

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
      dispatch(fetchAllConversation());
    }

    if (openConversation) {
      dispatch(fetchChat());
      console.log("Clicked Conversaiton :", openConversation);
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
      const messageArea = document.getElementById("admin-chat-area-id");

      const div = document.createElement("div");
      div.classList.add("message-from-other-client");

      const messageDiv = document.createElement("div");
      messageDiv.textContent = receivedMessage.message;

      const timeDiv = document.createElement("div");
      timeDiv.classList.add("time-of-received-message");
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
  }, [openConversation]);

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

    const messageArea = document.getElementById("admin-chat-area-id");

    const div = document.createElement("div");
    div.classList.add("own-message-admin");

    const messageDiv = document.createElement("div");
    messageDiv.textContent = message.message;

    const timeDiv = document.createElement("div");
    timeDiv.classList.add("time-of-sent-message");
    timeDiv.textContent = time;

    div.append(messageDiv, timeDiv);

    messageArea.append(div);

    socket.emit("sendMessage", message);

    document.getElementById("message-box-id").value = "";
  };

  return (
    <>
      <div className="chat-page-div">
        <div className="all-conversation-div">
          {conversations.map((conversation) => {
            return (
              <Conversation
                conversation={conversation}
                openConversation={openConversation}
                setOpenConversation={setOpenConversation}
              />
            );
          })}
        </div>
        <div className="chat-message-div">
          <div className="admin-chat-area" id="admin-chat-area-id">
            {messageArray.map((message) => (
              <div>
                <Message
                  message={message}
                  own={message.senderId === user.user._id}
                />
              </div>
            ))}
          </div>
          <div className="chat-box-button">
            <input
              type="text"
              name="message"
              className="message-box"
              id="message-box-id"
            />
            <button className="send-message-button" onClick={handleSendButton}>
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
