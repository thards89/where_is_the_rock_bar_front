import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/user/selectors";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {GiMusicalNotes} from 'react-icons/gi'



const themeTitle = createTheme({
  typography: {
    fontSize: "16",
    fontFamily: ["Great Vibes", "cursive"].join(","),
  },
});

const ResponsiveAppBar = () => {
  const token = useSelector(selectToken);
  const navigate = useNavigate();

  const loginLogoutControls = token ? <LoggedIn /> : <LoggedOut />;

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigateHomePage = () => {
    setAnchorElNav(navigate("/"));
  };

  const navigateSeeBlogs = () => {
    setAnchorElNav(navigate("/blogs"));
  };

  const navigateREgisterBlog = () => {
    setAnchorElNav(navigate("/blogs/createblog"));
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor:"rgb(39 39 42)"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ThemeProvider theme={themeTitle}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
             Where is The Rock Bar?<GiMusicalNotes className="navIcon"/>
            </Typography>
          </ThemeProvider>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={navigateHomePage}>
                <Typography textAlign="center">Home</Typography>
              </MenuItem>
              <MenuItem onClick={navigateSeeBlogs}>
                <Typography textAlign="center">Blogs</Typography>
              </MenuItem>
              {token? 
              <MenuItem onClick={navigateREgisterBlog}>
                <Typography textAlign="center">Create a Blog</Typography>
              </MenuItem>
              : null}
            </Menu>
          </Box>
          <ThemeProvider theme={themeTitle}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 2,
                lineHeight: 1,
                fontSize: 18,
                display: { xs: "flex", md: "none" },
              }}
            >
            Where is the Rock Bar{''}{''}
            </Typography>
          </ThemeProvider>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={navigateHomePage}
              sx={{ my: 2, color: "white", display: "block" }}
            >
             <b> Home</b>
            </Button>
         
              <Button
                onClick={navigateSeeBlogs}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <b>Blogs</b>
              </Button>
              {token ? 
              <Button
                onClick={navigateREgisterBlog}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <b>Create a Blog</b>
              </Button>
          : null }
          </Box>

          <Box sx={{ flexGrow: 0, width: "220px" }}>
            {loginLogoutControls}
            <Menu
              sx={{ mt: "40px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "right",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            ></Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
