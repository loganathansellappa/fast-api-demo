import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient
from src.app.api.v1.controllers.flight_mission_controller import router

# Create a FastAPI app and include the router
app = FastAPI()
app.include_router(router)

# Define a test client
client = TestClient(app)

# Define a mock repository object
# repository_mock = Mock()


@pytest.fixture
def client():
    return TestClient(app)


def test_create_flight_mission(client, cleanup_database):
    payload = {
        "title": "Test Mission1",
        "description": "Test description",
        "mission_state": "Pre-flight"
    }

    response = client.post("/api/v1/flight_missions/", json=payload)
    assert response.status_code == 200
    assert response.json()['title'] == payload['title']

def test_read_flight_mission(client, cleanup_database):
    payload = {
        "title": "Test Mission",
        "description": "Test description",
        "mission_state": "Pre-flight"
    }

    response = client.post("/api/v1/flight_missions/", json=payload)
    mission_id = response.json()['id']
    response = client.get(f"/api/v1/flight_missions/{mission_id}")
    assert response.status_code == 200
    assert response.json()['title'] == "Test Mission"


def test_delete_flight_mission(client, cleanup_database):
    payload = {
        "title": "Test Mission",
        "description": "Test description",
        "mission_state": "Pre-flight"
    }

    response = client.post("/api/v1/flight_missions/", json=payload)
    mission_id = response.json()['id']
    response = client.delete(f"/api/v1/flight_missions/{mission_id}")
    assert response.status_code == 200
    assert response.json()['title'] == "Test Mission"


def test_list_flight_missions(client, cleanup_database):
    # Create some test flight missions
    for i in range(5):
        client.post("/api/v1/flight_missions/", json={
            "title": f"Test Mission {i+1}",
            "description": "Test description",
            "mission_state": "Pre-flight"
        })
    response = client.get("/api/v1/flight_missions/")
    assert response.status_code == 200
    assert len(response.json()) == 5

def test_update_flight_mission(client, cleanup_database):
    payload ={
        "title": "Test Mission",
        "description": "Test description",
        "mission_state": "Pre-flight"
    }
    response = client.post("/api/v1/flight_missions/", json=payload)
    mission_id = response.json()['id']

    payload = {
        "mission_state": "In-Flight"
    }
    response = client.put(f"/api/v1/flight_missions/{mission_id}", json=payload)
    print(response.json())
    print(mission_id)
    assert response.status_code == 200
    assert response.json()['mission_state'] == "In-Flight"