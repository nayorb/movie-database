import React from "react";
import { ButtonBase, Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import SearchInputComponents from "./SearchInput.styles";

export interface SearchInputProps {
  onInputChange(value: string): void;
  value: string;
  onSearchClick(): void;
  searchButtonDisabled: boolean;
}

const SearchInput = ({ onInputChange, value, onSearchClick, searchButtonDisabled }: SearchInputProps) => {
  return (
    <Grid container flexWrap="nowrap">
      <SearchInputComponents.AppSearchInput
        sx={{ marginRight: 1 }}
        onChange={(e) => onInputChange(e.target.value)}
        value={value}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearchClick();
          }
        }}
        startAdornment={<SearchIcon />}
        endAdornment={
          <ButtonBase onClick={onSearchClick} disabled={searchButtonDisabled}>
            <ArrowCircleRightIcon
              sx={{
                width: 36,
                height: 36,
              }}
            />
          </ButtonBase>
        }
      />
    </Grid>
  );
};

export default SearchInput;
