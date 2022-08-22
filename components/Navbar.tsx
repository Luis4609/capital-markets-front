import {
  AppBar,
  Avatar,
  Button,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../pages/_app";

const Navbar = () => {
  const { user }: any = useContext(UserContext);

  console.log(`User: ${user}`);

  return (
    <>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{
          borderBottom: (theme: { palette: { divider: string } }) =>
            `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            <Link
              variant="button"
              color="inherit"
              underline="none"
              href="/"
              sx={{ my: 1, mx: 1.5, fontSize: "28px" }}
            >
              Capital Markets
            </Link>
          </Typography>
          <nav>
            <Link
              variant="button"
              color="text.primary"
              href="/"
              sx={{ my: 1, mx: 1.5 }}
            >
              Converter
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="/historical/USD/EUR"
              sx={{ my: 1, mx: 1.5 }}
            >
              Historical
            </Link>
          </nav>
          {user ? (
            <Avatar>{user}</Avatar>
          ) : (
            <Button href="/login" variant="contained" sx={{ my: 1, mx: 1.5 }}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
