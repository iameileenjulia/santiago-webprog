// DashLayout.jsx
import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { styled, useTheme, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ArticleIcon from "@mui/icons-material/Article";
import Button from "@mui/material/Button";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import Avatar from "@mui/material/Avatar";
import { useAuth } from "../assets/context/AuthContext";

const drawerWidth = 240;

const allNavItems = [
  { label: "Dashboard", title: "Dashboard", to: "/dashboard",          icon: DashboardIcon, roles: ['admin', 'editor'] },
  { label: "Reports",   title: "Reports",   to: "/dashboard/reports",  icon: AssessmentIcon, roles: ['admin', 'editor'] },
  { label: "Articles",  title: "Articles",  to: "/dashboard/articles", icon: ArticleIcon,    roles: ['admin', 'editor'] },
  { label: "Users",     title: "Users",     to: "/dashboard/users",    icon: PeopleIcon,     roles: ['admin'] },
];

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  background: "linear-gradient(135deg, #18181b 0%, #27272a 100%)",
  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const drawerPaperBase = {
  backgroundColor: "#fafafa",
  borderRight: "1px solid #e4e4e7",
  boxShadow: "2px 0 12px rgba(0,0,0,0.03)",
};

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": { ...openedMixin(theme), ...drawerPaperBase },
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": { ...closedMixin(theme), ...drawerPaperBase },
  }),
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#a1a1aa",
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "40px",
  backgroundColor: alpha(theme.palette.common.white, 0.12),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.2),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const getPageTitle = (pathname) =>
  allNavItems.find(({ to }) => to === pathname)?.title ?? "Overview";

const DashLayout = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const userType = localStorage.getItem('type');
  const dashboardNavItems = allNavItems.filter(item => item.roles.includes(userType));

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const handleLogout = () => {
    signOut();
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex", bgcolor: "#f4f4f5" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ gap: 1 }}>
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            onClick={open ? handleDrawerClose : handleDrawerOpen}
            edge="start"
            sx={{ 
              mr: 2,
              backgroundColor: alpha(theme.palette.common.white, 0.08),
              "&:hover": { backgroundColor: alpha(theme.palette.common.white, 0.2) }
            }}
          >
            {open ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 500, letterSpacing: "-0.01em" }}>
            {pageTitle}
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} />
          </Search>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center", gap: 1 }}>
              <Avatar sx={{ width: 32, height: 32, bgcolor: "#10b981", fontSize: "0.9rem" }}>
                {user?.firstName?.charAt(0) || "U"}
              </Avatar>
              <Typography variant="body2" sx={{ color: "#e4e4e7" }}>{user?.firstName || "User"}</Typography>
            </Box>
            <Button 
              variant="outlined" 
              onClick={handleLogout}
              sx={{ 
                borderColor: alpha(theme.palette.common.white, 0.4),
                color: "white",
                borderRadius: "40px",
                textTransform: "none",
                px: 2,
                "&:hover": { borderColor: "white", backgroundColor: alpha(theme.palette.common.white, 0.1) }
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Box sx={{ flex: 1, pl: open ? 2 : 0, display: "flex", justifyContent: open ? "flex-start" : "center" }}>
            {open && (
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "#10b981", letterSpacing: "0.5px" }}>
                ARQTEK DASH
              </Typography>
            )}
          </Box>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider sx={{ borderColor: "#e4e4e7" }} />
        <List>
          {dashboardNavItems.map(({ label, to, icon: Icon }) => (
            <ListItem key={to} disablePadding sx={{ display: "block", mb: 0.5 }}>
              <ListItemButton
                component={Link}
                to={to}
                selected={location.pathname === to}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  justifyContent: open ? "initial" : "center",
                  borderRadius: "12px",
                  mx: 1,
                  "&.Mui-selected": {
                    backgroundColor: "#10b98120",
                    color: "#10b981",
                    "&:hover": { backgroundColor: "#10b98130" },
                    "& .MuiListItemIcon-root": { color: "#10b981" },
                  },
                  "&:hover": {
                    backgroundColor: "#f1f5f9",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: location.pathname === to ? "#10b981" : "#71717a",
                  }}
                >
                  <Icon />
                </ListItemIcon>
                <ListItemText 
                  primary={label} 
                  sx={{ 
                    opacity: open ? 1 : 0,
                    "& .MuiTypography-root": { fontWeight: 500, fontSize: "0.9rem" }
                  }} 
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashLayout;