# Setup

### Backend

- Open a terminal
- cd backend
- npm run dev

### Frontend

- Open a terminal
- cd frontend
- npm start

### When starting the backend for the first time, add {force: true} inside sequelize.sync() so that Sequelize automatically generates the tables

In .env file, the following variables need to be set

- PORT - Backend port
- USER - Required to access database (configure in SSMS)
- PASSWORD - Required to access database (configure in SSMS)
- SERVER - Name of server on which system is active (eg, "localhost")
- DATABASE - Name of the database
- DB_PORT - Port on which Database service is running (eg, 1433)
- JWT_SECRET - JWT Secret key (alphanumeric)
- COOKIE_EXPIRE

Place **.env** file in root folder inside backend

## Stack

- ReactJS - Client
- Redux Toolkit + RTK Query - State Management and API
- Nodejs + ExpressJs - Server
- MS SQL Server - Database
- Sequelize - ORM

## Demo

![image](https://user-images.githubusercontent.com/68701271/224245213-97f4c8dc-f64b-4dc4-8476-047762cf3244.png)
![image](https://user-images.githubusercontent.com/68701271/224245292-98c108ca-286c-4c4e-baa4-a85e7212d66c.png)
![image](https://user-images.githubusercontent.com/68701271/224245412-27c9afeb-7ae4-46a2-a420-afaa24f5fb3b.png)
![image](https://user-images.githubusercontent.com/68701271/224245581-826e64e3-20f4-477d-8635-cdbc8b9b172d.png)
![image](https://user-images.githubusercontent.com/68701271/224245634-f9dd35fe-dcd7-4e91-bdff-ef414280a5ab.png)
