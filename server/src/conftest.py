
import pytest
from src.app.models.flight_mission import FlightMission
from src.app.db.connection import SessionLocal

@pytest.fixture(scope="function", autouse=True)
def cleanup_database():
    session = SessionLocal()

    yield

    session.query(FlightMission).delete()
    session.commit()

    session.close()
