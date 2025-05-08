import { Box, Button, Typography, Card, CardMedia, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ImageUploader({ image, setImage }) {
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file?.type.match('image.*')) setImage(file);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  return (
    <Box
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      sx={{ border: '2px dashed #1976d2', borderRadius: 2, p: 3, textAlign: 'center' }}
    >
      {image ? (
        <Card sx={{ maxWidth: 400, mx: 'auto' }}>
          <CardMedia
            component="img"
            height="300"
            image={URL.createObjectURL(image)}
            alt="Eye preview"
          />
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 1 }}>
            <IconButton color="error" onClick={() => setImage(null)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Card>
      ) : (
        <>
          <CloudUploadIcon sx={{ fontSize: 60, color: 'action.active' }} />
          <Typography variant="body1" sx={{ mt: 1 }}>
            Drag & drop eye image here or
          </Typography>
          <Button variant="contained" component="label" sx={{ mt: 2 }}>
            Select File
            <input type="file" hidden accept="image/*" onChange={handleChange} />
          </Button>
        </>
      )}
    </Box>
  );
}