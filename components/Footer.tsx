import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import Copyright from "./Copyright";
import SocialLinks from "./SocialLinks";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 5,
        px: 3,
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <Link href="/" color="inherit" underline="none">
          <Typography variant="h5">Capital Markets</Typography>
        </Link>
        <SocialLinks />
        <Copyright />
      </Container>
    </Box>
  );
};

export default Footer;
