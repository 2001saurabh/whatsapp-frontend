import React, { useContext, useState } from "react";
import { Avatar, Box, styled, Button } from "@mui/material";
import { AccountContext } from "../../../context/AccountProvider";
import HeaderButton from "./HeaderButton";
import ProfileDrawer from "../../drawer/ProfileDrawer";

const HeaderWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 44px;
  background-color: #f0f2f5;

  padding: 8px 16px;
`;

const IconWrapper = styled(Box)`
  & > * {
    margin-left: 13px;
    color: #5b6b75;
  }
`;
const Header = () => {
  const { account } = useContext(AccountContext);
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawer = (e) => {
    return setOpenDrawer(true);
  };

  return (
    <>
      <HeaderWrapper>
        <Avatar
          srcSet={account.picture}
          sx={{ bgcolor: "darkcyan", cursor: "pointer" }}
          alt="Profile"
          onClick={() => handleDrawer()}
        />

        <IconWrapper>
          <HeaderButton />
        </IconWrapper>
      </HeaderWrapper>
      <ProfileDrawer open={openDrawer} setOpen={setOpenDrawer} />
    </>
  );
};

export default Header;
