import React from "react";
import { Box, styled } from "@mui/system";
import { Divider, Typography } from "@mui/material";
import LockRoundedIcon from "@mui/icons-material/LockRounded";

const Container = styled(Box)`
  background: #f8f9fa;
  padding: 30px 0;
  text-align: center;
  max-height: 85vh;
  height: 100%;
`;

const DefaultContainer = styled(Box)`
  padding: 0 200px;
`;

const Image = styled("img")({
  marginTop: 100,
  width: 400,
  objectFit: "cover",
});
const Title = styled(Typography)`
  font-size: 32px;
  margin: 25px 0 10px 0;
  font-family: inherit;
  font-weight: 300;
  color: #415261;
`;

const Subtitle = styled(Typography)`
  font-size: 14px;
  color: lightslategray;
  font-weight: 400;
  font-family: inherit;
`;
const EndText = styled(Typography)`
  font-size: 14px;
  color: lightslategray;
  font-weight: 400;
  font-family: inherit;
  margin-Top: 8rem;
`;
const EmptyChat = () => {
  return (
    <>
      <Container>
        <DefaultContainer>
          <Image
            src={
              "https://i.gadgets360cdn.com/large/whatsapp_multi_device_support_update_image_1636207150180.jpg?downsize=950:*"
            }
            alt="default chat image"
          />
          <Title>WhatsApp Web</Title>
          <Subtitle>
            Send and receive messages without keeping your phone online.
          </Subtitle>
          <Subtitle>
            Use WhatsApp on up to 4 linked devices and 1 phone at the same time.
          </Subtitle>
          <EndText>
            <LockRoundedIcon
              sx={{
                fontSize: "14px",
                color: "lightslategray",
                fontWeight: 400,
              }}
            />
            End-to-end encrypted
          </EndText>
        </DefaultContainer>
      </Container>
      <Divider sx={{ borderBottomWidth: 5, backgroundColor: "#25d366" }} />
    </>
  );
};

export default EmptyChat;
