/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import "./Chat.css";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  fetchChatClient,
  saveChat,
} from "../../features/chat/client/chatSlice";

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
  const messageData = messages.messageData;
  let conversationId = "";
  let users = messages.users;
  let senderId = "";
  let receiverId = "";
  let msgStart = 1;

  useEffect(() => {
    if (user) {
      const chatFetchdata = {
        msgStart: msgStart,
      };

      dispatch(fetchChatClient(chatFetchdata));
    }

    const socketIO = io("ws://localhost:8888");
    setSocket(socketIO);
    socketIO.on("connect", () => {
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
      const date = new Date();
      const time = String(date).slice(4, 21);

      const newMessageArea = document.getElementById("new-chat-container");

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
      dispatch(saveChat(data));
    });

    socketIO.on("disconnect", () => {
      console.log("Disconnected");
    });
  }, []);

  users?.map((id) => {
    if (user.user._id === id) {
      senderId = id;
    } else if (user.user._id !== id) {
      receiverId = id;
    }
  });

  messageData?.map((message) => {
    currentMsg.push(message);
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

      const newMessageArea = document.getElementById("new-chat-container");
      const messageArea = document.getElementById("scrollableDiv");

      const div = document.createElement("div");
      div.classList.add("own-message");

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

  const fetchMoreData = () => {
    msgStart = messageData.length + 1;

    //Dispatch Request to fetch new chat...
    const chatFetchdata = {
      msgStart: messages.nextMsgFrom,
    };
    dispatch(fetchChatClient(chatFetchdata));
  };

  return (
    <>
      <div
        style={{
          width: "80%",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "60px",
          height: "fit-content",
        }}
        id="client-chat"
      >
        <div id="scrollableDiv">
          <InfiniteScroll
            dataLength={currentMsg.length}
            next={fetchMoreData}
            style={{
              display: "flex",
              flexDirection: "column-reverse",
              overflow: "none",
            }}
            inverse={true}
            hasMore={messages.moreMsg}
            loader={<h4>Loading...</h4>}
            scrollableTarget="scrollableDiv"
          >
            <div id="new-chat-container"></div>
            {currentMsg.map((message) => (
              <Message
                message={message}
                own={message.senderId === user.user._id}
              />
            ))}
          </InfiniteScroll>
        </div>
        <div className="client-chat-box-button">
          <input
            type="text"
            name="message"
            className="message-box"
            id="message-box-id"
            onKeyUp={handleSendButton}
          />
          <button className="send-message-button" onClick={handleSendButton}>
            Send
          </button>
        </div>
      </div>
    </>
  );
}

export default Chat;
