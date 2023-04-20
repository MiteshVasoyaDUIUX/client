import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import "./Chat.css";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchChat,
  fetchChatAdmin,
  fetchChatClient,
  saveChat,
} from "../../features/chat/client/chatSlice";
import RefreshIcon from "@mui/icons-material/Refresh";

let currentMsg = [];

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
  const { user } = useSelector((state) => state.auth);
  const { messages } = useSelector((state) => state.chat);
  const [toScroll, setToScroll] = useState(0);
  const scrollRef = useRef();
  const chatScrollRef = useRef();
  let messageArray = [];
  const messageData = messages.messageData;
  let conversationId = "";
  let users = messages.users;
  let senderId = "";
  let receiverId = "";
  let msgStart = 1;

  console.log("Users from Messages : ", messages);

  useEffect(() => {
    if (user) {
      const chatFetchdata = {
        msgStart: msgStart,
      };

      dispatch(fetchChatClient(chatFetchdata));
      console.log("Fetch Chat of User :", user);
      setToScroll(1);
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

      const newMessageArea = document.getElementById(
        "new-client-message-container-id"
      );

      const messageArea = document.getElementById("client-message-area-id");

      const div = document.createElement("div");
      div.classList.add("message-from-other");

      const messageDiv = document.createElement("div");
      messageDiv.textContent = receivedMessage.message;

      const timeDiv = document.createElement("div");
      timeDiv.classList.add("client-time-of-received-message");
      timeDiv.textContent = time;

      div.append(messageDiv, timeDiv);

      newMessageArea.append(div);
      messageArea.scrollTop = messageArea.scrollHeight;

      document.getElementById("message-box-id").value = "";
    });

    socketIO.on("save-chat", (data) => {
      // dispatch(saveChat(data));
    });

    socketIO.on("disconnect", () => {
      console.log("Disconnect From....");
      const socketIOData = {
        userId: user.user._id,
        socketId: socketIO.id,
      };
    });
  }, []);

  users?.map((id) => {
    if (user.user._id === id) {
      senderId = id;
      console.log("Sender Id : ", senderId);
    } else if (user.user._id !== id) {
      receiverId = id;
      console.log("Receiver Id : ", receiverId);
    }
  });

  messageData?.map((message) => {
    currentMsg.unshift(message);
    conversationId = message.conversationId;
  });

  const handleSendButton = async (e) => {
    const messageValue = document.getElementById("message-box-id").value;

    if (
      (messageValue !== "" && e.keyCode === 13) ||
      (messageValue !== "" && e.type === "click")
    ) {
      const date = new Date();
      const t = String(date).slice(4, 21);

      const message = {
        conversationId: conversationId,
        senderId: senderId,
        receiverId: receiverId,
        message: messageValue,
        time: String(date),
      };

      const newMessageArea = document.getElementById(
        "new-client-message-container-id"
      );

      const messageArea = document.getElementById("client-message-area-id");
      const div = document.createElement("div");
      div.classList.add("own-message-admin");

      const messageDiv = document.createElement("div");
      messageDiv.textContent = message.message;

      const timeDiv = document.createElement("div");
      timeDiv.classList.add("time-of-sent-message");
      timeDiv.textContent = t;

      div.append(messageDiv, timeDiv);

      newMessageArea.append(div);

      socket.emit("sendMessage", message);

      messageArea.scrollTop = messageArea.scrollHeight;

      document.getElementById("message-box-id").value = "";
    }
  };

  useEffect(() => {
    if (scrollRef.current && toScroll === 1) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
      console.log("SCROLL VALUE : ", toScroll);
      setToScroll(0);
      console.log(" UPDATED SCROLL VALUE : ", toScroll);
    }
  }, [messages]);

  const handleChatScroll = () => {
    console.log("Scrolling...");

    if (chatScrollRef.current) {
      const { scrollTop } = chatScrollRef.current;
      if (scrollTop === 0 && messages.moreMsg === true) {
        msgStart = messageData.length + 1;
        //Dispatch Request to fetch new chat...
        const chatFetchdata = {
          msgStart: messages.nextMsgFrom,
        };
        console.log("Scrolled To The Top...", messages.moreMsg);
        dispatch(fetchChatClient(chatFetchdata));
      }
    }
  };

  return (
    <>
      <div>
        <div
          className="client-chat-area"
          ref={chatScrollRef}
          onScroll={handleChatScroll}
        >
          <div className="client-message-area" id="client-message-area-id">
            {messages.moreMsg ? (
              <>
                <div className="refresh-chat-icon">
                  <RefreshIcon sx={{ fontSize: "40px" }} />
                </div>
              </>
            ) : (
              <></>
            )}
            <div
              className="client-message-container"
              id="client-message-container-id"
            >
              {currentMsg.map((message) => {
                return (
                  <div ref={scrollRef}>
                    <Message
                      message={message}
                      own={message.senderId === user.user._id}
                    />
                  </div>
                );
              })}
            </div>
            <div
              className="new-client-message-container"
              id="new-client-message-container-id"
            ></div>
          </div>
        </div>
        <div className="client-chat-box-button">
          <input
            type="text"
            name="message"
            className="client-message-box"
            id="message-box-id"
            onKeyUp={handleSendButton}
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
