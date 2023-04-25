-- MySQL Workbench Forward Engineering
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
-- -----------------------------------------------------
-- Schema freelance
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema freelance
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `freelance` DEFAULT CHARACTER SET utf8 ;
USE `freelance` ;
-- -----------------------------------------------------
-- Table `freelance`.`client`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `freelance`.`client` (
  `idclient` INT NOT NULL AUTO_INCREMENT,
  `firstnameclient` VARCHAR(45) NOT NULL,
  `lastnameclient` VARCHAR(45) NOT NULL,
  `emailclient` VARCHAR(45) NOT NULL,
  `passwordclient` VARCHAR(45) NOT NULL,
  `imgclient` LONGTEXT NOT NULL,
  `birthclient` INT(16) NOT NULL,
  UNIQUE INDEX `idclient_UNIQUE` (`idclient` ASC) VISIBLE,
  PRIMARY KEY (`idclient`),
  UNIQUE INDEX `emailclient_UNIQUE` (`emailclient` ASC) VISIBLE)
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `freelance`.`Freelancer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `freelance`.`Freelancer` (
  `idFreelancer` INT NOT NULL AUTO_INCREMENT,
  `firstnamefreelancer` VARCHAR(45) NOT NULL,
  `lastnamefreelancer` VARCHAR(45) NOT NULL,
  `emailfreelancer` VARCHAR(45) NOT NULL,
  `passwordfreelancer` VARCHAR(45) NOT NULL,
  `imgfreelancer` LONGTEXT NOT NULL,
  `numfreelancer` INT(16) NOT NULL,
  `birthfreelancer` DATE NOT NULL,
  `aboutfreelancer` LONGTEXT NOT NULL,
  `skillsfreelancer` LONGTEXT NOT NULL,
  `langfreelancer` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idFreelancer`),
  UNIQUE INDEX `idFreelancer_UNIQUE` (`idFreelancer` ASC) VISIBLE,
  UNIQUE INDEX `numfreelancer_UNIQUE` (`numfreelancer` ASC) VISIBLE,
  UNIQUE INDEX `emailfreelancer_UNIQUE` (`emailfreelancer` ASC) VISIBLE)
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `freelance`.`experience`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `freelance`.`experience` (
  `idexperience` INT NOT NULL AUTO_INCREMENT,
  `start` DATE NOT NULL,
  `end` DATE NOT NULL,
  `position` VARCHAR(45) NOT NULL,
  `companyname` VARCHAR(45) NOT NULL,
  `city` VARCHAR(45) NOT NULL,
  `department` VARCHAR(45) NOT NULL,
  `description` LONGTEXT NULL,
  `salaire` INT(25) NOT NULL,
  `Skillsknowledge` LONGTEXT NULL,
  `Freelancer_idFreelancer` INT NOT NULL,
  PRIMARY KEY (`idexperience`),
  INDEX `fk_experience_Freelancer_idx` (`Freelancer_idFreelancer` ASC) VISIBLE,
  CONSTRAINT `fk_experience_Freelancer`
    FOREIGN KEY (`Freelancer_idFreelancer`)
    REFERENCES `freelance`.`Freelancer` (`idFreelancer`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `freelance`.`education`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `freelance`.`education` (
  `ideducation` INT NOT NULL AUTO_INCREMENT,
  `institutiontype` VARCHAR(45) NOT NULL,
  `domain` VARCHAR(45) NOT NULL,
  `city` VARCHAR(45) NOT NULL,
  `Freelancer_idFreelancer` INT NOT NULL,
  PRIMARY KEY (`ideducation`),
  INDEX `fk_education_Freelancer1_idx` (`Freelancer_idFreelancer` ASC) VISIBLE,
  CONSTRAINT `fk_education_Freelancer1`
    FOREIGN KEY (`Freelancer_idFreelancer`)
    REFERENCES `freelance`.`Freelancer` (`idFreelancer`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `freelance`.`postclient`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `freelance`.`postclient` (
  `idpostclient` INT NOT NULL AUTO_INCREMENT,
  `titlepost` VARCHAR(45) NOT NULL,
  `descriptionpost` VARCHAR(45) NOT NULL,
  `imgpost` LONGTEXT NULL,
  `client_idclient` INT NOT NULL,
  PRIMARY KEY (`idpostclient`),
  INDEX `fk_postclient_client1_idx` (`client_idclient` ASC) VISIBLE,
  CONSTRAINT `fk_postclient_client1`
    FOREIGN KEY (`client_idclient`)
    REFERENCES `freelance`.`client` (`idclient`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `freelance`.`postfreelancer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `freelance`.`postfreelancer` (
  `idpostfreelancer` INT NOT NULL AUTO_INCREMENT,
  `tittlepostfreelancer` VARCHAR(45) NOT NULL,
  `discpostfreelancer` VARCHAR(45) NOT NULL,
  `imgpostfreelancer` VARCHAR(45) NOT NULL,
  `price` INT(10) NOT NULL,
  `Freelancer_idFreelancer` INT NOT NULL,
  PRIMARY KEY (`idpostfreelancer`),
  INDEX `fk_postfreelancer_Freelancer1_idx` (`Freelancer_idFreelancer` ASC) VISIBLE,
  CONSTRAINT `fk_postfreelancer_Freelancer1`
    FOREIGN KEY (`Freelancer_idFreelancer`)
    REFERENCES `freelance`.`Freelancer` (`idFreelancer`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `freelance`.`rate`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `freelance`.`rate` (
  `idrate` INT NOT NULL AUTO_INCREMENT,
  `rate` INT(1) NOT NULL,
  `textrate` VARCHAR(255) NOT NULL,
  `postfreelancer_idpostfreelancer` INT NOT NULL,
  `client_idclient` INT NOT NULL,
  PRIMARY KEY (`idrate`),
  INDEX `fk_rate_postfreelancer1_idx` (`postfreelancer_idpostfreelancer` ASC) VISIBLE,
  INDEX `fk_rate_client1_idx` (`client_idclient` ASC) VISIBLE,
  CONSTRAINT `fk_rate_postfreelancer1`
    FOREIGN KEY (`postfreelancer_idpostfreelancer`)
    REFERENCES `freelance`.`postfreelancer` (`idpostfreelancer`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_rate_client1`
    FOREIGN KEY (`client_idclient`)
    REFERENCES `freelance`.`client` (`idclient`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `freelance`.`Freelancer_has_client`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `freelance`.`Freelancer_has_client` (
  `Freelancer_idFreelancer` INT NOT NULL,
  `client_idclient` INT NOT NULL,
  PRIMARY KEY (`Freelancer_idFreelancer`, `client_idclient`),
  INDEX `fk_Freelancer_has_client_client1_idx` (`client_idclient` ASC) VISIBLE,
  INDEX `fk_Freelancer_has_client_Freelancer1_idx` (`Freelancer_idFreelancer` ASC) VISIBLE,
  CONSTRAINT `fk_Freelancer_has_client_Freelancer1`
    FOREIGN KEY (`Freelancer_idFreelancer`)
    REFERENCES `freelance`.`Freelancer` (`idFreelancer`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Freelancer_has_client_client1`
    FOREIGN KEY (`client_idclient`)
    REFERENCES `freelance`.`client` (`idclient`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;