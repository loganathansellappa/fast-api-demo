from dotenv import load_dotenv
from fastapi import APIRouter, FastAPI
from starlette.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi.responses import HTMLResponse
from fastapi.openapi.docs import get_swagger_ui_html
load_dotenv(".env.dev")
from .app.api.v1.controllers import flight_mission_controller
api_router = APIRouter(prefix="/api")

class FlightMission(BaseModel):
    title: str
    description: str

@api_router.get("/health", include_in_schema=False)
def healthcheck():
    """Check if API is up and running."""
    return {"status": "ok"}


app = FastAPI(
    title="volocopter_code_challenge",
    description="""Volocopter Code Challenge API.""",
)
app.include_router(flight_mission_controller.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/docs", include_in_schema=False, response_class=HTMLResponse)
async def custom_swagger_ui_html():
    return get_swagger_ui_html(
        openapi_url="/openapi.json",
        title="Custom Swagger UI"
    )

@app.get("/openapi.json", include_in_schema=False)
async def get_open_api_endpoint():

    return app.openapi()

app.include_router(api_router)
