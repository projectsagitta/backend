# Sagitta web application and backend
Sagitta is a citizen science project for oceanographic data collection by volunteering parties
using conductivity-temperature-depth (CTD) probes

## Requirements
```
Django
psycopg2
djangorestframework
django-allauth
django-rest-auth
django-filter
```
## Installation
*Warning: this chapter may be incomplete. If any of the following commands does not work or
needs additional explanation, please refer to the official Django documentation or create
an issue or edit this file and create a pull request.*

### Debian / Ubuntu

Set up a python3 virtual environment:
```
sudo apt-get install python3-venv
python3 -m venv ~/.virtualenvs/django
source ~/.virtualenvs/django/bin/activate
```

Install required python packages:
```
# in virtual environment ((django) $)
pip install --upgrade pip
pip install Django psycopg2 djangorestframework django-allauth django-rest-auth django-filter
```

Set up database:
```
cp sagitta/private_settings.py.example sagitta/private_settings.py
# edit sagitta/private_settings.py
# create empty PostgreSQL database named sagitta
python manage.py migrate
python manage.py createsuperuser
```

Collect static files and run test server at http://localhost:8000:
```
python manage.py collectstatic
python manage.py runserver
```
