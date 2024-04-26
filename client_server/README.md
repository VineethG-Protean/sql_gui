# MYSQL SERVICES

```
protocol: http
origin: localhost
port: 3001
```


## ROOT ENDPOINTS

#### USER
**Get Mysql Users**\
Method: `POST`\
Path: `/root/user?action="get"`

**Create Myql User**\
Method: `POST`\
Path: `/root/user?action="add"`

```
{
    name:string,
    password:string,
    host:string,
    database:string,
    privileges:string[]
}
```

**Drop Mysql User**\
Method: `POST`\
Path: `/root/user?action="drop"`
```
{
  name:string,
  host:string
}
```

#### DATABASE

**Get Mysql Databases**\
Method: `POST`\
Path: `/root/database?action="get"`

**Get Mysql Database Schema**\
Method: `POST`\
Path: `/root/database?action="schema"`

**Create Mysql Database**\
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

**Drop Mysql Database**\
Method: `POST`\
Path: `/root/database?action="drop"`

**Alter Mysql Database**\
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

**Get All Mysql Tables**\
Method: `POST`\
Path: `/root/table?action="get"`

**Get Mysql Table Schema**\
Method: `POST`\
Path: `/root/table?action="schema"`
```
{
  dbName:string,
  tableName:string
}
```

**Create Mysql Table**\
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

**Drop Mysql Table**\
Method: `POST`\
Path: `/root/table?action="drop"`
```
{
  dbName:string,
  tableName:string
}
```

**Alter Mysql Table Schema**\
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

**Get Mysql Table Data**\
Method: `POST`\
Path: `/root/table/data?action="get"`

```
{
  dbName:string,
  tableName:string
}
```

**Add Mysql Table Data**\
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

**Delete Mysql Table Data**\
Method: `POST`\
Path: `/root/table/data?action="drop"`

```
{
  dbName:string,
  tableName:string,
  row:string
}
```

**Alter Mysql Table Data**\
Method: `PUT`\
Path: `/root/table/data?action="alter"`

```
{
  dbName:string,
  tableName:string,
  alterations:string
}
```

## NON ROOT ENDPOINTS

#### DATABASE

**Get Mysql Databases**\
Method: `POST`\
Path: `/database?action="get"`
```
{
  credentials : {
    host:string,
    username:string,
    password:string,
    database:string
  }
}
```

**Get Mysql Database Schema**\
Method: `POST`\
Path: `/database?action="schema"`
```
{
  credentials : {
    host:string,
    username:string,
    password:string,
    database:string
  }
}
```

**Create Mysql Database**\
Method: `POST`\
Path: `/database?action="add"`

```
{   
  credentials : {
    host:string,
    username:string,
    password:string,
    database:string
  },
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

**Drop Mysql Database**\
Method: `POST`\
Path: `/database?action="drop"`
```
{
  credentials : {
    host:string,
    username:string,
    password:string,
    database:string
  }
}
```

**Alter Mysql Database**\
Method: `POST`\
Path: `/database?action="alter"`

```
{  
  credentials : {
    host:string,
    username:string,
    password:string,
    database:string
  },
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

**Get All Mysql Tables**\
Method: `POST`\
Path: `/table?action="get"`
```
{
  credentials : {
    host:string,
    username:string,
    password:string,
    database:string
  }
}
```

**Get Mysql Table Schema**\
Method: `POST`\
Path: `/table?action="schema"`
```
{
  credentials : {
    host:string,
    username:string,
    password:string,
    database:string
  }
  dbName:string,
  tableName:string
}
```

**Create Mysql Table**\
Method: `POST`\
Path: `/table?action="add"`

```
{
  credentials : {
    host:string,
    username:string,
    password:string,
    database:string
  }
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

**Drop Mysql Table**\
Method: `POST`\
Path: `/table?action="drop"`
```
{
  credentials : {
    host:string,
    username:string,
    password:string,
    database:string
  }
  dbName:string,
  tableName:string
}
```

**Alter Mysql Table Schema**\
Method: `POST`\
Path: `/table?action="alter"`

```
{
  credentials : {
    host:string,
    username:string,
    password:string,
    database:string
  }
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

**Get Mysql Table Data**\
Method: `POST`\
Path: `/table/data?action="get"`

```
{
  credentials : {
    host:string,
    username:string,
    password:string,
    database:string
  }
  dbName:string,
  tableName:string
}
```

**Add Mysql Table Data**\
Method: `POST`\
Path: `/table/data?action="add"`

```
{
  credentials : {
    host:string,
    username:string,
    password:string,
    database:string
  }
  dbName:string,
  tableName:string
  data: [
    row:string,
    data:string
  ]
}
```

**Delete Mysql Table Data**\
Method: `POST`\
Path: `/table/data?action="drop"`

```
{
  credentials : {
    host:string,
    username:string,
    password:string,
    database:string
  }
  dbName:string,
  tableName:string,
  row:string
}
```

**Alter Mysql Table Data**\
Method: `PUT`\
Path: `/table/data?action="alter"`

```
{
  credentials : {
    host:string,
    username:string,
    password:string,
    database:string
  }
  dbName:string,
  tableName:string,
  alterations:string
}
```