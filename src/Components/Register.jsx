import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Extract data from the form
    const data = new FormData(event.currentTarget);
    const Username = data.get('email');
    const Password = data.get('password');

    const userCredentials = {
      Username,
      Password
    };

    // Input validation (optional)
    if (!Username || !Password) {
      // Handle missing fields (e.g., display error messages)
      console.error('required fields.');
      return;
    }

    console.log(Username, Password)
    try {
      // Send data to backend using a secure method (e.g., POST)
      const response = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, // Set appropriate headers
        body: JSON.stringify(userCredentials) // Send data in JSON format
      });
      console.log(response)
      // Handle the response from the backend
      if (response.ok) {
        // Successful login (redirect, update UI, etc.)
        console.log('Register successful!');
        navigate('/login');
        // Handle successful login based on your application logic
      } else {
        // Handle login failure (display error messages, etc.)
        const errorData = await response.json();
        console.error('Register failed:', errorData.message || 'Invalid credentials');
        // Display error message to the user
      }
    } catch (error) {
      // Handle network errors or other unexpected issues
      console.error('Error during login:', error);
      // Display a generic error message to the user
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Button
        component={RouterLink}
        to="/"
        sx={{
          position: 'absolute', left: 30, top: 20, transform: 'translate(-10px, 10px)'
        }}
      >
        <ArrowBackIosIcon sx={{ mr: 1 }} />
        <Typography component="h5" variant="h6">
          Back to home page
        </Typography>
      </Button>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Registration Form
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>

          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}