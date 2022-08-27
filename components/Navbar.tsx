import {
  AppBar,
  Avatar,
  Button,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import useStorage from "hooks/useStorage";
import { useEffect, useState } from "react";
import UserMenu from "./UserMenu";

const Navbar = () => {
  const { getItem, removeItem } = useStorage();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setUser(getItem("userAuth", "local"));
  });

  return (
    <>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{
          borderBottom: (theme: { palette: { divider: string } }) =>
            `2px solid ${theme.palette.divider}`,
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
              href="/historical/USD/EUR"
              sx={{ my: 1, mx: 1.5 }}
            >
              Historical
            </Link>
          </nav>
          {user ? (
            <UserMenu
              handleLogout={removeItem}
              userName={user?.charAt(0).toUpperCase()}
            ></UserMenu>
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
