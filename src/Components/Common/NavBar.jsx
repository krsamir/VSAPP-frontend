import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useCookies } from "./hooks/useCookies";
import { ROLES } from "../../Utilities/Constant";
import { useNavigate } from "react-router-dom";
import { ROUTES_PATH, parsedRoute } from "../../Utilities/Routes-config";

export default function NavBar({ handleDrawer, role }) {
  const { removeCookies } = useCookies();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => removeCookies();

  const handleHomeRedirection = () => {
    switch (role) {
      case ROLES.SUPER_ADMIN.NAME:
        navigate(parsedRoute([ROUTES_PATH.SUPER_ADMIN.ROOT]));
        break;
      case ROLES.ADMIN.NAME:
        navigate(parsedRoute([ROUTES_PATH.ADMIN.ROOT]));
        break;
      case ROLES.USER.NAME:
        navigate(parsedRoute([]));
        break;
      default:
        navigate(parsedRoute([ROUTES_PATH.LOGIN]));
        break;
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          {(role === ROLES.SUPER_ADMIN.NAME || role === ROLES.ADMIN.NAME) && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => handleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={handleHomeRedirection}
          >
            MY SHOP
          </Typography>
          {
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}

NavBar.propTypes = {
  handleDrawer: PropTypes.func,
  role: PropTypes.string,
};

NavBar.defaultProps = {
  handleDrawer: () => null,
  role: "",
};
