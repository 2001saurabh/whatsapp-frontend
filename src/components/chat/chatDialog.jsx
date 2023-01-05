import { Dialog, Box, styled } from "@mui/material";
import { useContext } from "react";
import { AccountContext } from "../../context/AccountProvider";
import ChatBox from "./chatWindow/ChatBox";
import EmptyChat from "./chatWindow/EmptyChat";
import Menu from "./menu/Menu";


const dialogStyle = {
  height: "95%",
  width: "100%",
  margin: "20px",
  maxWidth: "100%",
  maxHeight: "100%",
  boxShadow: "none",
  borderRadius: "0",
};

const ChatWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

const LeftContainer = styled(Box)`
  min-width: 445px;
  width: 30%;
  height: 95vh;
`;

const RightContainer = styled(Box)`
  min-width: 300px;
  width: 70%;
  background: #f0f2f5;
  border-left: 0.05px solid rgba(0, 0, 0, 0.14);
  /* width: 70vw; */
`;
const ChatDialog = () => {
  const { person } = useContext(AccountContext);

  return (
    <>
      <Dialog
        open={true}
        hideBackdrop={true}
        PaperProps={{ sx: dialogStyle }}
        maxWidth={"md"}
      >
        <ChatWrapper>
          <LeftContainer>
            <Menu />
          </LeftContainer>
          <RightContainer>
            {/* as person is pure object so we check if any key is present in that object (is any person is selected)
            then we show their profile and chat else show emptychat */}
            {Object.keys(person).length ? <ChatBox /> : <EmptyChat />}
         
          </RightContainer>
        </ChatWrapper>
      </Dialog>
    </>
  );
};

export default ChatDialog;
