import { Box, Button, Container, Grid, Typography, keyframes, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import { MedicalServices, CameraAlt, History, Visibility } from '@mui/icons-material';
import eyeBackground from '../assets/1.jpg'; // Add your eye-themed background

// Animation keyframes
const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const AnimatedCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  boxShadow: theme.shadows[10],
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: theme.shadows[16]
  },
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  animation: `${floatAnimation} 4s ease-in-out infinite`
}));

export default function Home() {
  return (
    <Box sx={{
      backgroundImage: `url(${eyeBackground})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      py: 8
    }}>
      <Container maxWidth="lg">
        <Box sx={{
          textAlign: 'center',
          mb: 8,
          color: 'white',
          textShadow: '0 2px 4px rgba(0,0,0,0.5)'
        }}>
          <MedicalServices sx={{
            fontSize: 80,
            color: 'white',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
            mb: 2
          }} />
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
            OcularAI
          </Typography>
          <Typography variant="h5" sx={{ opacity: 0.9 }}>
            Advanced AI for early ocular disease detection
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {[
            {
              icon: <CameraAlt color="primary" sx={{ fontSize: 50, mb: 2 }} />,
              title: "Quick Scan",
              description: "Upload an eye image for instant analysis of cataracts, glaucoma, and more.",
              action: "Start Scan",
              to: "/scan"
            },
            {
              icon: <History color="primary" sx={{ fontSize: 50, mb: 2 }} />,
              title: "Your History",
              description: "Track your eye health over time with detailed historical reports.",
              action: "View History",
              to: "/dashboard"
            },
            {
              icon: <Visibility color="primary" sx={{ fontSize: 50, mb: 2 }} />,
              title: "Learn More",
              description: "Understand how our AI detects diseases with 95% clinical accuracy.",
              action: "Discover",
              to: "/about"
            }
          ].map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <AnimatedCard sx={{ animationDelay: `${index * 0.5}s` }}>
                {item.icon}
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  {item.title}
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, flexGrow: 1 }}>
                  {item.description}
                </Typography>
                <Button
                  variant="contained"
                  component={Link}
                  to={item.to}
                  fullWidth
                  sx={{
                    mt: 'auto',
                    background: 'linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)',
                    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)'
                  }}
                >
                  {item.action}
                </Button>
              </AnimatedCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}