import {
  Box, Button, Container, Typography, Paper,
  Divider, List, ListItem, ListItemText,
  ListItemIcon, Grid, LinearProgress
} from '@mui/material';
import {
  MedicalInformation,
  Download,
  Share,
  Print
} from '@mui/icons-material';
import { useLocation } from 'react-router-dom';

export default function Report() {
  const { state } = useLocation();

  const reportData = state?.report || {
    patientId: "PAT-2023-001",
    date: new Date().toLocaleDateString(),
    diagnosis: "Cataracte précoce",
    confidence: 0.89,
    recommendations: [
      "Consultation ophtalmologique sous 1 mois",
      "Protection UV recommandée",
      "Contrôle dans 6 mois"
    ]
  };

  const handlePrint = () => window.print();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <MedicalInformation color="primary" sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h4">Rapport de Diagnostic</Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Informations Patient
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="ID Patient" secondary={reportData.patientId} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Date d'examen" secondary={reportData.date} />
              </ListItem>
            </List>

            <Typography variant="h6" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
              Résultats
            </Typography>
            <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
              <Typography>Diagnostic: {reportData.diagnosis}</Typography>
              <Typography>Confiance: {Math.round(reportData.confidence * 100)}%</Typography>
              <LinearProgress
                variant="determinate"
                value={reportData.confidence * 100}
                sx={{ height: 8, mt: 1, borderRadius: 4 }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Recommandations
            </Typography>
            <List dense>
              {reportData.recommendations.map((rec, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <MedicalInformation color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={rec} />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
          <Button variant="contained" startIcon={<Download />}>
            Télécharger
          </Button>
          <Button variant="outlined" startIcon={<Share />}>
            Partager
          </Button>
          <Button variant="outlined" startIcon={<Print />} onClick={handlePrint}>
            Imprimer
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}