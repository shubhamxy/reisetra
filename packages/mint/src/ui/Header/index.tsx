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
import { useDebouncedCallback } from "use-debounce";
import Menu from "@material-ui/core/Menu";

import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import NightsStay from "@material-ui/icons/NightsStay";
import WbSunny from "@material-ui/icons/WbSunny";


import SearchIcon from "@material-ui/icons/Search";
import { Box, Button, Grid, InputBase } from "@material-ui/core";
import Link from "next/link";
import { logout, useAuthDispatch, useAuthState } from "../../libs/rock/auth";
import { Close, ShoppingCart } from "@material-ui/icons";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import { useCartItems, useGlobalState } from "../../libs";
import { Cart } from "../Cart";
import { Logo } from "../Logo";
import { useRouter } from "next/router";
import { useEffect } from "react";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      zIndex: 100,
      width: "100%",
      top: -1,
      left: 0,
      border: "none",
      right: 0,
      position: "-webkit-sticky",
      // @ts-ignore
      position: "sticky",
      display: "flex",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: fade(theme.palette.background.paper, 0.4),
      backdropFilter: "blur(50px)",
      "@supports (backdrop-filter: none)": {
        boxShadow: "0 2px 8px rgb(0 0 0 / 15%)",
      },
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
      [theme.breakpoints.down("sm")]: {
        paddingLeft: 12,
        paddingRight: 12,
      },
      overflow: "hidden",
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
    menuPaperItem: {
      "&:hover": {
        backgroundColor: "unset",
      },
      [theme.breakpoints.down("sm")]: {
        paddingLeft: 8,
        paddingRight: 8,
      },
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
      backgroundColor: "rgba(15, 15, 15, 0.8)",
    },
    drawer: {
      width: "auto",
    },
    drawerPaper: {
      maxWidth: "30%",
      [theme.breakpoints.down("md")]: {
        maxWidth: "80%",
      },
      [theme.breakpoints.down("sm")]: {
        maxWidth: "94%",
      },
    },
    drawerHeader: {
      position: "sticky",
      top: -1,
      backgroundColor: theme.palette.background.paper,
      transition: theme.transitions.create("height", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      zIndex: 1000,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    search: {
      position: "relative",
      borderRadius: 8,
      transition:
        "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      marginLeft: 16,
      marginRight: 16,
      width: "auto",
      color: theme.palette.text.primary,
      ...theme.typography.caption,
      backgroundColor: fade(theme.palette.common.white, 0.08),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.1),
      },
      [theme.breakpoints.down("sm")]: {
        backgroundColor: fade(theme.palette.common.white, 0.08),
        "&:hover": {
          backgroundColor: fade(theme.palette.common.white, 0.1),
        },
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 1),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      left: "8px",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
      ...theme.typography.caption,
    },
    inputInput: {
      transition: theme.transitions.create(["width", "opacity"]),
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(3.6)}px)`,
      width: "24ch",
      "&:focus": {
        width: "28ch",
      },
      [theme.breakpoints.down("md")]: {
        width: "10ch",
        "&:focus": {
          width: "16ch",
        },
      },
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        "&:focus": {
          width: "100%",
          maxWidth: "50vw",
        },
      },
      [theme.breakpoints.down("xs")]: {
        width: 0,
        opacity: 0,
        "&:focus": {
          opacity: 1,
          width: "100%",
          minWidth: "50vw",
        },
      },
    },
    listitem: {
      "&:hover": {
        boxShadow: `0px 0px 0px 4px ${theme.palette.primary.main}33`,
        backgroundColor: "unset",
      },
    },
  })
);

export function AppHeader() {
  const [open, setOpen] = React.useState(false);
  const [searchText, setSearchText] = useState("");
  const authState = useAuthState();
  const globalState = useGlobalState();
  const router = useRouter();
  const { data: response } = useCartItems(
    authState?.user?.cart.id,
    globalState?.promo || null
  );
  const data = response.data;
  const authDispatch = useAuthDispatch();
  useEffect(() => {
    if (router.query["q"] && searchText === "") {
      setSearchText(router.query["q"] ? (router.query["q"] as string) : "");
    }
  }, [router.query["q"]]);

  const debounced = useDebouncedCallback((value) => {
    const routerObj = {};
    if (router.pathname !== "/products") {
      routerObj["query"] = {};
      routerObj["pathname"] = "/products";
    } else {
      routerObj["query"] = router.query;
    }
    if (!value) {
      delete routerObj["query"]["q"];
    } else {
      routerObj["query"]["q"] = value;
    }
    router.push(routerObj);
  }, 2000);

  const isOpen = Boolean(searchText);

  const classes = useStyles({ isOpen });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [
    mobileMoreAnchorEl,
    setMobileMoreAnchorEl,
  ] = useState<null | HTMLElement>(null);
  const theme = useTheme();
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

  const NavigationMenu = [
    {
      label: "Shop",
      link: "/",
    },
    {
      label: "Stories",
      link: "/stories",
    },
    {
      label: "About",
      link: "/about",
    },
  ];

  const ProfileMenu = [
    {
      label: "Account",
      link: "/account",
    },
    {
      label: "Orders",
      link: "/orders",
    },
    {
      label: "Logout",
      link: "/",
      onClick: () => {
        authDispatch(logout());
      },
    },
  ];
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      getContentAnchorEl={null}
      id={menuId}
      keepMounted={false}
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
      {ProfileMenu.map((item, index) => {
        return (
          <MenuItem
            key={item.label}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleMenuClose();
              item?.onClick?.();
            }}
            className={classes.menuPaperItem}
          >
            <Link href={item.link}>
              <Button
                variant="text"
                color={item.link === router.pathname ? "primary" : "default"}
              >
                {item.label}
              </Button>
            </Link>
          </MenuItem>
        );
      })}
    </Menu>
  );

  const mobileMenuId = "account-menu-mobile";
  const renderProfile = authState?.isAuthenticated ? (
    <MenuItem
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isMobileMenuOpen) {
          handleMobileMenuClose();
        }
        handleProfileMenuOpen(e);
      }}
      className={classes.menuPaperItem}
    >
      <IconButton>
        <Avatar
          style={{
            width: 20,
            height: 20,
            backgroundColor: theme.palette.primary.dark,
          }}
          src={authState?.user?.avatar}
          alt="user avatar"
        >
          <Typography
            variant="caption"
            style={{ lineHeight: 1, color: theme.palette.common.white }}
          >
            {authState?.user?.name?.[0]}
          </Typography>
        </Avatar>
      </IconButton>
    </MenuItem>
  ) : (
    <MenuItem className={classes.menuPaperItem}>
      <Link href="/login">
        <Button variant="contained" color="primary">
          Login
        </Button>
      </Link>
    </MenuItem>
  );
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      getContentAnchorEl={null}
      id={mobileMenuId}
      keepMounted={true}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      classes={{ paper: classes.menuPaper, list: classes.list }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {NavigationMenu.map((item) => (
        <MenuItem className={classes.menuPaperItem} key={item.label}>
          <Link href={item.link}>
            <Button
              variant="text"
              color={item.link === router.pathname ? "primary" : "default"}
            >
              {item.label}
            </Button>
          </Link>
        </MenuItem>
      ))}
    </Menu>
  );
  const renderSearchBar = (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon style={{ height: 16, width: 16 }} />
      </div>
      <InputBase
        placeholder="Search"
        autoFocus={false}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
          debounced(e.target.value);
        }}
        inputProps={{ "aria-label": "search" }}
      />
    </div>
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
            {renderSearchBar}
            <div className={classes.sectionDesktop}>
              {NavigationMenu.map((item) => (
                <MenuItem className={classes.menuPaperItem} key={item.link}>
                  <Link href={item.link}>
                    <Button
                      variant="text"
                      color={
                        item.link === router.pathname ? "primary" : "default"
                      }
                    >
                      {item.label}
                    </Button>
                  </Link>
                </MenuItem>
              ))}
              <MenuItem className={classes.menuPaperItem}>
                <IconButton
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  color="inherit"
                  onClick={open ? handleDrawerClose : handleDrawerOpen}
                  centerRipple={false}
                >
                  <Badge badgeContent={data["items"]?.length} color="primary">
                    <ShoppingCart style={{ width: 20, height: 20 }} />
                  </Badge>
                </IconButton>
              </MenuItem>
              {renderProfile}
            </div>
            <div className={classes.sectionMobile}>
              {renderProfile}
              <MenuItem className={classes.menuPaperItem}>
                <IconButton
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  color="inherit"
                  onClick={open ? handleDrawerClose : handleDrawerOpen}
                  centerRipple={false}
                >
                  <Badge badgeContent={data["items"]?.length} color="primary">
                    <ShoppingCart style={{ width: 20, height: 20 }} />
                  </Badge>
                </IconButton>
              </MenuItem>
              <MenuItem
                onClick={handleMobileMenuOpen}
                className={classes.menuPaperItem}
              >
                <MoreIcon color="action" style={{ height: 20, width: 20 }} />
              </MenuItem>
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
        <Cart handleClose={handleDrawerClose} data={data} />
      </Drawer>
    </>
  );
}
