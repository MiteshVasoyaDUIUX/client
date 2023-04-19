import React, { useEffect, useState, useRef } from "react";
import "./ChatAdmin.css";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllConversation,
  fetchChatAdmin,
  saveChat,
} from "../../features/chat/client/chatSlice";
import RefreshIcon from "@mui/icons-material/Refresh";

let currentMsg = [];
let newMsg = [];

function Conversation({ conversation, openConversation, setOpenConversation }) {
  const handleOpenConversation = () => {
    // emptyArray();
    // console.log(" NEEEWWWWW ARRRRAAAAYYY : '", currentMsg);
    setOpenConversation(conversation.conversationId);
  };
  return (
    <>
      <div className="conversation-tab" onClick={handleOpenConversation}>
        {conversation.clientName}
      </div>
    </>
  );
}

function Message({ message, own }) {
  return (
    <div className={own ? "own-message-admin" : "message-from-other-client"}>
      <div>{message.message}</div>
      <div
        className={own ? "time-of-sent-message" : "time-of-received-message"}
      >
        {/* {console.log(message.time)} */}
        {message.time.slice(4, 21)}
      </div>
    </div>
  );
}

function Chat() {
  const dispatch = useDispatch();

  const [socket, setSocket] = useState(null);
  const [openConversationId, setOpenConversationId] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const { messages, conversations } = useSelector((state) => state.chat);
  // console.log("messages : ", messages);
  const scrollRef = useRef();
  const chatScrollRef = useRef();

  let messageData = messages.messageData;
  let conversationId = "";
  let users = messages.users;
  let senderId = "";
  let receiverId = "";
  let msgStart = 1;

  useEffect(() => {
    if (user && openConversationId === null) {
      dispatch(fetchAllConversation());
    }

    if (openConversationId) {
      const chatFetchdata = {
        conversationId: openConversationId,
        msgStart: msgStart,
      };
      dispatch(fetchChatAdmin(chatFetchdata));
    }

    const socketIO = io("ws://localhost:8888");
    setSocket(socketIO);
    socketIO.on("connect", () => {
      // console.log("Connected with Id : ", socketIO.id);

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

      messageArea.scrollTop = messageArea.scrollHeight;
    });

    socketIO.on("save-chat", (data) => {
      dispatch(saveChat(data));
    });

    socketIO.on("disconnect", () => {
      console.log("Disconnect From....");
    });
  }, [openConversationId]);

  users?.map((id) => {
    if (user.user._id === id) {
      senderId = id;
    } else if (user.user._id !== id) {
      receiverId = id;
    }
  });

  messageData?.map((message) => {
    currentMsg.unshift(message);
    conversationId = message.conversationId;
    // console.log("AASASASA : ", currentMsg);
  });

  if (openConversationId !== messages.conversationId) {
    // console.log("New Message : ", newMsg);
    currentMsg = [];
    newMsg = [];
  }

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
        time: date,
      };

      const messageArea = document.getElementById("admin-chat-area-id");

      const div = document.createElement("div");
      div.classList.add("own-message-admin");

      const messageDiv = document.createElement("div");
      messageDiv.textContent = message.message;

      const timeDiv = document.createElement("div");
      timeDiv.classList.add("time-of-sent-message");
      timeDiv.textContent = t;

      div.append(messageDiv, timeDiv);

      console.log("Time : ", date, t);

      // currentMsg.push(message);
      // newMsg.push(message);

      messageArea.append(div);

      socket.emit("sendMessage", message);

      document.getElementById("message-box-id").value = "";
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleChatScroll = () => {
    if (chatScrollRef.current) {
      const { scrollTop } = chatScrollRef.current;
      if (scrollTop === 0 && messages.moreMsg === true) {
        msgStart = messageData.length + 1;
        //Dispatch Request to fethc new chat...
        const chatFetchdata = {
          conversationId: openConversationId,
          msgStart: messages.nextMsgFrom,
        };
        console.log("Scrolled To The Top...", messages.moreMsg);
        dispatch(fetchChatAdmin(chatFetchdata));
      }
    }
  };

  return (
    <>
      <div className="chat-page-div">
        <div className="all-conversation-div">
          {conversations.map((conversation) => {
            return (
              <Conversation
                conversation={conversation}
                openConversation={openConversationId}
                setOpenConversation={setOpenConversationId}
              />
            );
          })}
        </div>
        <div className="chat-message-div">
          <div
            className="admin-chat-area"
            id="admin-chat-area-id"
            ref={chatScrollRef}
            onScroll={handleChatScroll}
          >
            {messages.moreMsg ? (
              <>
                <div className="refresh-chat-icon">
                  <RefreshIcon sx={{ fontSize: "40px" }} />
                </div>
              </>
            ) : (
              <></>
            )}

            {currentMsg.map((message) => (
              <div ref={scrollRef}>
                <Message
                  message={message}
                  own={message.senderId === user.user._id}
                />
              </div>
            ))}
            {newMsg.map((message) => (
              <div ref={scrollRef}>
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
              onKeyUp={handleSendButton}
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
