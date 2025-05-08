import os
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from sklearn.model_selection import train_test_split
import numpy as np


def load_data(dataset_path, img_size=(224, 224), batch_size=32, test_size=0.2):
    """
    Load and preprocess image data from directory

    Args:
        dataset_path: Path to augmented dataset
        img_size: Target image dimensions
        batch_size: Batch size for training
        test_size: Fraction of data for validation

    Returns:
        train_generator, val_generator, class_names
    """
    # Data augmentation for training
    train_datagen = ImageDataGenerator(
        rescale=1. / 255,
        rotation_range=20,
        width_shift_range=0.2,
        height_shift_range=0.2,
        shear_range=0.2,
        zoom_range=0.2,
        horizontal_flip=True,
        validation_split=test_size
    )

    # Validation data generator (only rescaling)
    val_datagen = ImageDataGenerator(
        rescale=1. / 255,
        validation_split=test_size
    )

    # Load class names from directory structure
    class_names = sorted(os.listdir(dataset_path))
    num_classes = len(class_names)

    print(f"Found {num_classes} classes: {class_names}")

    # Create generators
    train_generator = train_datagen.flow_from_directory(
        dataset_path,
        target_size=img_size,
        batch_size=batch_size,
        class_mode='categorical',
        subset='training'
    )

    val_generator = val_datagen.flow_from_directory(
        dataset_path,
        target_size=img_size,
        batch_size=batch_size,
        class_mode='categorical',
        subset='validation'
    )

    return train_generator, val_generator, class_names