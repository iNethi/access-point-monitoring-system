#!/bin/sh
python manage.py makemigrations vernonburg_fcc_api
python manage.py migrate
exec "$@"
