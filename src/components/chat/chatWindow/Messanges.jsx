import React, { useContext, useState, useRef, lazy, Suspense } from "react";
import { Typography, Paper, styled, Box } from "@mui/material";
import img from "../../../image/Background.png";
import ChatBar from "./ChatBar";
import { AccountContext } from "../../../context/AccountProvider";
import { newMessage, getMessages } from "../../../service/api";
import { useEffect } from "react";
import Spinner from "../../loader/Spinner";
const Message = lazy(() => import("./Message"));

const Chats = styled(Paper)`
  max-height: 77vh;
  max-width: 100%;
  overflow: overlay;
  background-image: url(${img});
`;
const Wrapper = styled(Box)`
  min-height: 70vh;
  padding: 2em 4em 2em 4em;
`;
const Messanges = ({ person, conversation }) => {
  const [textMsg, setTextMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState();
  const [fileUrl, setFileUrl] = useState();
  const [incomingMessage, setIncomingMessage] = useState();
  const scrollRef = useRef();
  const { account, socket, newMsgFlag, setNewMsgFlag } =
    useContext(AccountContext);

  //UseEffect to get all message in realtime
  useEffect(() => {
    socket.current.on("getMessage", (data) => {
      setIncomingMessage({
        ...data,
        createAt: Date.now(), // this messages are coming from socket and their is no model(timestamp) so we need to add it.
      });
    });
  },[]);

    // fetch all messages from db as soon component get render
  useEffect(() => {
    const getMessageDetails = async () => {
      let data = await getMessages(conversation?._id);
      // console.log(data);
      setMessages(data);
    };
    // conversation?._id &&
     getMessageDetails();
    // if person changes that means we clicked on another contact
    //so we need to call another get api for their messages
    // also useEffect should call when we send new messages
  }, [person?._id, conversation?._id, newMsgFlag]);


   // changining scroll position at the render of messages
   useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, [messages]);


  useEffect(() => {
    incomingMessage &&
      conversation?.members?.includes(incomingMessage.senderId) &&
      setMessages((prev) => [...prev, incomingMessage]);
  }, [incomingMessage, conversation]);


  
 

  const sendMessage = async (e) => {
    // console.log("event", e);
    const code = e.keyCode || e.which;

    if (code === 13) {
      let message = {};
      if (!file) {
        message = {
          senderId: account.sub,
          receiverId: person.sub,
          conversationId: conversation._id,
          type: "text",
          text: textMsg,
        };
      } else {
        message = {
          senderId: account.sub,
          receiverId: person.sub,
          conversationId: conversation._id,
          type: "file",
          text: fileUrl,
        };
      }
      // realtime message sending to receiver end
      //so the message should reflect in real time to receiver end also with help of socket.io

      socket.current.emit("sendMessage", message);

      // call api for setting messages to db
      await newMessage(message);

      setTextMsg("");
      setFile("");
      setFileUrl("");
      // toggling newMsg flag so that useEffect get triggered when their is new msg
      // if we make it true from false then next msg it is already true so useEffect not get triggered again
      setNewMsgFlag((prev) => !prev);

      console.log(message);
    }
  };
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Chats>
          <Wrapper ref={scrollRef}>
            {messages &&
              messages.map((message) => (
                <Box key={message?._id}>
                  <Message message={message} />
                </Box>
              ))}
          </Wrapper>
        </Chats>
        <ChatBar
          setTextMsg={setTextMsg}
          sendMessage={sendMessage}
          textMsg={textMsg}
          file={file}
          setFile={setFile}
          setFileUrl={setFileUrl}
        />
      </Suspense>
    </>
  );
};

export default Messanges;
