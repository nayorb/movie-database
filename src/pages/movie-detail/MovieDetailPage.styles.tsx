import { Box, styled } from "@mui/material";

interface PageWrapperProps {
  backgroundUrl: string;
}
const PageWrapper = styled(Box)`
  border-top: 5px solid transparent;
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: ${({ backgroundUrl }: PageWrapperProps) => `url("${backgroundUrl}")`};
  box-shadow: inset 0 0 0 100vh rgba(255, 235, 205, 0.96);
  //box-shadow: inset 0 0 0 100vh blanchedalmond;
  color: ${({ theme }) => theme.palette.primary.main};
`;

const MovieDetailPageComponents: {
  PageWrapper: typeof PageWrapper;
} = {
  PageWrapper,
};

export default MovieDetailPageComponents;
