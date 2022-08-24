import { AppBar, Avatar, Button, Link, Toolbar, Typography } from "@mui/material";
import { UserContext } from "context/AuthUserContext";
import { useContext } from "react";

const Navbar = () => {
  const { user } = useContext(UserContext);

  console.log("USER: ", user)

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
            <Avatar>{user.name}</Avatar>
          ) : (
            <Button href="/login" variant="contained" sx={{ my: 1, mx: 1.5 }}>
              Login
            </Button>
          )}
          {/* <Button href="/login" variant="contained" sx={{ my: 1, mx: 1.5 }}>
            Login
          </Button> */}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
