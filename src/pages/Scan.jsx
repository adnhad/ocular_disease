import { useState } from 'react';
import { Box, Button, CircularProgress, Container, Paper, Typography, Alert } from '@mui/material';
import ImageUploader from '../components/ImageUploader';
import DiagnosisResult from '../components/DiagnosisResult';

export default function Scan() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', image);

      const response = await fetch('http://localhost:8000/api/analyze', {
        method: 'POST',
        body: formData,
      });

      setResult(await response.json());
    } catch (error) {
      setError('Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>Ocular Scan</Typography>

        <ImageUploader image={image} setImage={setImage} />

        {image && (
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleAnalyze}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              {loading ? 'Analyzing...' : 'Analyze Eye Image'}
            </Button>
          </Box>
        )}

        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        {result && <DiagnosisResult data={result} />}
      </Paper>
    </Container>
  );
}

