import axios from "axios";

// const url = "http://localhost:5000";
const url = "https://whatsapp-backend-ten.vercel.app/";

export const addUser = async (data) => {
  try {
    await axios.post(`${url}/adduser`, data);
  } catch (err) {
    console.log("Causing error by addUser API", err.message);
  }
};

export const getUsers = async () => {
  try {
    const res = await axios.get(`${url}/getUsers`);
    console.log("other users are ", res.data);
    return res.data;
  } catch (err) {
    console.log("Causing error by getUser API", err.message);
  }
};

export const setConversation = async (data) => {
  try {
    await axios.post(`${url}/conversation/add`, data);
  } catch (err) {
    console.log("Causing error by setConversation", err.message);
  }
};

export const getConversation = async (data) => {
  try {
    let res = await axios.post(`${url}/conversation/get`, data);
    return res.data;
  } catch (err) {
    console.log("Causing error by getConversation", err.message);
  }
};

export const newMessage = async (data) => {
  try {
    await axios.post(`${url}/message/add`, data);
  } catch (err) {
    console.log("Causing error by newMessage api", err.message);
  }
};

export const getMessages = async (id) => {
  try {
    let res = await axios.get(`${url}/message/get/${id}`);
    return res.data;
  } catch (err) {
    console.log("Causing error by getMessage api", err.message);
  }
};

export const uploadFile = async (data) => {
  try {
    return await axios.post(`${url}/file/upload`, data);
  } catch (err) {
    console.log("Causing error by uploadFile api", err.message);
  }
};
