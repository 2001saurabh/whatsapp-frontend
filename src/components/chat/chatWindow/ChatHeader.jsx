import React, { useState, useContext } from "react";
import {
  Box,
  styled,
  ListItemButton,
  Avatar,
  IconButton,
  Typography,
} from "@mui/material";
import { AccountContext } from "../../../context/AccountProvider";
import PersonDrawer from "../../drawer/PersonDrawer";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

const HeaderWrapper = styled(Box)`
  display: flex;
  /* position: absolute; */
  justify-content: space-between;
  align-items: center;
  height: 44px;
  flex-basis: max-content;
  background-color: #f0f2f5;
  color: #5e6e77;
  padding: 8px 4px;
`;
const ChatHeader = ({ person }) => {
  const { setOpenDrawer, activeUser } = useContext(AccountContext);

  // activeUser && console.log(activeUser);

  const handlePersonDrawer = (e) => {
    return setOpenDrawer(true);
  };

  return (
    <>
      <HeaderWrapper>
        <ListItemButton
          sx={{
            "&:hover": {
              backgroundColor: "inherit",
            },
          }}
          onClick={() => handlePersonDrawer()}
        >
          <Avatar
            src={person.picture}
            sx={{ bgcolor: "darkcyan" }}
            alt="Profile"
          />
          <Box sx={{ mx: 2 }}>
            <Typography
              variant="body2"
              component="p"
              sx={{ fontSize: "16px", color: "#524446" }}
            >
              {person.name}
            </Typography>
            <Typography variant="body" component="p" sx={{ fontSize: "13px" }}>
              {activeUser?.find((user) => user.sub === person.sub)
                ? "Online"
                : "Offline"}
            </Typography>
          </Box>
        </ListItemButton>
        <IconButton color="inherit" sx={{ mx: 1 }} disableRipple>
          <SearchIcon />
        </IconButton>
        <IconButton color="inherit" sx={{ mx: 1 }} disableRipple>
          <MoreVertRoundedIcon />
        </IconButton>
      </HeaderWrapper>
    </>
  );
};

export default ChatHeader;
