import { AppBar, Link, Toolbar, Typography } from "@mui/material";
import { useRouter } from "next/router";

const NavbarLogin = () => {
  const router = useRouter();
  const actualPage: string = router.asPath;

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
            {/* {actualPage == "/login" || actualPage == "/register" ? null : (
              <>
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
              </>
            )} */}
          </nav>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavbarLogin;
