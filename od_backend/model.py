import torch.nn as nn
import torchvision.models as models

def get_model(num_classes):
    model = models.resnet50(pretrained=True)
    num_features = model.fc.in_features
    model.fc = nn.Linear(num_features, num_classes)
    return model
