from enum import Enum
from sqlalchemy import Column, Integer, DateTime, String, func
from app.db.connection import Base
class TimestampMixin(object):
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())
    updated_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())

class MissionState(str, Enum):
    pre_flight = "Pre-flight"
    in_flight = "In-Flight"
    post_flight = "Post-Flight"

class FlightMission(Base, TimestampMixin):
    __tablename__ = "flight_missions"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    title = Column(String(255), nullable=False, unique=True, index=True)
    description = Column(String(255), nullable=False)
    mission_state = Column(String(255), nullable=False, default=MissionState.pre_flight)