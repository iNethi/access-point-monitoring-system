# Access Point Monitoring System
AP monitoring solution that allows users to edit the IP addresses of their APs.

**Depends** on the iNethi installation of Keycloak (auth), Grafana (UI) and Prometheus (data). You can install those 
from [here](https://github.com/iNethi/inethi).

## Run locally
1. Start the DB: `docker compose -f ./docker-compose-local.yml up -d`.
2. Start the server: `python manage.py runserver`
3. Start the UI: `npm start`

## How this works
The UI and database are connected to the prometheus yaml file. When this file is changed the prometheus container will 
reload using the API call `curl -u inethi:iNethi2023# -X POST http://inethi-prometheus:9090/-/reload`
`. This will reload the yaml file that would have been edited whenever a UI edit occurs.
