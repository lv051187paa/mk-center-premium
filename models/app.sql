CREATE TABLE `mkcente2_mk_center`.`reviews` (`name` TINYTEXT NOT NULL , `review_text` TINYTEXT NOT NULL , `email` TINYTEXT NOT NULL , `id` INT NOT NULL AUTO_INCREMENT , PRIMARY KEY (`id`)) ENGINE = InnoDB;

ALTER TABLE `mkcente2_mk_center`.`reviews` ADD `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP AFTER `email`;
