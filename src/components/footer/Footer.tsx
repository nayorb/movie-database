import React from "react";
import { Box, Link, Typography } from "@mui/material";
import FooterComponents from "./Footer.styles";

const Footer = () => {
  return (
    <FooterComponents.Wrapper>
      <Typography>@ Slavomir Belay 2022</Typography>
      <Box ml={4}>
        <Typography>Github repository:</Typography>
      </Box>
      <Box ml={1}>
        <Link href="https://github.com/nayorb/movie-database">https://github.com/nayorb/movie-database</Link>
      </Box>
    </FooterComponents.Wrapper>
  );
};

export default Footer;
