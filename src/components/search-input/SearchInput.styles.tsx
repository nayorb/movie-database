import { Input, styled } from "@mui/material";

const AppSearchInput = styled(Input, {
  name: "AppSearchInput",
  slot: "Root",
  overridesResolver: (props, styles) => [styles.root],
})``;

const SearchInputComponents: {
  AppSearchInput: typeof AppSearchInput;
} = {
  AppSearchInput,
};

export default SearchInputComponents;
