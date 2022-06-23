import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { styled, alpha } from '@mui/material/styles';
import SearchField from './SearchField';

const NavBar = ({ searchBar }) => {
  const isLogin = localStorage.getItem('isLogin') === 'true';
  const [showLogout, setShowLogout] = React.useState(isLogin);

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    localStorage.setItem('isLogin', 'false');
    setShowLogout(!showLogout);
    navigate('/');
  }

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(SearchField)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            data-testid="NavBarTitle"
            variant='h6'
            component='div'
            sx={{ flexGrow: 1 }}
          >
            AirBrB
          </Typography>
          { searchBar && <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase/>
          </Search> }

          <div>
            <IconButton
              data-testid = 'signInIcon'
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
              anchorEl={ anchorEl }
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={ Boolean(anchorEl) }
              onClose={ handleClose }
            >
            { /* if current user is not logged in, then render the login and register options */ }
            { !showLogout && (
              <>
                <MenuItem onClick={ () => navigate('/login') }>Log in</MenuItem>
                <MenuItem onClick={ () => navigate('/register') }>Register</MenuItem>
              </>
            )}
            { /* if current user is logged in, then render the logout and check-user-account options */ }
            { showLogout && (
              <>
                <MenuItem onClick={ () => navigate('/myListings') }>My listings</MenuItem>
                <MenuItem onClick={ () => handleLogout() }>Log out</MenuItem>
              </>
            )}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

NavBar.propTypes = {
  searchBar: PropTypes.bool,
}

export default NavBar
