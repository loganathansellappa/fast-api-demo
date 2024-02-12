from typing import List, Optional
from sqlalchemy.orm import Session
from fastapi import HTTPException
from src.app.models.flight_mission import FlightMission, MissionState
from src.app.services import schemas


# CRUD operations for FlightMission
class FlightMissionRepository:
    def get_flight_mission(self, db: Session, mission_id: int) -> Optional[FlightMission]:
        return db.query(FlightMission).filter(FlightMission.id == mission_id).first()


    def get_flight_missions(self, db: Session, skip: int = 0, limit: int = 100) -> List[FlightMission]:
        return db.query(FlightMission).offset(skip).limit(limit).all()

    def create_flight_mission(self, db: Session, flight_mission: FlightMission) -> FlightMission:
        db_flight_mission = FlightMission(**flight_mission.model_dump())
        db.add(db_flight_mission)
        db.commit()
        db.refresh(db_flight_mission)
        return schemas.FlightMission.from_orm(db_flight_mission)

    def update_flight_mission(self, db: Session, mission_id: int, flight_mission: FlightMission) -> FlightMission:
        db_mission = self.get_flight_mission(db, mission_id)
        if not db_mission:
            raise HTTPException(status_code=404, detail="Mission not found")

        # Update the existing db_mission object with the new data
        for key, value in flight_mission.items():
            if value is not None:
                setattr(db_mission, key, value)
        db.commit()
        db.refresh(db_mission)
        return schemas.FlightMission.from_orm(db_mission)

    def delete_flight_mission(self, db: Session, mission_id: int) -> None:
        db_mission = self.get_flight_mission(db, mission_id)
        if not db_mission:
            raise HTTPException(status_code=404, detail="Mission not found")
        db.delete(db_mission)
        db.commit()

# Usage example
# repo = FlightMissionRepository()
#
# # Create a flight mission
# db = SessionLocal()
# created_mission = repo.create_flight_mission(db, title="Mission 1", description="Description 1", mission_state=MissionState.pre_flight)
# print("Created mission:", created_mission)
#
# # Update a flight mission
# updated_mission = repo.update_flight_mission(db, mission_id=created_mission.id, title="Updated Title", description="Updated Description", mission_state=MissionState.in_flight)
# print("Updated mission:", updated_mission)
#
# # Get a flight mission by ID
# fetched_mission = repo.get_flight_mission(db, mission_id=created_mission.id)
# print("Fetched mission:", fetched_mission)
#
# # Delete a flight mission
# repo.delete_flight_mission(db, mission_id=created_mission.id)
# print("Deleted mission")
#
# # Close the database session
# db.close()
