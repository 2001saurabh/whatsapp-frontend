import React, { useContext } from "react";
import { Box, Typography, styled } from "@mui/material";
import moment from "moment";
import { AccountContext } from "../../../context/AccountProvider";
import GetAppRoundedIcon from "@mui/icons-material/GetAppRounded";
import Spinner from "../../loader/Spinner";

const pdfUrl = "https://www.iconsdb.com/icons/preview/red/pdf-xxl.png";

const Own = styled(Box)`
  background: #d9fdd3;
  max-width: 60%;
  margin-left: auto;
  padding: 8px;
  margin-top: 4px;
  width: fit-content;
  display: flex;

  border-radius: 8px;

  word-break: break-all;
`;

const Wrapper = styled(Box)`
  background: #ffffff;
  max-width: 60%;
  padding: 8px;
  width: fit-content;
  display: flex;
  margin-top: 4px;
  margin-left: 8px;
  border-radius: 8px;
  word-break: break-all;
`;
const MessageText = styled(Typography)`
  font-size: 15;
`;
const TimeText = styled(Typography)`
  font-size: 12px;
  padding-inline: 8px;
  /* padding-top: 6px; */
  color: lightslategray;
  margin-top: auto;
  word-break: keep-all;
`;

const TextMsg = ({ message }) => {
  return (
    <>
      <MessageText variant="body2">{message?.text}</MessageText>
      <TimeText variant="body2">
        {moment(message?.createdAt).format("LT")}
      </TimeText>
    </>
  );
};

const ImgMsg = ({ message }) => {
  const downloadMedia = (e, originalImage) => {
    e.preventDefault();
    try {
      fetch(originalImage)
        .then((res) => res.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.style.display = "none";
          a.href = url;

          const nameSplit = originalImage.split("/");
          const duplicateName = nameSplit.pop();
          a.download = "" + duplicateName + "";
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
        })
        .catch((err) =>
          console.log("Error while downloading the image ", err.message)
        );
    } catch (err) {
      console.log("Error while downloading the image ", err.message);
    }
  };
  return (
    <Box style={{ position: "relative" }}>
      {message?.text?.includes(".pdf")  || message?.text?.includes(".txt") || message?.text?.includes(".docx") ?  (
        <Box sx={{ display: "block", maxWidth: 250, height: "88%" }}>
          <img src={pdfUrl} alt="pdf" style={{ width: "100%" }} />
          <Typography variant="body2" sx={{ maxWidth: "65%" }}>
            {message.text.split("/").pop()}
          </Typography>
        </Box>
      ) : (
        <img
          style={{
            height: "88%",
            width: 400,
            objectFit: "cover",
            border: "1px solid lightslategrey",
          }}
          src={message?.text}
          alt={message?.text}
        />
      )}

      <TimeText
        variant="body2"
        style={{
          position: "absolute",

          bottom: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <GetAppRoundedIcon
          onClick={(e) => downloadMedia(e, message.text)}
          sx={{
            mr: "10px",
            fontSize: "18px",
            cursor: "pointer",
            border: "1px solid darkslategray",
            borderRadius: "50%",
          }}
        />
        {moment(message?.createdAt).format("LT")}
      </TimeText>
    </Box>
  );
};
const Message = ({ message }) => {
  const { account } = useContext(AccountContext);
  return (
    <>
      {" "}
      {account.sub === message.senderId ? (
        <Own>
          {message.type === "file" ? (
            <ImgMsg message={message} />
          ) : (
            <TextMsg message={message} />
          )}
        </Own>
      ) : (
        <Wrapper>
          {message.type === "file" ? (
            <ImgMsg message={message} />
          ) : (
            <TextMsg message={message} />
          )}
        </Wrapper>
      )}
    </>
  );
};

export default Message;
