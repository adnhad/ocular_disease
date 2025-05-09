import { useState } from 'react';
import { Box, Button, Container, TextField, Typography, Paper, Avatar, Link } from '@mui/material';
import { EmailOutlined } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{
        mt: 8, p: 4,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        borderRadius: 2
      }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <EmailOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Réinitialisation du mot de passe
        </Typography>

        {isSubmitted ? (
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography>
              Un email de réinitialisation a été envoyé à <strong>{email}</strong>
            </Typography>
            <Button
              component={RouterLink}
              to="/login"
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
            >
              Retour à la connexion
            </Button>
          </Box>
        ) : (
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <Typography sx={{ mb: 2 }}>
              Entrez votre email pour recevoir un lien de réinitialisation
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Envoyer
            </Button>
            <Link component={RouterLink} to="/login" variant="body2">
              Retour à la connexion
            </Link>
          </Box>
        )}
      </Paper>
    </Container>
  );
}