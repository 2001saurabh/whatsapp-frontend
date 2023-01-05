import { useState, createContext, useRef, useEffect } from "react";
import { io } from "socket.io-client";
export const AccountContext = createContext(null);

const AccountProvider = ({ children }) => {
  const [account, setAccount] = useState();
  const [person, setPerson] = useState({});
  const [activeUser, setActiveUser] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [newMsgFlag, setNewMsgFlag] = useState(false);
  const socket = useRef();

  // const URL = "ws://localhost:9000";

  // const URL = "https://whatsapp-socket.vercel.app";
  const URL = "https://whatsappsocket.onrender.com";

  useEffect(() => {
    socket.current = io(`${URL}`);
  }, []);

  return (
    <AccountContext.Provider
      value={{
        account,
        setAccount,
        person,
        setPerson,
        socket,
        activeUser,
        setActiveUser,
        newMsgFlag,
        setNewMsgFlag,
        openDrawer,
        setOpenDrawer,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
