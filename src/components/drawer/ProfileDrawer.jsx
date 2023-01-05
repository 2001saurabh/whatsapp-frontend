import React from "react";
import { Drawer, IconButton, Typography, Box, styled } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import Profile from "./Profile";

const drawerStyle = {
  left: 20,
  top: 17,
  overflow: "hidden",
  width: "29.5%",
  minWidth: "445px",
  height: "95%",
  boxShadow: "none",
  // borderRight: '1px solid #eceff1',
  borderRight: "0.25px solid rgba(0, 0, 0, 0.14)",
};
const DrawerHeader = styled(Box)`
  display: flex;
  align-items: center;
  background: #008069;
  color: #fff;
  height: 16%;
  padding-left: 14px;

  & > * {
    margin-top: auto;
    padding: 12px;
  }
`;

const Component = styled(Box)`
  background: #f0f2f5;
  height: 84%;
`;

const ProfileDrawer = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Drawer
        anchor="left"
        open={open}
        onClose={handleClose}
        PaperProps={{ sx: drawerStyle }}
        hideBackdrop={true}
        sx={{ zIndex: 1500, position: "sticky" }}
      >
        <DrawerHeader>
          <IconButton onClick={() => setOpen(false)}>
            <ArrowBackRoundedIcon sx={{ color: "#fff", fontWeight: 600 }} />
          </IconButton>
          <Typography sx={{ marginTop: "auto", fontWeight: 600, fontSize: 18 }}>
            Profile
          </Typography>
        </DrawerHeader>
        <Component>
          <Profile />
        </Component>
      </Drawer>
    </div>
  );
};

export default ProfileDrawer;
