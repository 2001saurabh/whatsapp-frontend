import React, { useContext } from "react";
import { AppBar, Toolbar, styled, Box, Typography } from "@mui/material"; // named export statement
import LoginDialog from "./account/LoginDialog"; // default export statement
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ChatDialog from "./chat/chatDialog";
import { AccountContext } from "../context/AccountProvider";

const ComponentWrapper = styled(Box)`
  height: 100vh;
  /* background-color: #d8dbdc;
   */
  background-color: #dddedd;
`;
const Header = styled(AppBar)`
  height: 18vh;
  background-color: #00a783;
  box-shadow: none;
  /* backdrop-filter:"#fff" ; */
`;
const NavBar = styled(AppBar)`
  height: 30vh;
  background-color: #00a884;
  box-shadow: none;
  /* backdrop-filter:"#fff" ; */
`;
const Messanger = () => {
  const { account } = useContext(AccountContext);
  return (
    <ComponentWrapper>
      {account ? (
        <>
          {" "}
          <Header></Header>
          <ChatDialog />
        </>
      ) : (
        <>
          {" "}
          <NavBar>
            <Toolbar>
              <Box
                sx={{
                  ml: "220px",
                  mt: "30px",
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <WhatsAppIcon sx={{ color: "white", fontSize: 42 }} />
                <Typography
                  variant="button"
                  alignItems="justify"
                  sx={{
                    ml: "10px",
                    fontWeight: 500,
                    fontSize: 15,
                  }}
                >
                  Whatsapp web
                </Typography>
              </Box>
            </Toolbar>
          </NavBar>
          <LoginDialog />{" "}
        </>
      )}
    </ComponentWrapper>
  );
};

export default Messanger;
