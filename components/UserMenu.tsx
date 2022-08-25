import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import useStorage from "hooks/useStorage";
import router from "next/router";
import { Avatar } from "@mui/material";
import { blue } from "@mui/material/colors";

interface IUserMenu {
  handleLogout?: any;
  userName: string;
}

export default function UserMenu({ handleLogout, userName }: IUserMenu) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { removeItem } = useStorage();

  const handleLogout2 = () => {
    removeItem("userAuth", "local");
    router.push("/");
  };

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Avatar sx={{ bgcolor: blue[500] }}>{userName}</Avatar>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem> */}
        <MenuItem onClick={handleLogout2}>Logout</MenuItem>
      </Menu>
    </>
  );
}
