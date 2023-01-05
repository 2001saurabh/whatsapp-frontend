import React from "react";
import {
  Drawer,
  IconButton,
  Typography,
  Box,
  styled,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
} from "@mui/material";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import { useContext } from "react";
import { AccountContext } from "../../context/AccountProvider";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import HistoryToggleOffRoundedIcon from "@mui/icons-material/HistoryToggleOffRounded";
import HttpsRoundedIcon from "@mui/icons-material/HttpsRounded";
import BlockIcon from "@mui/icons-material/Block";
import ThumbDownRoundedIcon from "@mui/icons-material/ThumbDownRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

const drawerWidth = 400;

const drawerStyle = {
  right: 20,
  top: 18,
  zIndex: 2000,

  minWidth: "445px",
  width: "29%",
  minHeight: "95vh",
  height: "87%",
  boxShadow: "none",
};
const Image = styled(Box)`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 1px solid gray;
  margin: 15px 0px;
  object-fit: cover;
  cursor: pointer;
  justify-content: center;
`;
const HeaderWrapper = styled(Box)`
  display: flex;
  position: static;
  align-items: center;
  height: 44px;
  background-color: #f0f2f5;
  color: darkslategrey;
  padding: 8px 4px;
  & > * {
    margin-top: auto;
    padding: 12px;
    align-items: center;
  }
`;

const InfoWrapper = styled(Box)`
  /* max-height: 90vh; */

  overflow: overlay;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: lightgray;
    border-radius: 6px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: dimgray;
  }
`;

const ContactDetails = styled(Box)`
  padding: 25px 0px;
  & > * {
    margin: auto;
    display: flex;
    justify-content: center;
  }
`;

const StyledDivider = styled(Divider)`
  background-color: #f0f2f5;
  height: 12px;
  border: none;
`;

const ListTabs = [
  {
    index: 1,
    icon: <StarRateRoundedIcon />,
    name: "Starred messages",
    arrow: <KeyboardArrowRightRoundedIcon />,
  },
  {
    index: 2,
    icon: <NotificationsRoundedIcon />,
    name: "Mute notifications",
  },
  {
    index: 3,
    icon: <HistoryToggleOffRoundedIcon />,
    name: "Disappearing messages",
    arrow: <KeyboardArrowRightRoundedIcon />,
  },
  {
    index: 4,
    icon: <HttpsRoundedIcon />,
    name: "Encryption",
  },
];

const ListButton = [
  {
    index: 1,
    icon: <BlockIcon />,
    name: "Block",
  },
  {
    index: 2,
    icon: <ThumbDownRoundedIcon />,
    name: "Report",
  },
  {
    index: 3,
    icon: <DeleteRoundedIcon />,
    name: "Delete ",
  },
];

const PersonDrawer = ({ open, setOpen }) => {
  const { person } = useContext(AccountContext);

  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 1,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        PaperProps={{ sx: drawerStyle }}
        // hideBackdrop={true}
        slotprops={{ invisible: true }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <HeaderWrapper>
          <IconButton onClick={() => setOpen(false)} disableRipple>
            <CloseRoundedIcon sx={{ fontWeight: 600, px: 2 }} />
          </IconButton>
          <Typography sx={{ fontWeight: 500, fontSize: 16 }}>
            Contact info
          </Typography>
        </HeaderWrapper>

        <InfoWrapper>
          <ContactDetails>
            <Box>
              <Image component="img" src={person?.picture} alt="dp" />
            </Box>
            <Typography variant={"h5"}> {person?.name}</Typography>
            <Typography
              component={"p"}
              sx={{
                color: "gray",
              }}
            >
              {" "}
              {person?.email}
            </Typography>
          </ContactDetails>

          <StyledDivider />
          <Box sx={{ mx: 4, my: 2 }}>
            <Typography component={"p"} sx={{ color: "gray" }}>
              About
            </Typography>
            <Typography sx={{ ml: 1, fontSize: 16 }}>
               I TRIED. YOU DIDN'T. I'M DONE. HAVE FUN.
            </Typography>
          </Box>
          <StyledDivider />

          {ListTabs.map((list, index) => (
            <Box sx={{ mx: 4, my: 4, cursor: "pointer" }} key={list.index}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: "slategrey",
                }}
              >
                <Box sx={{ display: "flex" }}>
                  {list.icon}
                  <Typography sx={{ ml: 2 }}>{list.name}</Typography>
                </Box>
                {list.arrow}
              </Box>
            </Box>
          ))}
          <StyledDivider />
          <Box sx={{ my: 2 }}>
            <List sx={{ m: 0, p: 0, color: "red" }}>
              {ListButton.map((item) => (
                <ListItem disablePadding key={item.index}>
                  <ListItemButton>
                    <ListItemIcon sx={{ color: "red" }}>
                      {item.icon}
                    </ListItemIcon>
                    {item.name === "Delete" ? (
                      <ListItemText primary={`${item.name} Chat`} />
                    ) : (
                      <ListItemText primary={`${item.name} ${person.name}`} />
                    )}
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </InfoWrapper>
      </Drawer>
    </>
  );
};

export default PersonDrawer;
