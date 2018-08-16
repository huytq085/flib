-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema flib
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema flib
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `flib` DEFAULT CHARACTER SET utf32 ;
USE `flib` ;

-- -----------------------------------------------------
-- Table `flib`.`book`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `flib`.`book` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` NVARCHAR(255) NOT NULL,
  `author` NVARCHAR(255) NOT NULL,
  `rating` DOUBLE NOT NULL DEFAULT 2.5,
  `date_added` DATETIME NOT NULL DEFAULT now(),
  `date_published` DATETIME NOT NULL DEFAULT now(),
  `amount` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `flib`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `flib`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `full_name` NVARCHAR(100) NOT NULL,
  `address` NVARCHAR(255) NOT NULL,
  `gender` VARCHAR(10) NOT NULL,
  `identity_card` VARCHAR(12) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `flib`.`role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `flib`.`role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `flib`.`ticket`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `flib`.`ticket` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date_added` DATETIME NOT NULL DEFAULT now(),
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_ticket_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_ticket_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `flib`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `flib`.`ticket_detail`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `flib`.`ticket_detail` (
  `book_id` INT NOT NULL,
  `ticket_id` INT NOT NULL,
  `amount` INT NOT NULL DEFAULT 1,
  PRIMARY KEY (`book_id`, `ticket_id`),
  INDEX `fk_book_has_ticket_ticket1_idx` (`ticket_id` ASC),
  INDEX `fk_book_has_ticket_book1_idx` (`book_id` ASC),
  CONSTRAINT `fk_book_has_ticket_book1`
    FOREIGN KEY (`book_id`)
    REFERENCES `flib`.`book` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_book_has_ticket_ticket1`
    FOREIGN KEY (`ticket_id`)
    REFERENCES `flib`.`ticket` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `flib`.`user_role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `flib`.`user_role` (
  `user_id` INT NOT NULL,
  `role_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `role_id`),
  INDEX `fk_user_has_role_role1_idx` (`role_id` ASC),
  INDEX `fk_user_has_role_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_user_has_role_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `flib`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_role_role1`
    FOREIGN KEY (`role_id`)
    REFERENCES `flib`.`role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `flib`.`reaction`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `flib`.`reaction` (
  `book_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `comment` LONGTEXT NOT NULL,
  `rating` DOUBLE NOT NULL DEFAULT 2.5,
  `date_added` DATETIME NOT NULL DEFAULT now(),
  `date_updated` DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY (`book_id`, `user_id`),
  INDEX `fk_book_has_user_user1_idx` (`user_id` ASC),
  INDEX `fk_book_has_user_book1_idx` (`book_id` ASC),
  CONSTRAINT `fk_book_has_user_book1`
    FOREIGN KEY (`book_id`)
    REFERENCES `flib`.`book` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_book_has_user_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `flib`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `flib`.`contribute`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `flib`.`contribute` (
  `user_id` INT NOT NULL,
  `book_id` INT NOT NULL,
  `date_added` DATETIME NOT NULL DEFAULT now(),
  `status` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`user_id`, `book_id`),
  INDEX `fk_user_has_book_book1_idx` (`book_id` ASC),
  INDEX `fk_user_has_book_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_user_has_book_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `flib`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_book_book1`
    FOREIGN KEY (`book_id`)
    REFERENCES `flib`.`book` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
