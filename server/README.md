```
protocol: http
origin: localhost
port: 3000
```

## AUTH ENDPOINTS

**User Login**\
Method: `POST`\
Path : `/auth/login`

```
{
  username:string,
  password:string,
}
```

**Authentication Verification**\
Method: `GET`\
Path: `/auth/verify?token=<token>`

## ADMIN ENDPOINTS

**Get All Users**\
Method: `GET`\
Path: `/admin/users`

**Invite User**\
Method: `POST`\
Path: `/admin/user/invite`

```
{
  name:string,
}
```

**Update User**\
Method: `PUT`\
Path: `/admin/user`

**Delete User**\
Method: `DELETE`\
Path : `/admin/user/id`

**Create Server**\
Method: `POST`\
Path: `/admin/server`

**Update Server**\
Method: `PUT`\
Path: `/admin/server`

**Delete Server**\
Method: `DELETE`\
Path: `/admin/server/id`

## USER ENDPOINTS

**Get User**\
Method: `GET`\
Path: `/user`

**Get Servers**\
Method: `GET`\
Path: `/user/servers`

## MYSQL STATS ENDPOINTS

**Check Connection**\
Method: `POST`\
Path: `/mysql/stats/connect`

**Get Mysql Stats**\
Method: `POST`\
Path: `/mysql/stats/`

## MYSQL USERS ENDPOINTS

**Get Mysql Users**\
Method: `POST`\
Path: `/mysql/user?action="get"`

```
{
  server_id:string,
}
```

**Create Mysql User**\
Method: `POST`\
Path: `/mysql/user?action="add"`

```
{
  server_id:string,
  name:string,
  password:string,
  host:string,
  database:string
  privileges:string[]
}
```

**Drop Mysql User**\
Method: `POST`\
Path: `/mysql/user?action="drop"`

```
{
  server_id:string,
  name:string,
  host:string
}
```

## MYSQL DATABASE ENDPOINTS

**Get Mysql Databases**\
Method: `POST`\
Path: `/mysql/database?action="get"`

```
{
  server_id:string
}
```

**Get Mysql Schema**\
Method: `POST`\
Path: `/mysql/database?action="schema"`

```
{
  server_id:string,
  databaseName:string
}
```

**Get Mysql Database Users**\
Method: `POST`\
Path: `/mysql/database?action="users"`

**Create Mysql Database**\
Method: `POST`\
Path: `/mysql/database?action="add"`

**Drop Mysql Database**\
Method: `POST`\
Path: `/mysql/database/action="drop"`

**Update Mysql Database**\
Method: `POST`\
Path: `/mysql/database?action="alter"`

## MYSQL TABLE ENDPOINTS

**Get Mysql Tables**\
Method: `POST`\
Path: `/mysql/table?action="get"`

GET: /mysql/table?action=schema

**Create Mysql Table**\
Method: `POST`\
Path: `/mysql/table?action="add"`

**Drop Mysql Table**\
Method: `POST`\
Path: `/mysql/table?action="drop"`

**Alter Mysql Table**\
Method: `POST`\
Path: `/mysql/table?action="alter"`

## MYSQL TABLE DATA

GET: /mysql/table/data?action=get
GET: /mysql/table/data?action=schema
POST: /mysql/table/data?action=add
DELETE: /mysql/table/data?action=drop
PUt: /mysql/table/data?action=alter
