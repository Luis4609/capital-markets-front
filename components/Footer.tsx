import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import FacebookSharpIcon from "@mui/icons-material/FacebookSharp";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import Copyright from "./Copyright";

const Footer = () => {
  return (
    <>
      <Box
        component="footer"
        sx={{
          py: 5,
          px: 3,
          mt: "auto",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
          display: "flex"    
        }}
      >
        <Link color="inherit" href="https://www.instagram.com/">
          <InstagramIcon></InstagramIcon>
        </Link>
        <Link color="inherit" href="https://twitter.com/?lang=en">
          <TwitterIcon></TwitterIcon>
        </Link>
        <Link color="inherit" href="https://www.facebook.com/">
          <FacebookSharpIcon></FacebookSharpIcon>
        </Link>
        <Container maxWidth="sm">
          <Typography variant="body1">Company information: About us</Typography>
          <Copyright />
        </Container>
      </Box>
    </>
  );
};

export default Footer;
