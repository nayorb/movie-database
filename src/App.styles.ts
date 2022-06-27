import { styled } from "@mui/material";

const AppWrapper = styled("div")`
  background-color: rgba(255, 235, 205, 0.96);
  background-image: ${`url("/images/background.jpg")`};
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
  box-shadow: ${({ theme }) =>
    `inset 0 0 0 100vh rgba(255, 235, 205, 0.95), inset 0 5px 0 0 ${theme.palette.primary.dark}`};
`;

const AppComponents: {
  AppWrapper: typeof AppWrapper;
} = {
  AppWrapper,
};

export default AppComponents;
