import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import WarehouseIcon from '@mui/icons-material/Warehouse';

function App() {
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
            disabled 
          >
            <WarehouseIcon/>
          </IconButton>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Link to="/" style={{ color: 'transparent' }}>
            <Button variant ="text" >Home</Button>
          </Link>
          {/* <Link to="/addNewProduct" style={{ color: 'inherit' }}>
            <Button color="inherit">Add New Product</Button>
          </Link> */}
          </Box>
          <Link to="/login" style={{ color: 'inherit' }}>
            <Button variant="contained">Login</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default App;
