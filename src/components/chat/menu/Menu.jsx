import React, { useState } from "react";
import Contacts from "./Contacts";
import Header from "./Header";
import SearchBar from "./SearchBar";

const Menu = () => {
  const [text, setText] = useState("");
  return (
    <div>
      <Header />
      <SearchBar setText={setText} />
      <Contacts text={text}/>
    </div>
  );
};

export default Menu;
