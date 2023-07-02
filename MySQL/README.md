# [MySQL](https://www.udemy.com/course/sql-mysql)

# Introduction and Installation

## Install MySQL on Mac by Docker

Install MySQL Image

```bash
docker run --name udemy-mysql -p 3306:3306 -p 33060:33060 -v /Users/...udemy-mysql-volume:/root -e MYSQL_ROOT_PASSWORD=1234 -d mysql:8
```

Enter MySQL Container

```bash
docker exec -it udemy-mysql bash
```

Enter MySQL

```bash
mysql -u root -p
```

## SQL Cheet Sheet

Made by [Swapna Kumar Panda](https://twitter.com/swapnakpanda/status/1650118619777384449/photo/1).

![SQL Cheet Sheet](./assets/sql-cheetsheet.jpeg)

# Database and Tables

結束的分號可以改變為其他符號，例如 `$$` 。

```sql
delimiter $$
```

## [Data Types](https://dev.mysql.com/doc/refman/8.0/en/data-types.html)

### [The ENUM Type](https://dev.mysql.com/doc/refman/8.0/en/enum.html)

ENUM 可以讓你限制欄位的值只能是你指定的值。

```sql
CREATE employee (
    gender ENUM('M', 'F')
);
```

## Basic Commands

查看 table 的 schema，也可以用 `DESC` 。

```sql
DESCRIBE table_name;
```

# Date Insertion

多可以一次插入多筆資料。

```sql
INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...),
       (value1, value2, value3, ...),
       (value1, value2, value3, ...),
       ...
```

## NULL and NOT NULL

MySQL 預設欄位是允許 `NULL` 且如果 insert 時沒有給值，欄位預設值就是 `NULL` 。

可以將欄位設定為 `NOT NULL` ，這樣 insert 時就必須給值。

```sql
CREATE table table_name
(
    column_name data_type NOT NULL
);
```

`Mandatory field` 是指 insert 時必須給值的欄位。


## Default Values

可以設定欄位的預設值。

```sql
CREATE table table_name
(
    column_name data_type DEFAULT default_value
);
```

## Primary Key

可以設定欄位為 Primary Key ，這樣就可以保證欄位的值是唯一。

```sql
CREATE table table_name
(
    column_name data_type PRIMARY KEY
);
```

如果欄位被設定成 Primary Key ，那麼 Insert 時欄位就不能是 `NULL` 且不能有重複的值。

### Composite Primary Key

如果多個欄位組合起來才能保證唯一，那麼就可以將多個欄位設定為 Primary Key 。在 insert 時，這些欄位的組合就必須是唯一的。

```sql
CREATE table table_name
(
    column_name1 data_type,
    column_name2 data_type,
    PRIMARY KEY (column_name1, column_name2)
);
```

## Auto Increment

可以設定欄位為 Auto Increment ，每次 insert 時欄位的值就會自動增加。

```sql
CREATE table table_name
(
    column_name data_type AUTO_INCREMENT
);
```

通常搭配 Primary Key 使用，這樣就可以保證欄位的值是唯一的且會自動增加。用於設定每筆資料的 ID 。

```sql
CREATE table table_name
(
    id INT AUTO_INCREMENT,
    PRIMARY KEY (id)
); 
```

如果想將欄位設定為 Auto Increment ，那麼該欄位必須是 Primary Key 或是 Unique 。

## Unique

可以設定欄位為 Unique ，這樣就可以保證欄位的值是唯一的。

```sql
CREATE table table_name
(
    column_name data_type UNIQUE
);
```

與 PRIMARY KEY 不同的是，欄位可以是 `NULL` ，當欄位是 `NULL` 時，就不會檢查是否有重複的值（多筆資料該欄位可以都是 `NULL` ）。

# CRUD

## 資料匯入

可以使用 `source` 指令匯入資料。

```sql
source /Users/.../data.sql
```

## Update

要注意如果沒加 `WHERE` ，就會將整個欄位的值都改掉。

```sql
UPDATE table_name
SET column_name = value
WHERE condition;
```

## IF NOT EXISTS

如果資料不存在，就新增。也可以用於創建 table 的時候。

```sql
CREATE TABLE IF NOT EXISTS employee(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  title VARCHAR(100) DEFAULT NULL,
  salary DOUBLE DEFAULT NULL,
  hire_date DATE NOT NULL,
  notes TEXT,
  PRIMARY KEY (id)
);
```

# Handling Strings

在 select 時，可以把欄位用某個 function 包起來，這樣就可以對欄位做處理。
    
```sql
select some_fun(colum_name,..) as new column_name from table_name;
```


## Concat

### Concatenate Strings

```sql
select CONCAT(first_name, " ", last_name) as full_name from employee;
```

### Concatenate Strings with Separator

```sql
select CONCAT_WS("-", first_name, last_name) as full_name from employee;
```

## Substring

要注意起始是 1 ，不是 0 。

```sql
select SUBSTRING(first_name, 1, 4) from employee;
```

## Replace

不支援 Regex。

# Refining Selections



