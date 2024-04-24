## AUTH

http://localhost:3000/auth/login
http://localhost:3000/auth/verify?token=?

## ADMIN

GET: http://localhost:3000/admin/users
POST: http://localhost:3000/admin/user/invite
PUT: http://localhost:3000/admin/user
DELETE: http://localhost:3000/admin/user/id
POST: http://localhost:3000/admin/server
PUT: http://localhost:3000/admin/server
DELETE: http://localhost:3000/admin/server/id

## USER

GET: http://localhost:3000/user
GET: http://localhost:3000/user/servers

## MYSQL USERS

GET: http://localhost:3000/mysql/user/server_id
POST: http://localhost:3000/mysql/user/server_id
DELETE: http://localhost:3000/mysql/user/server_id

## MYSQL DATABASE

GET: http://localhost:3000/mysql/database/server_id
GET: http://localhost:3000/mysql/database/server_id?dbName=?
DELETE: http://localhost:3000/mysql/database/server_id?dbName=?
PUT: http://localhost:3000/mysql/database/server_id
