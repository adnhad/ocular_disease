import torch
from dataset_loader import get_data_loaders
from model import get_model
from train import train_model
from evaluate import run_evaluation


def main():
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"Using device: {device}")

    train_loader, test_loader, class_names = get_data_loaders()
    num_classes = len(class_names)

    model = get_model(num_classes)
    model = model.to(device)

    train_model(model, train_loader, test_loader, device)
    run_evaluation(model, test_loader, device)


if __name__ == "__main__":
    main()
