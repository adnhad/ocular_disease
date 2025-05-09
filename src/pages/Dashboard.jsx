import { useState } from 'react';
import {
  Box, Button, Container, Paper, Typography,
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Chip, LinearProgress,
  keyframes, styled
} from '@mui/material';
import { Link } from 'react-router-dom';
import { History, CameraAlt } from '@mui/icons-material';
import eyePattern from '../assets/eye-pattern-light.jpg';

// Animation
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const AnimatedRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  animation: `${fadeIn} 0.5s ease-out forwards`,
  opacity: 0
}));

export default function Dashboard() {
  const [history] = useState([
    { id: 1, date: '2023-06-15', diagnosis: 'Cataract', confidence: 0.92, action: 'Consult recommended' },
    { id: 2, date: '2023-05-28', diagnosis: 'Normal', confidence: 0.98, action: 'No action needed' },
    { id: 3, date: '2023-04-10', diagnosis: 'Glaucoma', confidence: 0.87, action: 'Urgent consultation' },
  ]);

  return (
    <Box sx={{
      backgroundImage: `url(${eyePattern})`,
      backgroundSize: 'cover',
      minHeight: '100vh',
      py: 6
    }}>
      <Container maxWidth="lg">
        <Paper elevation={12} sx={{
          p: 4,
          mb: 4,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(8px)'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <History color="primary" sx={{ fontSize: 40, mr: 2 }} />
            <Typography variant="h3" component="h1" sx={{
              fontWeight: 700,
              background: 'linear-gradient(45deg, #1976d2, #5e35b1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Scan History
            </Typography>
          </Box>

          <TableContainer component={Paper} sx={{
            border: '1px solid rgba(0, 0, 0, 0.12)',
            borderRadius: 2,
            overflow: 'hidden'
          }}>
            <Table>
              <TableHead sx={{ bgcolor: 'primary.dark' }}>
                <TableRow>
                  <TableCell sx={{ color: 'white' }}>Date</TableCell>
                  <TableCell sx={{ color: 'white' }}>Diagnosis</TableCell>
                  <TableCell sx={{ color: 'white' }}>Confidence</TableCell>
                  <TableCell sx={{ color: 'white' }}>Action</TableCell>
                  <TableCell align="right" sx={{ color: 'white' }}>Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {history.map((item, index) => (
                  <AnimatedRow key={item.id} sx={{ animationDelay: `${index * 0.1}s` }}>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>
                      <Chip
                        label={item.diagnosis}
                        sx={{
                          fontWeight: 600,
                          ...(item.diagnosis === 'Normal' && {
                            bgcolor: 'success.light',
                            color: 'success.contrastText'
                          }),
                          ...(item.diagnosis === 'Cataract' && {
                            bgcolor: 'warning.light',
                            color: 'warning.contrastText'
                          }),
                          ...(item.diagnosis === 'Glaucoma' && {
                            bgcolor: 'error.light',
                            color: 'error.contrastText'
                          })
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ width: '100%', mr: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={item.confidence * 100}
                            sx={{
                              height: 8,
                              borderRadius: 4,
                              ...(item.confidence > 0.9 && { bgcolor: 'success.main' }),
                              ...(item.confidence > 0.7 && item.confidence <= 0.9 && { bgcolor: 'warning.main' }),
                              ...(item.confidence <= 0.7 && { bgcolor: 'error.main' })
                            }}
                          />
                        </Box>
                        {Math.round(item.confidence * 100)}%
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{
                        fontWeight: 500,
                        ...(item.action.includes('Urgent') && { color: 'error.main' })
                      }}>
                        {item.action}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="outlined"
                        size="small"
                        component={Link}
                        to={`/report`}
                        sx={{
                          textTransform: 'none',
                          borderRadius: 20,
                          px: 2,
                          '&:hover': {
                            transform: 'translateY(-2px)'
                          }
                        }}
                      >
                        View Report
                      </Button>
                    </TableCell>
                  </AnimatedRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{
            mt: 4,
            display: 'flex',
            justifyContent: 'center',
            '& button': {
              transition: 'all 0.3s ease'
            },
            '& button:hover': {
              transform: 'scale(1.05)'
            }
          }}>
            <Button
              variant="contained"
              component={Link}
              to="/scan"
              startIcon={<CameraAlt />}
              sx={{
                px: 6,
                py: 1.5,
                borderRadius: 20,
                fontSize: 16,
                fontWeight: 600,
                background: 'linear-gradient(45deg, #1976d2, #00bcd4)',
                boxShadow: '0 4px 6px rgba(0, 188, 212, 0.4)'
              }}
            >
              New Eye Scan
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}