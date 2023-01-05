import React, { useContext } from "react";
import {
  Drawer,
  IconButton,
  Typography,
  Box,
  styled,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  Avatar,
  Divider,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { AccountContext } from "../../context/AccountProvider";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import HttpsRoundedIcon from "@mui/icons-material/HttpsRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import WallpaperRoundedIcon from "@mui/icons-material/WallpaperRounded";
import ProfileDrawer from "./ProfileDrawer";
import { useState } from "react";

const drawerStyle = {
  left: 20,
  top: 17,
  width: "29%",
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

const arrayList = [
  { name: "Notification", icon: <NotificationsRoundedIcon /> },
  { name: "Privacy", icon: <HttpsRoundedIcon /> },
  { name: "Security", icon: <SecurityRoundedIcon /> },
  { name: "Theme", icon: <Brightness4Icon /> },
  { name: "Chat Wallpaper", icon: <WallpaperRoundedIcon /> },
  { name: "Help", icon: <HelpRoundedIcon /> },
];

const SettingDrawer = ({ open, setOpen }) => {
  const [openProfile, setOpenProfile] = useState(false);
  const { account } = useContext(AccountContext);
  const handleClose = () => {
    setOpen(false);
  };

  const handleProfileDrawer = () => {
    setOpenProfile(true);
  };
  return (
    <div>
      <Drawer
        anchor="left"
        open={open}
        onClose={handleClose}
        PaperProps={{ sx: drawerStyle }}
        hideBackdrop={true}
        sx={{ zIndex: 1400 }}
      >
        <DrawerHeader>
          <IconButton onClick={() => setOpen(false)}>
            <ArrowBackRoundedIcon sx={{ color: "#fff", fontWeight: 600 }} />
          </IconButton>
          <Typography sx={{ marginTop: "auto", fontWeight: 600, fontSize: 18 }}>
            Setting
          </Typography>
        </DrawerHeader>
        <List
          sx={{
            width: "100%",
            m: 0,
            p: 0,
            cursor: "pointer",
          }}
        >
          <ListItem alignItems="flex-start" sx={{ px: 0, py: 1 }}>
            <ListItemButton onClick={handleProfileDrawer}>
              <ListItemAvatar>
                <Avatar
                  alt="Remy Sharp"
                  src={account.picture}
                  sx={{ width: 80, height: 80 }}
                />
              </ListItemAvatar>
              <ListItemText
                alignItems="start"
                primary={account.name}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline-block", mt: 0.5 }}
                      component="span"
                      variant="body2"
                      color="text.secondary"
                    >
                      {/* {account.about} */}
                      hey I am using WhatsApp!
                    </Typography>
                  </React.Fragment>
                }
                sx={{
                  m: 2,
                }}
              />
            </ListItemButton>
          </ListItem>

          {arrayList.map((item, index) => (
            <div key={index}>
              <ListItem sx={{ px: 0, py: 0.5 }}>
                <ListItemButton>
                  <ListItemIcon> {item.icon} </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
              <Divider
                variant="inset"
                sx={{ backgroundColor: "#e9edef", opacity: "0.6" }}
              />
            </div>
          ))}
        </List>
      </Drawer>
      <ProfileDrawer open={openProfile} setOpen={setOpenProfile} />
    </div>
  );
};

export default SettingDrawer;
