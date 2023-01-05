import React, { useRef, useState } from "react";
import { Box, styled } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

const SearchWrapper = styled(Box)`
  display: flex;
  height: 35px;
  padding: 8px 12px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f2f2f2;
  & > * {
    padding-left: 8px;
  }
`;
const SearchInput = styled(Box)`
  flex-grow: 1;
  height: 75%;
  padding: 4px 4px;
  display: flex;
  background-color: #f0f2f5;
  border-radius: 8px;
  align-items: center;
  width: 400;
`;
const SearchBar = ({ setText }) => {
  const [doSearch, setDoSearch] = useState(true);

  const handleSearchIcon = (e) => {
    e.preventDefault();
    setDoSearch(!doSearch);
  };

  return (
    <>
      <SearchWrapper>
        <SearchInput>
          <IconButton
            type="button"
            disableRipple
            sx={{ p: "10px" }}
            aria-label="search"
            onClick={handleSearchIcon}
          >
            {doSearch ? (
              <SearchRoundedIcon fontSize="small" sx={{ color: "#54656f" }} />
            ) : (
              <ArrowBackRoundedIcon
                fontSize="small"
                sx={{ color: "#00a783" }}
              />
            )}
          </IconButton>
          <InputBase
            sx={{ mr: 1, flex: 1 }}
            placeholder="Search or start a new chat "
            inputProps={{ "aria-label": "Search or start a new chat" }}
            onChange={(e) => setText(e.target.value)}
          />
        </SearchInput>
        <Box>
          <FilterListRoundedIcon sx={{ color: "#54656f", cursor: "pointer" }} />
        </Box>
      </SearchWrapper>
    </>
  );
};

export default SearchBar;
