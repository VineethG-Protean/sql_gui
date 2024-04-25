# MYSQL SERVICES

```
protocol: http
origin: localhost
port: 3001
```


## ROOT ENDPOINTS

#### USER
**Get all mysql users**\
Method: `GET`\
Path: `/root/user`

**Create a mysql user**\
Method: `POST`\
Path: `/root/user`

```
{
    name:string,
    password:string,
    host:string,
    database:string,
    privileges:string[]
}
```

**Drop a mysql user**\
Method: `POST`\
Path: `/root/user/delete`
```
{
  name:string,
  host:string
}
```

#### DATABASE

**Get all databases**\
Method: `POST`\
Path: `/root/database?action="get"`

**Get individual database information**\
Method: `POST`\
Path: `/root/database?action="schema"`

**Create a new database**\
Method: `POST`\
Path: `/root/database?action="add"`

```
{
    name:string,
    characterSet:string,
    defaultCharSet:string,
    collate:string,
    defaultCollate:string,
    encryption:string,
    defaultEncryption:string,
    engine:string
}
```

**Drop a database**\
Method: `POST`\
Path: `/root/database?action="drop"`

**Alter a database**\
Method: `POST`\
Path: `/root/database?action="alter"`

```
{
    name:string,
    characterSet:string,
    defaultCharSet:string,
    collate:string,
    defaultCollate:string,
    encryption:string,
    defaultEncryption:string,
    engine:string
}
```

#### TABLE

**Get All Tables**\
Method: `POST`\
Path: `/root/table?action="get"`

**Get table schema**\
Method: `POST`\
Path: `/root/table?action="schema"`
```
{
  dbName:string,
  tableName:string
}
```

**Create a table**\
Method: `POST`\
Path: `/root/table?action="add"`

```
{
    databaseName:string,
    tableName:string
    columns: [
        {
            columnName:string,
            dataType:string,
            constraints:string[],
            key:string
        }
    ]
}
```

**Drop a table**\
Method: `POST`\
Path: `/root/table?action="drop"`
```
{
  dbName:string,
  tableName:string
}
```

**Alter Table Schema**\
Method: `POST`\
Path: `/root/table?action="alter"`

```
{
    databaseName:string,
    tableName:string,
    alterations:[
        {
            type:string,
            columnName:string,
            newColumnName:string,
            dataType:string,
            constraints:string[]
        }
    ]
}
```

#### TABLE DATA

**Get Table Data**\
Method: `POST`\
Path: `/root/table/data?action="get"`

```
{
  dbName:string,
  tableName:string
}
```

**Add Table Data**\
Method: `POST`\
Path: `/root/table/data?action="add"`

```
{
  dbName:string,
  tableName:string
  data: [
    row:string,
    data:string
  ]
}
```

**Delete Table Data**\
Method: `POST`\
Path: `/root/table/data?action="drop"`

```
{
  dbName:string,
  tableName:string,
  row:string
}
```

**Alter Table Data**\
Method: `PUT`\
Path: `/root/table/data?action="alter"`

```
{
  dbName:string,
  tableName:string,
  alterations:string
}
```