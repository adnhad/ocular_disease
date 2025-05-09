import {
  Alert,
  Box,
  Chip,
  Divider,
  Grid,
  LinearProgress,
  Typography,
  Button,
  keyframes,
  styled
} from '@mui/material';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import RecommendationIcon from '@mui/icons-material/Assignment';
import DescriptionIcon from '@mui/icons-material/Description';
import { Link } from 'react-router-dom';

// Animation pour le bouton
const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const AnimatedButton = styled(Button)(({ theme }) => ({
  animation: `${pulseAnimation} 2s infinite`,
  '&:hover': {
    animation: 'none',
    transform: 'scale(1.05)'
  }
}));

export default function DiagnosisResult({ data }) {
  return (
    <Box sx={{ mt: 4 }}>
      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
        <MedicalInformationIcon color="primary" sx={{ mr: 1 }} />
        Résultats du Diagnostic
      </Typography>

      <Alert
        severity={data.confidence > 0.7 ? 'warning' : 'info'}
        sx={{ mb: 3 }}
        icon={false}
      >
        <Typography variant="body1" component="div">
          <strong>Diagnostic:</strong> {data.diagnosis}
        </Typography>
        <Typography variant="body1" component="div">
          <strong>Confiance:</strong> {Math.round(data.confidence * 100)}%
        </Typography>
      </Alert>

      <Box sx={{ mb: 3 }}>
        <LinearProgress
          variant="determinate"
          value={data.confidence * 100}
          sx={{
            height: 10,
            borderRadius: 5,
            mt: 1,
            backgroundColor: data.confidence > 0.8 ? 'success.light' : 'warning.light',
            '& .MuiLinearProgress-bar': {
              backgroundColor: data.confidence > 0.8 ? 'success.main' : 'warning.main'
            }
          }}
        />
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" gutterBottom>
            <RecommendationIcon color="action" sx={{ mr: 1, verticalAlign: 'middle' }} />
            Recommandations
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {data.recommendations.map((rec, index) => (
              <Chip
                key={index}
                label={rec}
                color={index === 0 ? 'primary' : 'default'}
                variant="outlined"
                sx={{
                  borderRadius: 1,
                  borderWidth: 2,
                  '&:hover': {
                    transform: 'translateY(-2px)'
                  }
                }}
              />
            ))}
          </Box>

          {/* Nouveau bouton de génération de rapport */}
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <AnimatedButton
              variant="contained"
              component={Link}
              to="/report"
              state={{ report: data }}
              startIcon={<DescriptionIcon />}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                background: 'linear-gradient(45deg, #1976d2 30%, #2196F3 90%)',
                boxShadow: '0 3px 5px 2px rgba(33, 150, 243, .3)'
              }}
            >
              Générer le Rapport Complet
            </AnimatedButton>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" gutterBottom>
            Visualisation Thermique
          </Typography>
          <Box
            component="img"
            src={`data:image/png;base64,${data.heatmap}`}
            alt="Carte thermique de diagnostic"
            sx={{
              width: '100%',
              borderRadius: 2,
              border: '1px solid #ddd',
              boxShadow: 3,
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'scale(1.02)'
              }
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}