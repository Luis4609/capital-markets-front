import Link from "@mui/material/Link";
import FacebookSharpIcon from "@mui/icons-material/FacebookSharp";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Container } from "@mui/system";

function SocialLinks() {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
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
    </Container>
  );
}

export default SocialLinks;
