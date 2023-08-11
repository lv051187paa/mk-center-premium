CREATE TABLE `mkcenter_premium`.`reviews` (`name` TINYTEXT NOT NULL , `review_text` TINYTEXT NOT NULL , `email` TINYTEXT NOT NULL , `id` INT NOT NULL AUTO_INCREMENT , PRIMARY KEY (`id`)) ENGINE = InnoDB;

ALTER TABLE `mkcenter_premium`.`reviews` ADD `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP AFTER `email`;
