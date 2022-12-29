import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";

export default function LeftDrawer({
  isOpened,
  slideDrawer,
  leftDrawerData = [],
}) {
  const navigate = useNavigate();

  const handleRedirect = useCallback((path) => navigate(path), [navigate]);

  const toggleDrawer = useCallback(
    (open) => (event) => {
      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }
      slideDrawer(open);
    },
    [slideDrawer]
  );

  const list = useMemo(
    () => (
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          {leftDrawerData.map(({ id, name, redirect, icon }) => (
            <div key={id}>
              <ListItem
                disablePadding
                onClick={() => {
                  toggleDrawer(false);
                  setTimeout(() => {
                    handleRedirect(redirect);
                  }, 500);
                }}
              >
                <ListItemButton>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={name} />
                </ListItemButton>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </Box>
    ),
    [handleRedirect, leftDrawerData, toggleDrawer]
  );

  return (
    <div>
      <React.Fragment>
        <Drawer anchor={"right"} open={isOpened} onClose={toggleDrawer(false)}>
          {list}
        </Drawer>
      </React.Fragment>
    </div>
  );
}

LeftDrawer.propTypes = {
  isOpened: PropTypes.bool,
  slideDrawer: PropTypes.func,
  leftDrawerData: PropTypes.array,
};

LeftDrawer.defaultProps = {
  isOpened: false,
  slideDrawer: () => null,
  leftDrawerData: [],
};
