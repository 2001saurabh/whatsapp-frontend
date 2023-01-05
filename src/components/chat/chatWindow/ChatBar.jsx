import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Box,
  Input,
} from "@mui/material";
import MoodRoundedIcon from "@mui/icons-material/MoodRounded";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import MicRoundedIcon from "@mui/icons-material/MicRounded";
import { uploadFile } from "../../../service/api";

const ChatBar = ({
  setTextMsg,
  sendMessage,
  textMsg,
  file,
  setFile,
  setFileUrl,
}) => {
  const onFileChange = (e) => {
    console.log(e);
    setFile(e.target.files[0]);
    setTextMsg(e.target.files[0].name);
  };

  useEffect(() => {
    const setFileToDb = async () => {
      if (file) {
        const data = new FormData();

        data.append("name", file.name);
        data.append("file", file);

        let res = await uploadFile(data);
        console.log(res.data);
        setFileUrl(res.data);
      }
    };
    setFileToDb();
  }, [file]);
  return (
    <>
      <AppBar
        position="static"
        color="primary"
        sx={{
          top: "auto",
          bottom: 0,
          p: 0,
          m: 0,
          bgcolor: "#f0f2f5",
          color: "#5b6b75",
          boxShadow: "none",
        }}
      >
        <Toolbar
          sx={{
            "& >*": {
              px: 0.75,
              mx: 0.75,
            },
          }}
        >
          <IconButton color="inherit" aria-label="open drawer" disableRipple>
            <MoodRoundedIcon sx={{ fontSize: "28px" }} />
          </IconButton>

          <IconButton
            color="inherit"
            disableRipple
            aria-label="upload file"
            component="label"
          >
            <input
              type="file"
              id="fileInput"
              hidden
              accept="file/*"
              // multiple
              onChange={(e) => onFileChange(e)}
            />
            <AttachFileRoundedIcon
              sx={{ fontSize: "28px", transform: `rotate(50grad)` }}
            />
          </IconButton>

          <Box
            sx={{
              flexGrow: 1,
              bgcolor: "#fff",
              p: "8px",
              borderRadius: "12px",
            }}
          >
            <InputBase
              placeholder="Type a message"
              fullWidth
              required={true}
              onChange={(e) => setTextMsg(e.target.value)}
              // here in sendMessage e needed to pass as arg cause "e" holds all the info about pressed key
              onKeyPress={(e) => {
                if (textMsg) {
                  sendMessage(e);
                }
              }}
              value={textMsg}
            />
          </Box>

          <IconButton color="inherit" disableRipple>
            <MicRoundedIcon sx={{ fontSize: "28px" }} />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default ChatBar;
