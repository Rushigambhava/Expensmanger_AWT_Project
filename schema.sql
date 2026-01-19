-- Database creation
CREATE DATABASE IF NOT EXISTS expense_manager;
USE expense_manager;

-- ==========================================
-- 1. Users Table
-- ==========================================
CREATE TABLE users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    UserName VARCHAR(250) NOT NULL,
    EmailAddress VARCHAR(500) NOT NULL UNIQUE,
    Password VARCHAR(50) NOT NULL,
    MobileNo VARCHAR(50) NOT NULL,
    ProfileImage VARCHAR(500),
    Created DATETIME DEFAULT CURRENT_TIMESTAMP,
    Modified DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ==========================================
-- 2. Peoples Table
-- ==========================================
CREATE TABLE peoples (
    PeopleID INT AUTO_INCREMENT PRIMARY KEY,
    PeopleCode VARCHAR(50),
    Password VARCHAR(50), -- Note: Storing plain text or hash? assumed varchar based on doc
    PeopleName VARCHAR(250) NOT NULL,
    Email VARCHAR(150),
    MobileNo VARCHAR(50),
    Description VARCHAR(500),
    UserID INT NOT NULL,
    Created DATETIME DEFAULT CURRENT_TIMESTAMP,
    Modified DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    IsActive BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (UserID) REFERENCES users(UserID) ON DELETE CASCADE
);

-- ==========================================
-- 3. Projects Table
-- ==========================================
CREATE TABLE projects (
    ProjectID INT AUTO_INCREMENT PRIMARY KEY,
    ProjectName VARCHAR(250) NOT NULL,
    ProjectLogo VARCHAR(250),
    ProjectStartDate DATETIME,
    ProjectEndDate DATETIME,
    ProjectDetail VARCHAR(500),
    Description VARCHAR(500),
    UserID INT NOT NULL,
    Created DATETIME DEFAULT CURRENT_TIMESTAMP,
    Modified DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    IsActive BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (UserID) REFERENCES users(UserID) ON DELETE CASCADE
);

-- ==========================================
-- 4. Categories Table
-- ==========================================
CREATE TABLE categories (
    CategoryID INT AUTO_INCREMENT PRIMARY KEY,
    CategoryName VARCHAR(250) NOT NULL,
    LogoPath VARCHAR(250),
    IsExpense BOOLEAN NOT NULL DEFAULT FALSE,
    IsIncome BOOLEAN NOT NULL DEFAULT FALSE,
    IsActive BOOLEAN NOT NULL DEFAULT TRUE,
    Description VARCHAR(500),
    UserID INT NOT NULL,
    Created DATETIME DEFAULT CURRENT_TIMESTAMP,
    Modified DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    Sequence DECIMAL(10, 2),
    FOREIGN KEY (UserID) REFERENCES users(UserID) ON DELETE CASCADE
);

-- ==========================================
-- 5. SubCategories Table
-- ==========================================
CREATE TABLE sub_categories (
    SubCategoryID INT AUTO_INCREMENT PRIMARY KEY,
    CategoryID INT NOT NULL,
    SubCategoryName VARCHAR(250) NOT NULL,
    LogoPath VARCHAR(250),
    IsExpense BOOLEAN NOT NULL DEFAULT FALSE,
    IsIncome BOOLEAN NOT NULL DEFAULT FALSE,
    IsActive BOOLEAN NOT NULL DEFAULT TRUE,
    Description VARCHAR(500),
    UserID INT NOT NULL,
    Created DATETIME DEFAULT CURRENT_TIMESTAMP,
    Modified DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    Sequence DECIMAL(10, 2),
    FOREIGN KEY (CategoryID) REFERENCES categories(CategoryID) ON DELETE CASCADE,
    FOREIGN KEY (UserID) REFERENCES users(UserID) ON DELETE CASCADE
);

