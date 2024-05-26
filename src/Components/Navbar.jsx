import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

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
          >
            {/* Icon content can go here */}
          </IconButton>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <Button color="inherit">Home</Button>
            <Button color="inherit">Add New Product</Button>
          </Box>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default App;
