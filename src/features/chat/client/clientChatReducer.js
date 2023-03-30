import axios from "axios";

const API_URL = "http://localhost:5555";

const connectChat = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

//   console.log("Chat Reducers  : ");

  const response = await axios.get(API_URL + "/chat/buyer", config);

//   console.log( "Response Reducers: ",response)
  return response.data
};

const clientChatService = {
  connectChat,
};

export default clientChatService;
