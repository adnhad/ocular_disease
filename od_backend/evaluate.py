import torch
from utils import load_model
from config import MODEL_PATH
from train import evaluate_model

def run_evaluation(model, test_loader, device):
    model = load_model(model, MODEL_PATH)
    accuracy = evaluate_model(model, test_loader, device)
    return accuracy
