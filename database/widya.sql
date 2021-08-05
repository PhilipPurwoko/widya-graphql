-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema widya
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema widya
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `widya` DEFAULT CHARACTER SET utf8 ;
USE `widya` ;

-- -----------------------------------------------------
-- Table `widya`.`course`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `widya`.`course` (
  `c_id` VARCHAR(36) NOT NULL,
  `c_name` VARCHAR(45) NOT NULL,
  `c_description` VARCHAR(200) NOT NULL,
  `c_price` INT NOT NULL,
  PRIMARY KEY (`c_id`),
  UNIQUE INDEX `idcourse_UNIQUE` (`c_id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `widya`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `widya`.`user` (
  `u_id` VARCHAR(36) NOT NULL,
  `u_name` VARCHAR(45) NOT NULL,
  `u_email` VARCHAR(45) NOT NULL,
  `u_password` VARCHAR(36) NOT NULL,
  PRIMARY KEY (`u_id`),
  UNIQUE INDEX `u_id_UNIQUE` (`u_id` ASC) VISIBLE,
  UNIQUE INDEX `u_email_UNIQUE` (`u_email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `widya`.`subscription`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `widya`.`subscription` (
  `c_id` VARCHAR(36) NOT NULL,
  `u_id` VARCHAR(36) NOT NULL,
  `sub_expiration` DATETIME NOT NULL,
  PRIMARY KEY (`c_id`, `u_id`),
  INDEX `fk_course_has_user_user1_idx` (`u_id` ASC) VISIBLE,
  INDEX `fk_course_has_user_course_idx` (`c_id` ASC) VISIBLE,
  CONSTRAINT `fk_course_has_user_course`
    FOREIGN KEY (`c_id`)
    REFERENCES `widya`.`course` (`c_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_course_has_user_user1`
    FOREIGN KEY (`u_id`)
    REFERENCES `widya`.`user` (`u_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `widya`.`review`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `widya`.`review` (
  `c_id` VARCHAR(36) NOT NULL,
  `u_id` VARCHAR(36) NOT NULL,
  `r_text` VARCHAR(255) NULL,
  `r_star` INT(5) NOT NULL,
  PRIMARY KEY (`c_id`, `u_id`),
  INDEX `fk_course_has_user_user2_idx` (`u_id` ASC) VISIBLE,
  INDEX `fk_course_has_user_course1_idx` (`c_id` ASC) VISIBLE,
  CONSTRAINT `fk_course_has_user_course1`
    FOREIGN KEY (`c_id`)
    REFERENCES `widya`.`course` (`c_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_course_has_user_user2`
    FOREIGN KEY (`u_id`)
    REFERENCES `widya`.`user` (`u_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `widya`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `widya`.`category` (
  `cat_id` VARCHAR(36) NOT NULL,
  `cat_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`cat_id`),
  UNIQUE INDEX `cat_id_UNIQUE` (`cat_id` ASC) VISIBLE,
  UNIQUE INDEX `cat_name_UNIQUE` (`cat_name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `widya`.`course_has_category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `widya`.`course_has_category` (
  `c_id` VARCHAR(36) NOT NULL,
  `cat_id` VARCHAR(36) NOT NULL,
  PRIMARY KEY (`c_id`, `cat_id`),
  INDEX `fk_course_has_category_category1_idx` (`cat_id` ASC) VISIBLE,
  INDEX `fk_course_has_category_course1_idx` (`c_id` ASC) VISIBLE,
  CONSTRAINT `fk_course_has_category_course1`
    FOREIGN KEY (`c_id`)
    REFERENCES `widya`.`course` (`c_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_course_has_category_category1`
    FOREIGN KEY (`cat_id`)
    REFERENCES `widya`.`category` (`cat_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `widya`.`prefered`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `widya`.`prefered` (
  `u_id` VARCHAR(36) NOT NULL,
  `cat_id` VARCHAR(36) NOT NULL,
  PRIMARY KEY (`u_id`, `cat_id`),
  INDEX `fk_user_has_category_category1_idx` (`cat_id` ASC) VISIBLE,
  INDEX `fk_user_has_category_user1_idx` (`u_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_has_category_user1`
    FOREIGN KEY (`u_id`)
    REFERENCES `widya`.`user` (`u_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_category_category1`
    FOREIGN KEY (`cat_id`)
    REFERENCES `widya`.`category` (`cat_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `widya`.`favorite`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `widya`.`favorite` (
  `u_id` VARCHAR(36) NOT NULL,
  `c_id` VARCHAR(36) NOT NULL,
  PRIMARY KEY (`u_id`, `c_id`),
  INDEX `fk_user_has_course_course1_idx` (`c_id` ASC) VISIBLE,
  INDEX `fk_user_has_course_user1_idx` (`u_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_has_course_user1`
    FOREIGN KEY (`u_id`)
    REFERENCES `widya`.`user` (`u_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_course_course1`
    FOREIGN KEY (`c_id`)
    REFERENCES `widya`.`course` (`c_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `widya`.`course_section`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `widya`.`course_section` (
  `cs_id` VARCHAR(36) NOT NULL,
  `cs_name` VARCHAR(45) NOT NULL,
  `cs_description` VARCHAR(100) NULL,
  `c_id` VARCHAR(36) NOT NULL,
  PRIMARY KEY (`cs_id`),
  UNIQUE INDEX `cs_id_UNIQUE` (`cs_id` ASC) VISIBLE,
  INDEX `fk_course_section_course1_idx` (`c_id` ASC) VISIBLE,
  UNIQUE INDEX `cs_name_UNIQUE` (`cs_name` ASC) VISIBLE,
  CONSTRAINT `fk_course_section_course1`
    FOREIGN KEY (`c_id`)
    REFERENCES `widya`.`course` (`c_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `widya`.`course_module`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `widya`.`course_module` (
  `cm_id` VARCHAR(36) NOT NULL,
  `cm_name` VARCHAR(45) NOT NULL,
  `cs_id` VARCHAR(36) NOT NULL,
  PRIMARY KEY (`cm_id`),
  UNIQUE INDEX `cm_id_UNIQUE` (`cm_id` ASC) VISIBLE,
  UNIQUE INDEX `cm_name_UNIQUE` (`cm_name` ASC) VISIBLE,
  INDEX `fk_course_module_course_section1_idx` (`cs_id` ASC) VISIBLE,
  CONSTRAINT `fk_course_module_course_section1`
    FOREIGN KEY (`cs_id`)
    REFERENCES `widya`.`course_section` (`cs_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
