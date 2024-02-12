from pydantic import BaseModel, ConfigDict
from datetime import datetime
from app.models.flight_mission import MissionState
from typing import Optional as OptionalType

class FlightMissionBase(BaseModel):
    title: str
    description: str
    mission_state: MissionState

class FlightMissionCreate(FlightMissionBase):
    pass

class FlightMissionUpdate(BaseModel):
    title: OptionalType[str] = None
    description: OptionalType[str] = None
    mission_state: MissionState
class FlightMission(FlightMissionBase):
    id: int
    created_at: datetime
    updated_at: datetime
    model_config = ConfigDict(from_attributes=True)