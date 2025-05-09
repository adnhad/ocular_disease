import os
import torch
from torchvision import datasets, transforms
from torch.utils.data import random_split, DataLoader
from config import DATA_DIR, IMAGE_SIZE, BATCH_SIZE, TRAIN_RATIO, SEED


def get_data_loaders():
    transform = transforms.Compose([
        transforms.Resize(IMAGE_SIZE),
        transforms.ToTensor(),
        transforms.Normalize([0.5]*3, [0.5]*3)
    ])

    dataset = datasets.ImageFolder(DATA_DIR, transform=transform)
    class_names = dataset.classes

    torch.manual_seed(SEED)
    train_size = int(TRAIN_RATIO * len(dataset))
    test_size = len(dataset) - train_size
    train_dataset, test_dataset = random_split(dataset, [train_size, test_size])

    train_loader = DataLoader(train_dataset, batch_size=BATCH_SIZE, shuffle=True)
    test_loader = DataLoader(test_dataset, batch_size=BATCH_SIZE, shuffle=False)

    return train_loader, test_loader, class_names
