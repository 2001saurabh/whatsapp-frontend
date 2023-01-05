import React, { useContext } from "react";
import { Dialog, Box, styled, Typography, List, ListItem } from "@mui/material";
import qrcode from "../../image/qrcode.png";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { AccountContext } from "../../context/AccountProvider";
import { addUser } from "../../service/api";

const LoginHeader = styled(Typography)`
  font-family: inherit;
  font-size: 1.75rem;
  font-weight: 300;
  overflow-y: "hidden";
  margin-bottom: 1.5rem;
`;
const StyledList = styled(List)`
  & > li {
    padding: 0;
    margin-top: 15px;
    font-size: 18px;
    line-height: 2rem;
  }
`;
const QrContainer = styled(Box)`
  position: relative;
  margin: auto;
  padding-left: 4rem;
`;

const ComponenWrapper = styled(Box)`
  display: flex;
  padding: 6%;
`;
const dialogStyle = {
  height: "95%",
  width: "60%",
  //   padding: "auto",
  marginTop: "12%",
  maxWidth: "100%",
  maxHeight: "100%",
  boxShadow: "2px",
  overflow: "hidden",
  //   backdropFilter: "2px solid #fff",
};
const LoginDialog = () => {
  const { setAccount } = useContext(AccountContext);

  
  const onLoginSuccess = async (res) => {
    const decoded = jwt_decode(res.credential);
    console.log(res);
    console.log(decoded);
    setAccount(decoded);
    // api call to store/create user details
    await addUser(decoded);
  };

  const onLoginError = (err) => {
    console.log("Login Failed!", err);
  };
  return (
    <Dialog open={true} hideBackdrop={true} PaperProps={{ sx: dialogStyle }}>
      <ComponenWrapper>
        <Box>
          <LoginHeader>To use WhatsApp on your computer: </LoginHeader>
          <StyledList>
            <ListItem>1. Open WhatsApp on Your phone </ListItem>
            <ListItem>
              2. Tap Menu or Settings and select Linked Devices
            </ListItem>
            <ListItem>
              3. Point your phone to this screen to capture the code
            </ListItem>
          </StyledList>
        </Box>
        <QrContainer>
          <Box
            component="img"
            src={qrcode}
            height={264}
            width={264}
            alt="qrcode"
          />
          <Box
            style={{
              position: "absolute",
              top: "40%",
              transform: "translateX(10%)",
            }}
          >
            <GoogleLogin onSuccess={onLoginSuccess} onError={onLoginError} />
          </Box>
        </QrContainer>
      </ComponenWrapper>
    </Dialog>
  );
};

export default LoginDialog;
