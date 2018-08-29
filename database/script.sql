-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema flib
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema flib
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `flib` DEFAULT CHARACTER SET utf8mb4 ;
USE `flib` ;

-- -----------------------------------------------------
-- Table `flib`.`author`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `flib`.`author` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) CHARACTER SET 'utf8' NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `flib`.`book`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `flib`.`book` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) CHARACTER SET 'utf8' NOT NULL,
  `author_id` INT(11) NOT NULL,
  `rating` DOUBLE NOT NULL DEFAULT '2.5',
  `date_added` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_published` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `amount` INT(11) NOT NULL,
  `description` TEXT NOT NULL,
  `cover_image` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `book_author_id_fk` (`author_id` ASC),
  CONSTRAINT `book_author_id_fk`
    FOREIGN KEY (`author_id`)
    REFERENCES `flib`.`author` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `flib`.`type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `flib`.`type` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) CHARACTER SET 'utf8' NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `type_name_uindex` (`name` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `flib`.`book_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `flib`.`book_type` (
  `book_id` INT(11) NOT NULL,
  `type_id` INT(11) NOT NULL,
  PRIMARY KEY (`book_id`, `type_id`),
  INDEX `book_type_type_id_fk` (`type_id` ASC),
  CONSTRAINT `book_type_book_id_fk`
    FOREIGN KEY (`book_id`)
    REFERENCES `flib`.`book` (`id`),
  CONSTRAINT `book_type_type_id_fk`
    FOREIGN KEY (`type_id`)
    REFERENCES `flib`.`type` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `flib`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `flib`.`user` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(60) NOT NULL,
  `full_name` VARCHAR(255) NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(12) NULL DEFAULT NULL,
  `gender` VARCHAR(10) NOT NULL,
  `identity_card` VARCHAR(12) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `flib`.`contribute`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `flib`.`contribute` (
  `user_id` INT(11) NOT NULL,
  `book_id` INT(11) NOT NULL,
  `date_added` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` TINYINT(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`, `book_id`),
  INDEX `fk_user_has_book_book1_idx` (`book_id` ASC),
  INDEX `fk_user_has_book_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_user_has_book_book1`
    FOREIGN KEY (`book_id`)
    REFERENCES `flib`.`book` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_user_has_book_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `flib`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `flib`.`reaction`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `flib`.`reaction` (
  `book_id` INT(11) NOT NULL,
  `user_id` INT(11) NOT NULL,
  `comment` LONGTEXT NOT NULL,
  `rating` DOUBLE NOT NULL DEFAULT '2.5',
  `date_added` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`book_id`, `user_id`),
  INDEX `fk_book_has_user_book1_idx` (`book_id` ASC),
  INDEX `fk_book_has_user_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_book_has_user_book1`
    FOREIGN KEY (`book_id`)
    REFERENCES `flib`.`book` (`id`),
  CONSTRAINT `fk_book_has_user_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `flib`.`user` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `flib`.`role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `flib`.`role` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `flib`.`ticket`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `flib`.`ticket` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `date_added` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` INT(11) NOT NULL,
  `status` INT(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  INDEX `fk_ticket_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_ticket_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `flib`.`user` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `flib`.`ticket_detail`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `flib`.`ticket_detail` (
  `book_id` INT(11) NOT NULL,
  `ticket_id` INT(11) NOT NULL,
  `amount` INT(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`book_id`, `ticket_id`),
  INDEX `fk_book_has_ticket_book1_idx` (`book_id` ASC),
  INDEX `fk_book_has_ticket_ticket1_idx` (`ticket_id` ASC),
  CONSTRAINT `fk_book_has_ticket_book1`
    FOREIGN KEY (`book_id`)
    REFERENCES `flib`.`book` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_book_has_ticket_ticket1`
    FOREIGN KEY (`ticket_id`)
    REFERENCES `flib`.`ticket` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `flib`.`user_role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `flib`.`user_role` (
  `user_id` INT(11) NOT NULL,
  `role_id` INT(11) NOT NULL,
  PRIMARY KEY (`user_id`, `role_id`),
  INDEX `fk_user_has_role_role1_idx` (`role_id` ASC),
  INDEX `fk_user_has_role_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_user_has_role_role1`
    FOREIGN KEY (`role_id`)
    REFERENCES `flib`.`role` (`id`),
  CONSTRAINT `fk_user_has_role_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `flib`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
