create database sqldemo;

create table customers(id VARCHAR(40) default (uuid()) not null primary key,cusname varchar(500) not null,contact varchar(11) not null);

insert into customers(cusname,contact) values('sagar', '1234567890');

drop table customers;

UPDATE Customers
SET ContactName = 'Alfred Schmidt', City = 'Frankfurt'
WHERE CustomerID = 1;

DELETE FROM customers WHERE id = 1;

SELECT * FROM customers WHERE id = 1;