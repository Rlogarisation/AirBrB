import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

const NavBarGoHome = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <div>
              <Link href='' color='inherit' onClick={ () => navigate('/') }>
                { 'Go Home' }
              </Link>
          </div>
          <Typography variant="h6" component="div" sx={{ flexGrow: 0.95 }}>
            AirBrB
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBarGoHome;
