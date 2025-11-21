import * as React from 'react';
import { useNavigate } from 'react-router-dom'; 
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function CardRemainingLeaveDays() {
  const navigate = useNavigate();

  const handleAddLeaveClick = () => {
    navigate('/add-leave'); // Corrected navigation path
  };

  return (
    <Card
      sx={{
        backgroundImage: 'linear-gradient(to right,rgb(59, 255, 89),rgb(108, 255, 130),rgb(188, 253, 198))', // Gradient background
        color: '#fff', // White text color
        border: '1px solid #00c853', // Border color to match gradient
        borderRadius: '12px', // Rounded corners
        '&:hover': {
          backgroundImage: 'linear-gradient(to right,rgb(59, 255, 89),rgb(59, 255, 89))', // Smooth hover effect
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)', // Slight shadow on hover
        },
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease', // Smooth transition
        mb: 3.5,
      }}
    >
      <CardContent>
        <Typography
          gutterBottom
          sx={{
            color: '#424242',
            fontWeight: 800,
            fontSize: '1.25rem',
            letterSpacing: '0.5px',
          }}
        >
          วันลา
        </Typography>
        <Typography
          variant="h6"
          component="div"
          sx={{
            color: '#424242',
            fontWeight: 600,
            fontSize: '1.5rem',
          }}
        >
          วันลาของคุณคงเหลือ
        </Typography>

        <Typography
          variant="h4"
          sx={{
            color: '#424242',
            fontWeight: 900,
            fontSize: '2rem',
            marginTop: '12px',
          }}
        >
          0 วัน / 0 วัน
        </Typography>
      </CardContent>

      <CardActions sx={{ display: 'flex', justifyContent: 'flex-end', padding: '16px' }}>
        {/* <Button
          size="medium"
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddLeaveClick} // Navigate to add-leave page
          sx={{
            backgroundColor: '#00b0ff',
            '&:hover': {
              backgroundColor: '#33bfff',
            },
            borderRadius: '8px',
            fontWeight: 'bold',
            textTransform: 'none',
            padding: '8px 20px',
          }}
        >
          เพิ่มวันลา
        </Button> */}
      </CardActions>
    </Card>
  );
}
