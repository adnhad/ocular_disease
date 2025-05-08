import tensorflow as tf
import numpy as np
from PIL import Image
import os


class DiseasePredictor:
    def __init__(self, model_path, class_names):
        self.model = tf.keras.models.load_model(model_path)
        self.class_names = class_names

    def preprocess_image(self, image_path, img_size=(300, 300)):
        """Preprocess image for prediction"""
        img = Image.open(image_path)
        img = img.resize(img_size)
        img_array = tf.keras.preprocessing.image.img_to_array(img)
        img_array = tf.expand_dims(img_array, 0)  # Create batch axis
        img_array = img_array / 255.0  # Normalize
        return img_array

    def predict(self, image_path):
        """Make prediction on single image"""
        processed_img = self.preprocess_image(image_path)
        predictions = self.model.predict(processed_img)
        predicted_class = self.class_names[np.argmax(predictions)]
        confidence = np.max(predictions)
        return predicted_class, confidence


# Example usage
if __name__ == "__main__":
    # Load your class names (should match training order)
    CLASS_NAMES = ['Cataract', 'Diabetic_Retinopathy', 'Glaucoma', ...]  # Add all your classes

    predictor = DiseasePredictor(
        model_path="saved_models/best_model.h5",
        class_names=CLASS_NAMES
    )

    test_image = r"C:\path\to\test_image.jpg"
    disease, confidence = predictor.predict(test_image)
    print(f"Predicted: {disease} with {confidence:.2%} confidence")