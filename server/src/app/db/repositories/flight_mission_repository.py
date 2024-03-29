from typing import List, Optional
from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.flight_mission import FlightMission, MissionState
from app.services import schemas


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