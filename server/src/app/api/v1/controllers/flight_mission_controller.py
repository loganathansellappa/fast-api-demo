from fastapi import APIRouter, Depends, HTTPException
from typing import List
from sqlalchemy.orm import Session
from app.db.repositories import FlightMissionRepository
from app.db.connection import get_db
from app.services import schemas
from sqlalchemy import exc

router = APIRouter(
    prefix="/api/v1",  # Prepend "api/v1" to all routes
    tags=["flight_missions"],  # Optional: Add tags for documentation
)

repository = FlightMissionRepository()

# Endpoint to create a flight mission
@router.post("/flight_missions/", response_model=schemas.FlightMission)
def create_flight_mission(flight_mission: schemas.FlightMissionCreate, db: Session = Depends(get_db)):
    try:
        return repository.create_flight_mission(db=db, flight_mission=flight_mission)
    except exc.IntegrityError as e:
        raise HTTPException(status_code=400, detail=f"An integrity constraint violation occurred. Check title or missionState")
    except Exception as e:
        raise HTTPException(status_code=500, detail="An error occurred while processing the request.")

# Endpoint to get a flight mission by ID
@router.get("/flight_missions/{mission_id}", response_model=schemas.FlightMission)
def read_flight_mission(mission_id: int, db: Session = Depends(get_db)):
    db_mission = repository.get_flight_mission(db=db, mission_id=mission_id)
    if db_mission is None:
        raise HTTPException(status_code=404, detail="Flight mission not found")
    return db_mission

# Endpoint to update a flight mission by ID
@router.put("/flight_missions/{mission_id}", response_model=schemas.FlightMission)
def update_flight_mission(mission_id: int, flight_mission: schemas.FlightMissionUpdate, db: Session = Depends(get_db)):
    try:
        db_mission = repository.get_flight_mission(db=db, mission_id=mission_id)
        if db_mission is None:
            raise HTTPException(status_code=404, detail="Flight mission not found")
        # return repository.update_flight_mission(db=db, mission_id=mission_id, flight_mission=flight_mission)
        # Create an empty dictionary to store update data
        update_data = {}

        # Iterate over fields in the flight_mission update model
        for field in flight_mission.dict(exclude_unset=True):
            # Get the value from the flight_mission update model
            value = getattr(flight_mission, field)

            # If the value is not None, use it; otherwise, preserve the existing value
            update_data[field] = value if value is not None else getattr(db_mission, field)
        # Update the flight mission with the new data
        return repository.update_flight_mission(db=db, mission_id=mission_id, flight_mission=update_data)
    except exc.IntegrityError as e:
        raise HTTPException(status_code=400, detail=f"An integrity constraint violation occurred. Error message: {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail="An error occurred while processing the request.")

# Endpoint to delete a flight mission by ID
@router.delete("/flight_missions/{mission_id}", response_model=schemas.FlightMission)
def delete_flight_mission(mission_id: int, db: Session = Depends(get_db)):
    db_mission = repository.get_flight_mission(db=db, mission_id=mission_id)
    if db_mission is None:
        raise HTTPException(status_code=404, detail="Flight mission not found")
    repository.delete_flight_mission(db=db, mission_id=mission_id)
    return db_mission

# Endpoint to list all flight missions
@router.get("/flight_missions/", response_model=List[schemas.FlightMission])
def list_flight_missions(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return repository.get_flight_missions(db=db, skip=skip, limit=limit)
