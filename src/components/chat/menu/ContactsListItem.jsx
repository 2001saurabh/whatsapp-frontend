import React, { useContext, useEffect } from "react";
import { List, Box, styled, Skeleton } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ListItemButton from "@mui/material/ListItemButton";
import { AccountContext } from "../../../context/AccountProvider";
import { setConversation, getConversation } from "../../../service/api";
import { useState } from "react";
import moment from "moment";

import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
const TimeText = styled(Typography)`
  font-size: 12px;
  color: gray;
`;

// const Container = styled(Box)`
//   display: flex;
// `;
// const Text = styled(Typography)`
//   display: block;
//   color: rgba(0, 0, 0, 0.6);
//   font-size: 14px;
//   max-width: 100%;
//   text-overflow: ellipsis;
//   overflow: hidden;
// `;

const Media = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <InsertDriveFileRoundedIcon
        sx={{ mr: 1, fontSize: "20px", color: "text.secondary" }}
      />
      <Typography variant="body2" color="text.secondary">
        media
      </Typography>
    </Box>
  );
};
const ContactsListItem = ({ contactDetails }) => {
  const { account, person, setPerson, newMsgFlag } = useContext(AccountContext);
  const [latestMsg, setLatestMsg] = useState({});

  useEffect(() => {
    const getConversationDetails = async () => {
      const data = await getConversation({
        senderId: account?.sub,
        receiverId: contactDetails?.sub,
      });
      setLatestMsg({ text: data?.message, timestamp: data?.updatedAt });
    };
    getConversationDetails();
  }, [newMsgFlag]);

  const getUser = async (e) => {
    // e.preventDefault();
    setPerson(contactDetails);

    await setConversation({ senderId: account?.sub, receiverId: person?.sub });
  };

  return (
    <>
      {latestMsg && contactDetails && (
        <List
          sx={{
            width: "100%",
            m: 0,
            p: 0,
            cursor: "pointer",
          }}
        >
          <ListItem alignItems="flex-start" sx={{ pl: 0, pr: "6px", py: 0 }}>
            <ListItemButton onClick={(e) => getUser()} sx={{ display: "flex" }}>
              <ListItemAvatar>
                <Avatar
                  src={contactDetails.picture}
                  sx={{ width: 48, height: 48 }}
                  alt="contact"
                />
              </ListItemAvatar>

              <Box
                sx={{
                  ml: 1,
                  width: "100%",
                  p: 0,
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    m: 0,
                    p: 0,
                    justifyContent: "space-between",
                    whiteSpace: "noWrap",
                  }}
                >
                  <Typography>{contactDetails.name}</Typography>

                  <TimeText>
                    {latestMsg?.text &&
                      moment(latestMsg?.timestamp).format("LT").toLowerCase()}
                  </TimeText>
                </Box>
                <Box
                  sx={{
                    whiteSpace: "noWrap",
                    width: "98%",
                  }}
                >
                  <Typography
                    sx={{
                      display: "block",
                      maxWidth: "100%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",

                      mt: 1,
                    }}
                    component={"span"}
                    variant="body2"
                    color="text.secondary"
                  >
                    {latestMsg?.text?.includes("whatsapp-backend-ten") ? (
                      <Media />
                    ) : (
                      latestMsg.text
                    )}
                  </Typography>
                </Box>
              </Box>
            </ListItemButton>
          </ListItem>
        </List>
      )}

      <Divider
        variant="inset"
        sx={{ backgroundColor: "#e9edef", opacity: "0.6" }}
      />
    </>
  );
};

export default ContactsListItem;
