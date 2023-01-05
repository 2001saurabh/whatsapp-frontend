import React, { useContext, useState, useEffect, Suspense } from "react";
import { Box, styled } from "@mui/material";
import PersonDrawer from "../../drawer/PersonDrawer";
import ChatHeader from "./ChatHeader";
import ChatBar from "./ChatBar";
// import Messanges from "./Messanges";
import { getConversation } from "../../../service/api";
import { AccountContext } from "../../../context/AccountProvider";
import Spinner from "../../loader/Spinner";
import { lazy } from "react";
const Messages = lazy(() => import("./Messanges"));

const ChatBoxWrapper = styled(Box)`
  /* background-color: #fff; */
  min-height: 80vh;
`;

const ChatBox = () => {
  const [conversation, setConversation] = useState({});
  const { account, person, openDrawer, setOpenDrawer } =
    useContext(AccountContext);

  useEffect(() => {
    const getConversationDetails = async () => {
      let data = await getConversation({
        senderId: account.sub,
        receiverId: person.sub,
      });
      setConversation(data);

      console.log("conversation details", data);
    };

    getConversationDetails();
  }, [person.sub]);
  return (
    <>
      {" "}
      <Suspense fallback={<Spinner />}>
        <ChatBoxWrapper>
          <ChatHeader person={person} />
          <Suspense fallback={<Spinner />}>
            <Messages person={person} conversation={conversation} />
          </Suspense>
        </ChatBoxWrapper>
        <PersonDrawer open={openDrawer} setOpen={setOpenDrawer} />
      </Suspense>
    </>
  );
};

export default ChatBox;
