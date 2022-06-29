import { styled } from "@mui/material";

const Wrapper = styled("div")`
  display: flex;
  margin-top: auto;
  position: fixed;
  bottom: 16px;
  left: 16px;
  align-items: center;
`;

const HeaderComponents: {
  Wrapper: typeof Wrapper;
} = {
  Wrapper,
};

export default HeaderComponents;
