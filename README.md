OAuth2
===================

Usage
-------------
#### Start Service
There are 2 containers to run up. One for oauth2 service and another one for database.
```
$ docker-compose up oauth2
```

#### Down Service
```
$ docker-compose down
```

#### API Access
```
http://localhost:9000/
```

#### API
```
POST  /auth/registerUser
POST  /auth/login
GET   /auth/me
```

#### Database Access
```
POSTGRES_USER: 'api'
POSTGRES_PASSWORD: 'api'
POSTGRES_DB: 'oauth2'
POSTGRES_HOST: localhost
POSTGRES_PORT: 5000
```
