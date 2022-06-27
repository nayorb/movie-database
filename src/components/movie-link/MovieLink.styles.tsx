import { ButtonBase, styled } from "@mui/material";

const MovieLinkWrapper = styled(ButtonBase)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 8px 16px;
  border: 1px solid;
  border-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.main};
  border-radius: 4px;

  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.light};
  }
`;

const MovieLinkComponents: {
  MovieLinkWrapper: typeof MovieLinkWrapper;
} = {
  MovieLinkWrapper,
};

export default MovieLinkComponents;
