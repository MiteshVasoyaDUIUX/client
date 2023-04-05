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

function ConversationTab({ conversation }) {
  return (
    <>
      <div className="conversationTab">{conversation.conversationId}</div>
    </>
  );
}

function AllConversation({ conversations }) {
  return (
    <>
      {conversations.map((conversation) => {
        // console.log(conversation)
        return <ConversationTab conversation={conversation} />;
      })}
    </>
  );
}

function Message({ message, own }) {
  return (
    <div>
      <div className="messageTop">
        <p className={own ? "own-message" : "message-from-other"}>
          {message.message}
        </p>
      </div>
      {/* <div className="messageBottom">{format(message.createdAt)}</div> */}
    </div>
  );
}

function Chat() {
  const dispatch = useDispatch();

  const [socket, setSocket] = useState(null);
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
    // receiverId = message.receiverId;
  });

  useEffect(() => {
    if (user) {
      dispatch(fetchChat());
      dispatch(fetchAllConversation());
    }

    // console.log("Client Chat ", conversations);

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

    const div = document.createElement("div");
    div.textContent = message.message;
    div.classList.add("own-message");
    document.getElementById("message-area-id").append(div);

    socket.emit("sendMessage", message);

    socket.on("privatemessage", (receivedMessage) => {
      console.log("Received Message : ", receivedMessage.message);
      const div = document.createElement("div");
      div.textContent = receivedMessage.message;
      div.classList.add("message-from-other");
      document.getElementById("message-area-id").append(div);
    });

    dispatch(saveChat(message));
  };

  return (
    <>
      <div className="chat-page-div">
        <div className="">
          <AllConversation conversations={conversations} />
        </div>
        <div style={{display : "block"}}>
          <div className="admin-chat-area">
            <div className="message-area" id="message-area-id">
              {messageArray.map((message) => (
                <div>
                  <Message
                    message={message}
                    own={message.senderId === user.user._id}
                  />
                </div>
              ))}

              {/* {console.log("All Messages : ", messages)} */}
            </div>
          </div>
          <div className="message-send-area">
            <input type="text" className="chat-text-box" id="messageBox" />
            <button onClick={handleSendButton} className="chat-send-button">
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
