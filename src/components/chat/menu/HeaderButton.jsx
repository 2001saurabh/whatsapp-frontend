import React, { useState, useContext } from "react";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import DonutLargeRoundedIcon from "@mui/icons-material/DonutLargeRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { AccountContext } from "../../../context/AccountProvider";
import SettingDrawer from "../../drawer/SettingDrawer";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 6,
    top: 2,
    padding: "0 4px",
  },
}));

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 13,
  },
}));

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 200,

    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "8px 0px",
      color: "#68737b",
      fontSize: "12px",
    },
    "& .MuiMenuItem-root": {
      padding: "10px",
      "& .MuiSvgIcon-root": {
        fontSize: 16,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

function HeaderMenu() {
  const [openSettingDrawer, setOpenSettingDrawer] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const { account } = useContext(AccountContext);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = (e) => {
    document.location.href = "https://whatsapp-clone-frontend-project.vercel.app/";
  };

  const handleSettingDrawer = (e) => {
    setOpenSettingDrawer(true);
    setAnchorEl(null);
    return;
  };

  return (
    <>
      <LightTooltip disableFocusListener disableTouchListener title="Menu">
        <IconButton
          aria-label="more"
          id="demo-customized-button"
          aria-controls={open ? "demo-customized-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          variant="contained"
          onClick={handleClick}
        >
          <MoreVertRoundedIcon />
        </IconButton>
      </LightTooltip>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} disableRipple>
          New group
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          Starred messages
        </MenuItem>
        <MenuItem onClick={handleSettingDrawer} disableRipple>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout} disableRipple>
          Log out
        </MenuItem>
      </StyledMenu>
      <SettingDrawer open={openSettingDrawer} setOpen={setOpenSettingDrawer} />
    </>
  );
}

export default function HeaderButton() {
  return (
    <>
      <LightTooltip disableFocusListener disableTouchListener title="Status">
        <IconButton aria-label="status">
          <StyledBadge variant="dot" color="success">
            <DonutLargeRoundedIcon color="action" />
          </StyledBadge>
        </IconButton>
      </LightTooltip>
      <LightTooltip disableFocusListener disableTouchListener title="New chat">
        <IconButton aria-label="chat">
          <ChatRoundedIcon />
        </IconButton>
      </LightTooltip>
      <HeaderMenu />
    </>
  );
}
