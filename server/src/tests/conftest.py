
import pytest
from ..app.models.flight_mission import FlightMission
from ..app.db.connection import SessionLocal

@pytest.fixture(scope="function", autouse=True)
def cleanup_database():
    # Create a session
    session = SessionLocal()

    # Run the test suite
    yield

    # Clean up: Delete all records in the flight_missions table
    session.query(FlightMission).delete()
    session.commit()

    # Close the session
    session.close()
