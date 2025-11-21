import * as React from 'react';
import { Box, Button, Container, TextField, Typography, Grid } from '@mui/material';

export default function LoginForm() {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',  // Prevent horizontal scroll

      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Grid container alignItems="center">
          {/* โลโก้ */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: { xs: 4, md: 0 },
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <img
                src="TechForge.png"
                alt="TechForge Logo"
                style={{ width: '120%', maxWidth: '500px', height: 'auto' }}
              />
            </Box>
          </Grid>

          {/* ฟอร์ม Login */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              padding: { xs: 2, md: 6 },
              bgcolor: 'background.paper',
              borderRadius: 4,
              boxShadow: 6,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                marginBottom: 3,
                textAlign: 'center',
                height: { xs: '100px', sm: 'auto' },
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                Welcome to TechForge
              </Typography>
            </Box>
            {/* ฟอร์ม Login */}
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { marginBottom: 2 },
                width: '100%',
              }}
            >
              <TextField
                fullWidth
                label="Email"
                type="email"
                variant="outlined"
                required
                sx={{ bgcolor: 'background.default', borderRadius: 2 }} // Increased border-radius
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                required
                sx={{ bgcolor: 'background.default', borderRadius: 2 }} // Increased border-radius
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  padding: 1.5,
                  fontWeight: 'bold',
                  borderRadius: 3, // Adjusted border-radius for the button
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': { bgcolor: 'primary.dark' },
                }}
              >
                Login
              </Button>
            </Box>
            {/* ลิงก์เพิ่มเติม */}
            <Typography variant="body2" sx={{ marginTop: 3, color: 'text.secondary' }}>
              Don't have an account?{' '}
              <a
                href="/register"
                style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 'bold' }}
              >
                Sign up
              </a>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