-- ==========================================
-- 6. Expenses Table
-- ==========================================
CREATE TABLE expenses (
    ExpenseID INT AUTO_INCREMENT PRIMARY KEY,
    ExpenseDate DATETIME NOT NULL,
    CategoryID INT,
    SubCategoryID INT,
    PeopleID INT NOT NULL,
    ProjectID INT,
    Amount DECIMAL(18, 2) NOT NULL,
    ExpenseDetail VARCHAR(500),
    AttachmentPath VARCHAR(250),
    Description VARCHAR(500),
    UserID INT NOT NULL,
    Created DATETIME DEFAULT CURRENT_TIMESTAMP,
    Modified DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (CategoryID) REFERENCES categories(CategoryID) ON DELETE SET NULL,
    FOREIGN KEY (SubCategoryID) REFERENCES sub_categories(SubCategoryID) ON DELETE SET NULL,
    FOREIGN KEY (PeopleID) REFERENCES peoples(PeopleID) ON DELETE CASCADE,
    FOREIGN KEY (ProjectID) REFERENCES projects(ProjectID) ON DELETE SET NULL,
    FOREIGN KEY (UserID) REFERENCES users(UserID) ON DELETE CASCADE
);

-- ==========================================
-- 7. Incomes Table
-- ==========================================
CREATE TABLE incomes (
    IncomeID INT AUTO_INCREMENT PRIMARY KEY,
    IncomeDate DATETIME NOT NULL,
    CategoryID INT,
    SubCategoryID INT,
    PeopleID INT NOT NULL,
    ProjectID INT,
    Amount DECIMAL(18, 2) NOT NULL,
    IncomeDetail VARCHAR(500),
    AttachmentPath VARCHAR(250),
    Description VARCHAR(500),
    UserID INT NOT NULL,
    Created DATETIME DEFAULT CURRENT_TIMESTAMP,
    Modified DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (CategoryID) REFERENCES categories(CategoryID) ON DELETE SET NULL,
    FOREIGN KEY (SubCategoryID) REFERENCES sub_categories(SubCategoryID) ON DELETE SET NULL,
    FOREIGN KEY (PeopleID) REFERENCES peoples(PeopleID) ON DELETE CASCADE,
    FOREIGN KEY (ProjectID) REFERENCES projects(ProjectID) ON DELETE SET NULL,
    FOREIGN KEY (UserID) REFERENCES users(UserID) ON DELETE CASCADE
);

-- ==========================================
-- DUMMY DATA
-- ==========================================

-- 1. Insert Users
INSERT INTO users (UserName, EmailAddress, Password, MobileNo) VALUES
('Admin User', 'admin@example.com', 'admin123', '1234567890'),
('John Doe', 'john@example.com', 'password123', '0987654321');

-- 2. Insert Projects
INSERT INTO projects (ProjectName, Description, UserID) VALUES
('Website Redesign', 'Revamping company website', 1),
('Mobile App', 'Android and iOS App', 1);

-- 3. Insert People
INSERT INTO peoples (PeopleName, Email, MobileNo, UserID) VALUES
('Alice Staff', 'alice@company.com', '1112223333', 1),
('Bob Manager', 'bob@company.com', '4445556666', 1);

-- 4. Insert Categories
INSERT INTO categories (CategoryName, IsExpense, IsIncome, UserID) VALUES
('Travel', 1, 0, 1),
('Food', 1, 0, 1),
('Salary', 0, 1, 1),
('Freelance', 0, 1, 1);

-- 5. Insert SubCategories
INSERT INTO sub_categories (CategoryID, SubCategoryName, IsExpense, IsIncome, UserID) VALUES
(1, 'Taxi', 1, 0, 1),
(1, 'Flight', 1, 0, 1),
(2, 'Lunch', 1, 0, 1),
(2, 'Dinner', 1, 0, 1);

-- 6. Insert Expenses
INSERT INTO expenses (ExpenseDate, CategoryID, SubCategoryID, PeopleID, ProjectID, Amount, Description, UserID) VALUES
('2023-10-25 12:30:00', 1, 1, 1, 1, 50.00, 'Taxi to client meeting', 1),
('2023-10-26 19:00:00', 2, 4, 1, 1, 120.00, 'Team dinner', 1);

-- 7. Insert Incomes
INSERT INTO incomes (IncomeDate, CategoryID, PeopleID, Amount, Description, UserID) VALUES
('2023-10-01 10:00:00', 3, 1, 5000.00, 'Monthly Salary', 1);
