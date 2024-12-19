import pytest
import random

from src.llm_service import LatexResponse, translate_text_to_latex


def test_empty_string():
    response = translate_text_to_latex("")
    assert response.latex_string == ""
    assert response.valid_response == False


def test_invalid_string():
    strings = [
        "What is the capital of France?",
        "😊",
        "Gibberish",
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        "If a tree falls in a forest and no one is around to hear it, does it make a sound?",
    ]
    for string in strings:
        response = translate_text_to_latex(string)
        assert response.latex_string == ""
        assert response.valid_response == False


def test_valid_string():
    expressions = [
        "x^2 + 2x + 1",
        "E=mc^2",
        "\\frac{1}{2} \\times 3",
        "\int_{0}^{\\infty} x^2 dx",
        "\sum_{i=1}^{n} i",
        "alpha + beta = gamma",
    ]
    for expression in expressions:
        response = translate_text_to_latex(expression)
        assert response.latex_string != ""
        assert response.valid_response == True
