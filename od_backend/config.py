import os

# Dataset path (change if needed)
DATA_DIR = r"C:\Users\adnha\Desktop\Eye Disease Image Dataset\Augmented Dataset\Augmented Dataset"

# Image size (resized from 2004x1690 to something optimal)
IMAGE_SIZE = (299, 299)

# Batch size and other training params
BATCH_SIZE = 8
NUM_EPOCHS = 10
LEARNING_RATE = 0.001

# Train/Test split
TRAIN_RATIO = 0.8

# Model save path
MODEL_PATH = "best_model.pth"

# Random seed
SEED = 42
