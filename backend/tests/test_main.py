import pytest
from fastapi.testclient import TestClient
from pathlib import Path
import random

from src.main import app, LatexResponse

client = TestClient(app)


def test_healthcheck():
    response = client.get("/healthcheck")
    assert response.status_code == 200  # noqa: PLR2004


def test_translate():
    expressions = [
        "x^2 + 2x + 1",
        "E=mc^2",
        "\\frac{1}{2} \\times 3",
        "\int_{0}^{\\infty} x^2 dx",
        "\sum_{i=1}^{n} i",
        "alpha + beta = gamma",
    ]
    for expression in expressions:
        response = client.get("/translate", params={"text_expression": expression})
        assert response.status_code == 200  # noqa: PLR2004
        data = response.json()
        assert "latex_string" in data
        assert "valid_response" in data
        assert data["valid_response"] is True
        assert data["latex_string"] != ""


def test_translate_empty():
    response = client.get("/translate", params={"text_expression": ""})
    assert response.status_code == 200  # noqa: PLR2004
    data = response.json()
    assert "latex_string" in data
    assert "valid_response" in data
    assert data["valid_response"] is False
    assert data["latex_string"] == ""


def test_translate_invalid_string():
    strings = [
        "What is the capital of France?",
        "😊",
        "Gibberish",
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        "If a tree falls in a forest and no one is around to hear it, does it make a sound?",
    ]
    for string in strings:
        response = client.get("/translate", params={"text_expression": string})
        assert response.status_code == 200  # noqa: PLR2004
        data = response.json()
        assert "latex_string" in data
        assert "valid_response" in data
        assert data["valid_response"] is False
        assert data["latex_string"] == ""


def test_translate_invalid_symbol():
    response = client.get("/translate", params={"text_expression": "😊"})
    assert response.status_code == 200  # noqa: PLR2004
    data = response.json()
    assert "latex_string" in data
    assert "valid_response" in data
    assert data["valid_response"] is False
    assert data["latex_string"] == ""
