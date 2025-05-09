import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

export default function Navbar({ onLogout }) {
  return (
    <AppBar position="static" elevation={0}>
      <Toolbar>
        <MedicalServicesIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          OcularAI
        </Typography>

        <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
          <Button color="inherit" component={Link} to="/home">Accueil</Button>
          <Button color="inherit" component={Link} to="/scan">Scanner</Button>
          <Button color="inherit" component={Link} to="/dashboard">Tableau de bord</Button>
          <Button color="inherit" onClick={onLogout}>Déconnexion</Button>
        </Box>

        <IconButton
          color="inherit"
          edge="end"
          sx={{ display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}