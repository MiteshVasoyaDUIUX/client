import axios from "axios";

const API_URL = "http://localhost:5555";

const fetchChat = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // console.log("Response : ");
  const response = await axios.get(API_URL + "/buyer/chat", config);

  return response.data;
};

const insertSocketID = async (socketIOData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // console.log("Response : ", config);
  const response = await axios.post(
    API_URL + "/chat/insert/socketid",
    socketIOData,
    config
  );

  console.log("Response : ", response.data);

  // return response.data;
};

const deleteSocketID = async (socketIOData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // console.log("Response : ", config);
  const response = await axios.post(
    API_URL + "/chat/delete/socketid",
    socketIOData,
    config
  );

  console.log("Response : ", response.data);

  // return response.data;
};

const saveChat = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // console.log("Response : ", config);


  const response = await axios.post(
    API_URL + "/chat/save/chat",
    data,
    config
  );

  console.log("Response : ", response.data);

  // return response.data;
};

const clientChatService = {
  fetchChat,
  insertSocketID,
  deleteSocketID,
  saveChat,

};

export default clientChatService;
