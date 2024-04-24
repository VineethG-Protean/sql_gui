# MYSQL SERVICES

```
protocol: http
origin: localhost
port: 3001
```

---

## ROOT ENDPOINTS

#### USER

Get all mysql users
Method: `GET`
Path: `/root/user`

Create a mysql user
Method: `POST`
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

Drop a mysql user
Method: `DELETE`
Path: `/root/user&name=?&host=?`

#### DATABASE

Get all databases
Method: `GET`
Path: `/root/database`

Get individual database information
Method: `GET`
Path: `/root/database/info&dbName=?`

Create a new database
Method: `GET`
Path: `/root/database`

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

Drop a database
Method: `DELETE`
Path: `/root/database/drop&dbName=?`

Alter a database
Method: `PUT`
Path: `/root/database`

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

Get all tables
Method: `GET`
Path: `/root/table&dbName=?`

Get table schema
Method: `GET`
Path: `/root/table/schema&dbName=?&tableName=?`

Create a table
Method: `POST`
Path: `/root/table`

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

Drop a table
Method: `DELETE`
Path: `/root/table&dbName=?&tableName=?`

Alter Table Schema
Method: `PUT`
Path: `/root/table`

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
