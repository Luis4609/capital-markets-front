import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookSharpIcon from "@mui/icons-material/FacebookSharp";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}
      <Link color="inherit" href="/">
        Capital Markets
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Footer = () => {
  return (
    <>
      <CssBaseline />
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Link color="inherit" href="https://www.instagram.com/">
          <InstagramIcon></InstagramIcon>
        </Link>
        <Link color="inherit" href="https://twitter.com/?lang=en">
          <TwitterIcon></TwitterIcon>
        </Link>{" "}
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
