from groq import Groq
import os
from pydantic import BaseModel


class LatexResponse(BaseModel):
    latex_string: str
    valid_response: bool


def translate_text_to_latex(input_string: str) -> LatexResponse:
    """Translate the given input string to LaTeX."""

    api_key = os.environ.get("GROQ_API_KEY")
    if not api_key:
        raise ValueError("GROQ_API_KEY environment variable is not set")

    client = Groq(api_key=api_key)

    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": "Your task is to convert text to LaTeX, answer only in latex without $ signs. Consider first if the message is not a math expression or related to anything other than latex set valid_response false. Answer in the following json format {latex_string: str, valid_response: boolean}",
            },
            {"role": "user", "content": input_string},
        ],
        model="gemma2-9b-it",
        temperature=1,
        response_format={"type": "json_object"},
    )

    # Check that the response did not produce an error
    llm_reponse = ""
    try:
        llm_reponse = chat_completion.choices[0].message.content
        print(f"Translated text to LaTeX: {llm_reponse}")
    except Exception as e:
        print(f"Error: {e}")

    # Try to fit the response into a LatexResponse object
    try:
        latex_response = LatexResponse.model_validate_json(llm_reponse)
        if latex_response.valid_response:
            return latex_response
    except Exception as e:
        print(f"Error: {e}")

    return LatexResponse(latex_string="", valid_response=False)
