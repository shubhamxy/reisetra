import React, { useState } from "react";
import {
  fade,
  makeStyles,
  Theme,
  createStyles,
  useTheme,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/Avatar";

import Menu from "@material-ui/core/Menu";
import { useDebouncedCallback } from "use-debounce";

import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Link,
  Grid,
} from "@material-ui/core";
import { Image } from "../Image";
import { logout, useAuthDispatch, useAuthState } from "../../libs/rock/auth";
import { Close, ShoppingCart } from "@material-ui/icons";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import { useCartItems } from "../../libs";
import { Footer, List } from '../List';
import { getTotalCount, getTotalDataCount } from "../../libs/rock/utils/data";
import { Cart } from "../Cart";
import { Logo } from "../Logo";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      zIndex: 100,
      width: "100%",
      top: -1,
      left: 0,
      border: "none",
      right: 0,
      position: "sticky",
      display: "flex",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: fade(theme.palette.background.default, 0.4),
      backdropFilter: "blur(50px)",
      boxShadow: "0 2px 8px rgb(0 0 0 / 15%)",
      maxHeight: "100px",
      transition: "all ease 0.2s",
    },
    flex1: {
      flex: 1,
    },
    appBar: {
      paddingLeft: 24,
      paddingRight: 24,
      maxWidth: theme.breakpoints.width("lg"),
      display: "flex",
      flex: 1,
      color: theme.palette.primary.main,
      backgroundColor: "transparent",
      boxShadow: "none",
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    menuPaper: {
      display: "flex",
      flexDirection: "column",
      flex: 1,
      margin: 0,
      padding: "0px 20px 10px 20px",
      border: "none",
      boxShadow: "unset",
      background: "transparent",
      overflow: "hidden",
    },
    list: {
      background: theme.palette.background.paper,
      minWidth: 100,
      margin: 0,
      marginTop: 8,
      borderRadius: 8,
      padding: 0,
      justifyContent: "center",
      alignItems: "center",
      "&::before": {
        content: "''",
        position: "absolute",
        height: "12px",
        width: "12px",
        top: 0,
        left: 0,
        right: "12px",
        margin: "0 auto",
        // left: 'calc(50% - 10px)',
        background: "inherit",
        transform: "translateX(50%) translateY(-50%) rotate(45deg)",
        borderTopLeftRadius: "40%",
        borderTop: "1px solid rgba(175, 175, 175, 0.1)",
        borderLeft: "1px solid rgba(175, 175, 175, 0.1)",
      },
    },
    backdrop: {
      zIndex: theme.zIndex.drawer - 1,
      backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
    drawer: {
      width: "auto",
    },
    drawerPaper: {
      maxWidth: "30%",
      [theme.breakpoints.down("md")]: {
        maxWidth: "40%",
      },
      [theme.breakpoints.down("sm")]: {
        maxWidth: "50%",
      },
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-start",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
  })
);

const NavigationLinks = {};

export function AppHeader() {
  const [open, setOpen] = React.useState(false);
  const [searchText, setSearchText] = useState("");
  const authState = useAuthState();
  const {data: response} = useCartItems(authState?.user?.cart.id);
  const data = response.data;
  const authDispatch = useAuthDispatch();
  const debounced = useDebouncedCallback((value) => {
    setSearchText(value);
  }, 1000);

  const isOpen = Boolean(searchText);

  const classes = useStyles({ isOpen });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [
    mobileMoreAnchorEl,
    setMobileMoreAnchorEl,
  ] = useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      getContentAnchorEl={null}
      id={menuId}
      keepMounted
      classes={{ paper: classes.menuPaper, list: classes.list }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link href="/account" underline={"none"} color="textPrimary">
          <Typography variant="caption">Account</Typography>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link href="/orders" underline={"none"} color="textPrimary">
          <Typography variant="caption">Orders</Typography>
        </Link>
      </MenuItem>
      <MenuItem
        onClick={() => {
          authDispatch(logout());
        }}
      >
        <Typography variant="caption">Logout</Typography>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <CssBaseline />
      <header className={classes.container}>
        <AppBar component="div" position="sticky" className={classes.appBar}>
          <Toolbar>
            <Logo />
            <div className={classes.flex1} />
            <div className={classes.sectionDesktop}>
              <Button href="/" variant="text" color={"primary"}>
                Shop
              </Button>
              <Button href="/stories" variant="text">
                Stories
              </Button>
              <Button href="/about" variant="text">
                About
              </Button>

              <IconButton
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                color="inherit"
                onClick={open ? handleDrawerClose : handleDrawerOpen}
                centerRipple={false}
              >
                <Badge badgeContent={data['items']?.length} color="primary">
                  <ShoppingCart style={{ width: 20, height: 20 }} />
                </Badge>
              </IconButton>
              <Box
                pl={0.8}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {authState?.isAuthenticated ? (
                  <IconButton
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                  >
                    {authState?.user?.avatar ? (
                      <Avatar
                        style={{ width: 20, height: 20 }}
                        src={authState?.user?.avatar}
                        alt="user avatar"
                      />
                    ) : (
                      <AccountCircle style={{ width: 20, height: 20 }} />
                    )}
                  </IconButton>
                ) : (
                  <Button href="/login" variant="contained" color="primary">
                    Login
                  </Button>
                )}
              </Box>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </header>
      <Drawer
        className={classes.drawer}
        variant="temporary"
        anchor="right"
        onBackdropClick={handleDrawerClose}
        open={open}
        BackdropProps={{
          className: classes.backdrop,
        }}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Grid item className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <Close />
          </IconButton>
        </Grid>
        <Divider />
        <Cart data={data} />
      </Drawer>
    </>
  );
}
