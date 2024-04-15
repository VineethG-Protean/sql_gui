GET: http://localhost:3001/server/connect
GET: http://localhost:3001/server/stats

GET: http://localhost:3001/server/mysql/users
POST: http://localhost:3001/server/mysql/users/create
DELETE: http://localhost:3001/server/mysql/users/${user}

# USER ROLES

## ADMIN

## SERVER ADMIN

- GLOBAL PRIVILEGES
- DATABASE PRIVILAGES

## DATABASE ADMIN

- TABLE PRIVILAGES

## BACKUP

- BACKUP PRIVILAGES

## USER_L1

- LIMITED TABLE PRIVILAGES (R / W)

## USER_L2

- LIMITED TABLE PRIVILAGES (R)

# Global Privileges:

- CREATE USER: Allows the user to create new user accounts.
- DROP USER: Allows the user to delete user accounts.
- RELOAD: Allows the user to execute the FLUSH statement to reload server settings.
- SHUTDOWN: Allows the user to shut down the MySQL server.
- PROCESS: Allows the user to view the currently executing processes.
- SUPER: Allows the user to perform administrative tasks. This includes killing processes, setting global variables, etc.
- SHOW DATABASES: Allows the user to see all databases on the server.
- REPLICATION CLIENT: Allows the user to ask where the slave or master servers are.
- REPLICATION SLAVE: Needed for replication slaves to read binary log events from the master.
- CREATE TEMPORARY TABLES: Allows the user to create temporary tables.

# Database Privileges:

- CREATE: Allows the user to create new databases.
- ALTER: Allows the user to alter existing databases.
- DROP: Allows the user to drop databases.
- SHOW VIEW: Allows the user to see views within databases.
- EVENT: Allows the user to create, alter, drop, and execute events.

# Table Privileges:

- SELECT: Allows the user to read data from tables.
- INSERT: Allows the user to insert data into tables.
- UPDATE: Allows the user to update existing data in tables.
- DELETE: Allows the user to delete data from tables.
- CREATE VIEW: Allows the user to create views.
- ALTER VIEW: Allows the user to alter views.
- DROP VIEW: Allows the user to drop views.
- CREATE TABLE: Allows the user to create new tables.
- ALTER TABLE: Allows the user to alter existing tables.
- INDEX: Allows the user to create and drop indexes.

# Routine Privileges (Stored Procedures and Functions):

- CREATE ROUTINE: Allows the user to create stored procedures and functions.
- ALTER ROUTINE: Allows the user to alter existing stored procedures and functions.
- EXECUTE: Allows the user to execute stored procedures and functions.
- DROP ROUTINE: Allows the user to drop stored procedures and functions.
