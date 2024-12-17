import uuid

import structlog
from fastapi import FastAPI, Request, Response, Query
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
load_dotenv(Path(__file__).resolve().parent.parent / ".env")

import src.llm_service as llm_service

app = FastAPI()
logger = structlog.get_logger()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
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
async def logger_middleware(request: Request, call_next):
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
        if 400 <= response.status_code < 500:
            logger.warn("Client error")
        elif response.status_code >= 500:
            logger.error("Server error")
        else:
            logger.info("OK")

    return response


@app.get("/healthcheck")
async def healthcheck():
    return Response()


@app.get("/translate")
async def translate(text_expression: str = Query(...)):
    logger.info("In translate path", text_expression=text_expression)
    return llm_service.translate_text_to_latex(text_expression)
