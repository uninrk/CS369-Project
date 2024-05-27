import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/');
    window.location.reload();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Apply shadow to the AppBar using sx prop */}
      <AppBar position="static" color="transparent" sx={{ boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {/* Icon here */}
          </IconButton>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <Link to="/" style={{ color: 'transparent' }}>
              <Button variant="text" >Home</Button>
            </Link>
            <Link to="/addNewProduct" style={{ color: 'inherit' }}>
              <Button color="inherit">Add New Product</Button>
            </Link>
          </Box>
          <Link to="/" style={{ color: 'inherit' }}>
            <Button onClick={handleLogout} variant="contained">Logout</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default App;
