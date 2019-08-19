# Create Database and the basket table. 
# User for the Uptain database with select and insert privilegs

Create database if not exists uptain;

CREATE TABLE IF NOT EXISTS uptain.basket (
    BASKET_ID INT AUTO_INCREMENT,
    STUFF VARCHAR(255) NOT NULL,
    PRIMARY KEY (BASKET_ID)
) ;

CREATE  INDEX BASKETSTUFF ON uptain.basket(stuff);

create user 'uptain'@'%' IDENTIFIED WITH mysql_native_password BY <yourpassword>;

grant select, insert on uptain.basket to 'uptain'@'%';