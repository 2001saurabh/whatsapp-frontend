import React, { useEffect, useState, useContext, lazy, Suspense } from "react";
import { getUsers } from "../../../service/api";
import { Box, styled } from "@mui/material";
import Spinner from "../../loader/Spinner";
import { AccountContext } from "../../../context/AccountProvider";
const ContactsListItem = lazy(() => import("./ContactsListItem"));


const Component = styled(Box)`
  height: 78vh;
  /* overflow: overlay; */
  margin-top: 5px;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: lightgray;
    border-radius: 6px;
    /* max-height: 10px; */
  }
  &::-webkit-scrollbar-thumb:hover {
    background: dimgray;
  }
`;
const Contact = ({ text }) => {
  const [contacts, setContacts] = useState([]);

  const { account, socket, setActiveUser } = useContext(AccountContext);

  // check here that why sometimes all the users list is not rendering properly
  useEffect(() => {
    const fetchContacts = async () => {
      let res = await getUsers();

      let filterRes = res?.filter((users) =>
        users?.name?.toLowerCase().includes(text?.toLowerCase())
      );

      setContacts(filterRes);
    };

    fetchContacts();
  }, [text]);

  useEffect(() => {
    socket.current.emit("addUsers", account);
    socket.current.on("getUsers", (users) => {
      setActiveUser(users);
    });
  }, [account]);

  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Component>
          {contacts &&
            contacts.map(
              (contact) =>
                contact.sub !== account.sub && (
                  <ContactsListItem
                    contactDetails={contact}
                    key={contact._id}
                  />
                )
            )}
        </Component>
      </Suspense>
    </>
  );
};

export default Contact;
