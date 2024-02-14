==============================

# The React+Typescript+FastApi

## Tech

### Front end
- Node
- Yarn
- React
- Typescript
- Vite
- Jest

### Backend
- Fast API
- SQLachemy ORM
- Pydantic
- OpenAPI

### Database
- Mysql

## Available Features

| Feature                                                   |
|-----------------------------------------------------------|
| List Mission Contorl                                      |
| Move Mission Contorl between differen states              |
| Delete Mission Contorl                                    | 



### Pre-requisites

In order to run this repo locally, you will need to have the following dependencies installed:

- Docker
- Python (v3.12)
- Node

## Run the app locally

## Installation
#### Run server and client separately in local machine
Install the dependencies and devDependencies and configure the database url.

### Backend
```sh
cd server/src
pip3 install -r ../requirements.txt
uvicorn main:app --host YOUR_HOST --port YOUR_PORT --reload
```
### Front end
```sh
cd client
yarn install
yarn dev
```

## Running Unit tests
### Backend
```sh
cd server/src
pytest
```
### Front end
```sh
cd client
yarn test
```

### Setup using docker

First, make sure that the port for the `proxy` service (port `8080`) is free in case you already have other Docker containers running. You can also update it in [`docker-compose.yml`](./docker-compose.yml), if you prefer.

Once the app is running, you should see it in [`http://localhost:8080`](http://localhost:8080).

In order to run the repo there are a few options:

#### Open a terminal at the root directory of the repo and execute

        ./go run

\* Our 'go' file is just a zsh script which runs `docker compose`.

alternatively, you can directly use:

        docker compose up -d

#### Run server and client separately

- Server

    In the terminal, navigate to the `/server` directory, and run:

          uvicorn main:app --host YOUR_HOST --port YOUR_PORT --reload

- Client

    In the terminal, navigate to the `/client` directory, and run:

          yarn dev
## Demo
[Demo Video](./DemoVideo/DemoVideo.mp4)