import torch
import torch.nn as nn
import torch.optim as optim
from tqdm import tqdm
from config import NUM_EPOCHS, LEARNING_RATE, MODEL_PATH
from utils import save_model


def train_model(model, train_loader, test_loader, device):
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=LEARNING_RATE)

    best_accuracy = 0

    for epoch in range(NUM_EPOCHS):
        model.train()
        running_loss = 0.0
        correct = 0
        total = 0

        pbar = tqdm(train_loader, desc=f"Epoch {epoch+1}/{NUM_EPOCHS}", unit="batch")

        for i, (images, labels) in enumerate(pbar):
            images, labels = images.to(device), labels.to(device)

            optimizer.zero_grad()
            outputs = model(images)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()

            running_loss += loss.item()

            _, predicted = torch.max(outputs.data, 1)
            total += labels.size(0)
            correct += (predicted == labels).sum().item()

            avg_loss = running_loss / (i + 1)
            train_acc = 100 * correct / total
            pbar.set_postfix({
                "Batch Loss": f"{loss.item():.4f}",
                "Avg Loss": f"{avg_loss:.4f}",
                "Train Acc": f"{train_acc:.2f}%"
            })

        print(f"\nEpoch {epoch+1} completed. Avg Loss: {avg_loss:.4f}, Train Accuracy: {train_acc:.2f}%")

        acc = evaluate_model(model, test_loader, device)
        if acc > best_accuracy:
            best_accuracy = acc
            save_model(model, MODEL_PATH)
            print(f"\n✅ New best model saved with accuracy: {acc:.2f}%")


def evaluate_model(model, data_loader, device):
    model.eval()
    correct = 0
    total = 0
    total_loss = 0
    criterion = nn.CrossEntropyLoss()

    with torch.no_grad():
        for images, labels in data_loader:
            images, labels = images.to(device), labels.to(device)
            outputs = model(images)
            loss = criterion(outputs, labels)
            total_loss += loss.item()

            _, predicted = torch.max(outputs.data, 1)
            total += labels.size(0)
            correct += (predicted == labels).sum().item()

    accuracy = 100 * correct / total
    avg_loss = total_loss / len(data_loader)
    print(f"Validation Accuracy: {accuracy:.2f}% | Validation Loss: {avg_loss:.4f}")
    return accuracy