CREATE TABLE IF NOT EXISTS `customers` (
    id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    active BOOLEAN DEFAULT false
) ENGINE=InnoDB DEFAULT CHARSET=utf8;