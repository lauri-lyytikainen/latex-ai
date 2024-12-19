import uuid
from pathlib import Path
from typing import Callable

import structlog
from dotenv import load_dotenv
from fastapi import FastAPI, Query, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Load environment variables
load_dotenv(Path(__file__).resolve().parent.parent / ".env")

from src import llm_service  # noqa: E402


class LatexResponse(BaseModel):
    latex_string: str
    valid_response: bool


app = FastAPI()
logger = structlog.get_logger()

origins = [
    "http://localhost:8080",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def logger_middleware(request: Request, call_next: Callable[[Request], Response]) -> Response:
    """
    Middleware to log requests and responses.

    Args:
        request (Request): Request object.
        call_next (Callable[[Request], Response]): Next middleware in the chain.

    Returns:
        Response: Response object.

    """
    structlog.contextvars.clear_contextvars()
    structlog.contextvars.bind_contextvars(
        path=request.url.path,
        method=request.method,
        client_host=request.client.host,
        request_id=str(uuid.uuid4()),
    )
    response = await call_next(request)

    structlog.contextvars.bind_contextvars(
        status_code=response.status_code,
    )

    # Exclude /healthcheck endpoint from producing logs
    if request.url.path != "/healthcheck":
        if 400 <= response.status_code < 500:  # noqa: PLR2004
            logger.warning("Client error")
        elif response.status_code >= 500:  # noqa: PLR2004
            logger.error("Server error")
        else:
            logger.info("OK")

    return response


@app.get("/healthcheck")
async def healthcheck() -> Response:
    """
    Healthcheck endpoint.

    Returns:
        Response: Empty response with status code 200.

    """
    return Response()


@app.get("/translate")
async def translate(text_expression: str = Query(...)) -> LatexResponse:
    """
    Translate text expression to LaTeX.

    Args:
        text_expression (str): Text expression to translate.

    Returns:
        LatexResponse: Translated LaTeX string.

    """
    logger.info("In translate path", text_expression=text_expression)
    return llm_service.translate_text_to_latex(text_expression)
