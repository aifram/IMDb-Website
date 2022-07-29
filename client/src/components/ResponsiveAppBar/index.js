import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import history from "../Navigation/history";

// const pages = ["Landing", "Search", "Reviews", "MyPage"];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const ResponsiveAppBar = () => {

  return (
    <AppBar position="static" style={{backgroundColor:'red'}}>
      <Container maxWidth="xl" >
        <Toolbar disableGutters >
          <Link
            color="inherit"
            style={{ cursor: "pointer" }}
            onClick={() => history.push("/")}
          >
            <Typography variant="h11" color="inherit" noWrap>
              AIfram's IMDB
            </Typography>
          </Link>

          <Link
            color="inherit"
            style={{ cursor: "pointer" }}
            onClick={() => history.push("/Reviews")}
          >
            <Typography variant="h11" color="inherit" noWrap>
              __________________Review__________________
            </Typography>
          </Link>

          <Link
            color="inherit"
            style={{ cursor: "pointer" }}
            onClick={() => history.push("/Search")}
          >
            <Typography variant="h11" color="inherit" noWrap>
              Search__________________
            </Typography>
          </Link>

          <Link
            color="inherit"
            style={{ cursor: "pointer" }}
            onClick={() => history.push("/MyPage")}
          >
            <Typography variant="h11" color="inherit" noWrap>
              MyPage
            </Typography>
          </Link>

          {/* <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}

          {/* <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
