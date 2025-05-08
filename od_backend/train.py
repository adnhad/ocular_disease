import tensorflow as tf
from data_loader import load_data
from model import build_model
import matplotlib.pyplot as plt
import os
import datetime


def train_model():
    # Configuration
    DATASET_PATH = r"C:\Users\adnha\Desktop\Eye Disease Image Dataset\Augmented Dataset\Augmented Dataset"
    IMG_SIZE = (300, 300)  # EfficientNet-B3 optimal size
    BATCH_SIZE = 32
    EPOCHS = 50
    MODEL_SAVE_PATH = "saved_models"

    # Load data
    train_gen, val_gen, class_names = load_data(
        DATASET_PATH,
        img_size=IMG_SIZE,
        batch_size=BATCH_SIZE
    )

    # Build model
    model = build_model(num_classes=len(class_names), img_size=IMG_SIZE)

    # Callbacks
    callbacks = [
        tf.keras.callbacks.EarlyStopping(
            monitor='val_auc',
            patience=5,
            mode='max',
            restore_best_weights=True
        ),
        tf.keras.callbacks.ModelCheckpoint(
            filepath=os.path.join(MODEL_SAVE_PATH, "best_model.h5"),
            monitor='val_auc',
            save_best_only=True,
            mode='max'
        ),
        tf.keras.callbacks.TensorBoard(
            log_dir=os.path.join("logs", datetime.datetime.now().strftime("%Y%m%d-%H%M%S"))
        )
    ]

    # Train model
    history = model.fit(
        train_gen,
        epochs=EPOCHS,
        validation_data=val_gen,
        callbacks=callbacks
    )

    # Plot training history
    plot_training_history(history)

    return model


def plot_training_history(history):
    plt.figure(figsize=(12, 4))

    # Accuracy plot
    plt.subplot(1, 2, 1)
    plt.plot(history.history['accuracy'])
    plt.plot(history.history['val_accuracy'])
    plt.title('Model Accuracy')
    plt.ylabel('Accuracy')
    plt.xlabel('Epoch')
    plt.legend(['Train', 'Validation'], loc='upper left')

    # Loss plot
    plt.subplot(1, 2, 2)
    plt.plot(history.history['loss'])
    plt.plot(history.history['val_loss'])
    plt.title('Model Loss')
    plt.ylabel('Loss')
    plt.xlabel('Epoch')
    plt.legend(['Train', 'Validation'], loc='upper left')

    plt.tight_layout()
    plt.savefig('training_history.png')
    plt.show()


if __name__ == "__main__":
    train_model()