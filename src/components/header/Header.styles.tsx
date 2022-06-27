import { Button, styled, useTheme } from "@mui/material";

const HeaderWrapper = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
`;

const LinkButton = styled(Button)`
  height: 80px;
  box-shadow: ${({ active }: { active: boolean }) => {
    const theme = useTheme();
    return active ? `inset 0 5px 0 0 ${theme.palette.secondary.main}` : "none";
  }};
  border-style: solid;
  border-color: ${({ theme }) => theme.palette.secondary.main};
  border-radius: 0;
`;

const HeaderComponents: {
  HeaderWrapper: typeof HeaderWrapper;
  LinkButton: typeof LinkButton;
} = {
  HeaderWrapper,
  LinkButton,
};

export default HeaderComponents;
