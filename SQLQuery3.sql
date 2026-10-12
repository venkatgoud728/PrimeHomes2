CREATE DATABASE PrimeHomesDB;
USE PrimeHomesDB;
CREATE TABLE Users
(
    UserId INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Email NVARCHAR(150) NOT NULL UNIQUE,
    Phone NVARCHAR(20),
    Password NVARCHAR(255) NOT NULL,
    Role NVARCHAR(20) NOT NULL,
    CreatedDate DATETIME NOT NULL DEFAULT GETDATE()
);
select * from users;


CREATE TABLE Properties
(
    PropertyId INT IDENTITY(1,1) PRIMARY KEY,

    Title NVARCHAR(200) NOT NULL,

    Description NVARCHAR(MAX),

    PropertyType NVARCHAR(50) NOT NULL,

    BHK INT,

    Price DECIMAL(18,2) NOT NULL,

    Area DECIMAL(10,2),

    Location NVARCHAR(200) NOT NULL,

    City NVARCHAR(100) NOT NULL,

    ImageUrl NVARCHAR(500),

    OwnerId INT NOT NULL,

    Status NVARCHAR(20) NOT NULL DEFAULT 'Pending',

    CreatedDate DATETIME NOT NULL DEFAULT GETDATE(),

    CONSTRAINT FK_Properties_Users
        FOREIGN KEY (OwnerId)
        REFERENCES Users(UserId)
);
select * from properties;


CREATE TABLE Inquiries
(
    InquiryId INT IDENTITY(1,1) PRIMARY KEY,

    PropertyId INT NOT NULL,

    BuyerId INT NOT NULL,

    OwnerId INT NOT NULL,

    Message NVARCHAR(1000) NOT NULL,

    Status NVARCHAR(20) NOT NULL DEFAULT 'New',

    CreatedDate DATETIME NOT NULL DEFAULT GETDATE(),

    CONSTRAINT FK_Inquiries_Properties
        FOREIGN KEY (PropertyId)
        REFERENCES Properties(PropertyId),

    CONSTRAINT FK_Inquiries_Buyer
        FOREIGN KEY (BuyerId)
        REFERENCES Users(UserId),

    CONSTRAINT FK_Inquiries_Owner
        FOREIGN KEY (OwnerId)
        REFERENCES Users(UserId)
);

--admin--
INSERT INTO Users
(
    Name,
    Email,
    Phone,
    Password,
    Role
)
VALUES
(
    'Prime Admin',
    'admin@primehomes.com',
    '9000000001',
    'Admin@123',
    'Admin'
);

--owner---

INSERT INTO Users
(
    Name,
    Email,
    Phone,
    Password,
    Role
)
VALUES
(
    'Ravi Kumar',
    'ravi@primehomes.com',
    '9000000002',
    'Ravi@123',
    'Owner'
);
--buyer--

INSERT INTO Users
(
    Name,
    Email,
    Phone,
    Password,
    Role
)
VALUES
(
    'Venkat',
    'venkat@primehomes.com',
    '9000000003',
    'Venkat@123',
    'Buyer'
);

SELECT * FROM Users;

INSERT INTO Properties
(
    Title,
    Description,
    PropertyType,
    BHK,
    Price,
    Area,
    Location,
    City,
    ImageUrl,
    OwnerId,
    Status
)
VALUES
(
    'Beautiful 2 BHK Apartment',
    'Spacious 2 BHK apartment with parking and good connectivity.',
    'Apartment',
    2,
    6500000,
    1200,
    'Kukatpally',
    'Hyderabad',
    'apartment1.jpg',
    2,
    'Approved'
);
SELECT * FROM Users;

SELECT * FROM Properties;

SELECT * FROM Inquiries;

SELECT
    p.PropertyId,
    p.Title,
    p.Price,
    p.Location,
    p.City,
    p.Status,
    u.Name AS OwnerName,
    u.Email AS OwnerEmail
FROM Properties p
INNER JOIN Users u
    ON p.OwnerId = u.UserId;

    SELECT PropertyId, Title, OwnerId
FROM Properties;

INSERT INTO Properties
(
    Title, Description, PropertyType, BHK, Price,
    Area, Location, City, ImageUrl, OwnerId, Status)
VALUES ('Another Owner Property','Test property','Apartment', 2,5000000,1000,'Madhapur','Hyderabad','test.jpg',3,'Pending');

SELECT PropertyId, Title, OwnerId, Status
FROM Properties;

SELECT PropertyId, Title, OwnerId, Status
FROM Properties
WHERE PropertyId = 2;

SELECT PropertyId, Title, OwnerId, Status
FROM Properties
WHERE OwnerId <> 2;

SELECT *
FROM Inquiries;

SELECT PropertyId, Title, OwnerId
FROM Properties
WHERE PropertyId = 5;

SELECT UserId, Name, Email, Role
FROM Users
WHERE UserId = 3;

INSERT INTO Users
(
    Name,
    Email,
    Phone,
    Password,
    Role
)
VALUES
(
    'Suresh Kumar',
    'suresh@primehomes.com',
    '9876543210',
    'Suresh@123',
    'Owner'
);

SELECT UserId, Name, Email, Role
FROM Users;

UPDATE Properties
SET OwnerId = 4
WHERE PropertyId = 5;

SELECT PropertyId, Title, OwnerId
FROM Properties
WHERE PropertyId = 5;

UPDATE Inquiries
SET OwnerId = 4
WHERE PropertyId = 5;

SELECT *
FROM Inquiries
WHERE PropertyId = 5;

SELECT PropertyId, Title, OwnerId, Status
FROM Properties
WHERE PropertyId = 5;

UPDATE Properties
SET ImageUrl = '/images/apartment.jpg'
WHERE PropertyId = 1;

UPDATE Properties
SET ImageUrl = '/images/house.jpg'
WHERE PropertyId = 3;

SELECT PropertyId, Title, ImageUrl
FROM Properties
WHERE Status = 'Approved';

SELECT *
FROM Inquiries
ORDER BY InquiryId DESC;



SELECT
    PropertyId,
    Title,
    ImageUrl
FROM Properties
WHERE PropertyId = 5;


UPDATE Properties
SET ImageUrl = '/images/apartment.jpg'
WHERE PropertyId = 5;

SELECT
    PropertyId,
    Title,
    OwnerId,
    Status
FROM Properties
ORDER BY PropertyId DESC;

SELECT 
    UserId,
    Name,
    Email,
    Role
FROM Users;

SELECT *
FROM PropertyImages;

SELECT *
FROM __EFMigrationsHistory;

SELECT 
    PropertyId,
    Title,
    OwnerId
FROM Properties
WHERE PropertyId = 1;

SELECT 
    UserId,
    Name,
    Email,
    Role
FROM Users
WHERE Email = 'suresh@primehomes.com';

SELECT 
    PropertyId,
    Title,
    OwnerId
FROM Properties
WHERE PropertyId IN (1, 2);

SELECT
    UserId,
    Name,
    Email,
    Role
FROM Users
WHERE UserId = 2;

SELECT *
FROM PropertyImages;

SELECT
    PropertyImageId,
    PropertyId,
    ImageUrl,
    CreatedDate
FROM PropertyImages
WHERE PropertyId = 1;

SELECT
    PropertyId,
    Title,
    City,
    OwnerId,
    ImageUrl,
    Status
FROM Properties
ORDER BY PropertyId;

SELECT
    PropertyImageId,
    PropertyId,
    ImageUrl,
    CreatedDate
FROM PropertyImages
WHERE PropertyId = 1;

SELECT
    PropertyImageId,
    PropertyId,
    ImageUrl,
    CreatedDate
FROM PropertyImages
WHERE PropertyId = 3;

SELECT
    PropertyId,
    Title,
    ImageUrl
FROM Properties
WHERE PropertyId = 3;

SELECT
    PropertyImageId,
    PropertyId,
    ImageUrl,
    CreatedDate
FROM PropertyImages
WHERE PropertyId = 3;

DELETE FROM PropertyImages
WHERE PropertyId = 3;

SELECT *
FROM PropertyImages
WHERE PropertyId = 3;

SELECT
    PropertyImageId,
    PropertyId,
    ImageUrl,
    CreatedDate
FROM PropertyImages
WHERE PropertyId = 3;

SELECT *
FROM Favorites;

SELECT
    f.FavoriteId,
    f.BuyerId,
    f.PropertyId,
    p.Title,
    p.City,
    p.Price,
    f.CreatedDate
FROM Favorites f
INNER JOIN Properties p
    ON f.PropertyId = p.PropertyId;

    SELECT
    PropertyId,
    Title,
    Status,
    Badge
FROM Properties;

UPDATE Properties
SET Badge = 'FEATURED'
WHERE PropertyId = 1;


SELECT
    PropertyId,
    Title,
    ImageUrl
FROM Properties
WHERE PropertyId IN (1, 5, 6, 7, 8, 9, 10, 11, 12)
ORDER BY PropertyId;

SELECT 
    TABLE_NAME
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_NAME = 'Notifications';

SELECT DB_NAME() AS CurrentDatabase;

SELECT *
FROM __EFMigrationsHistory
ORDER BY MigrationId;

SELECT *
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_NAME = 'Notifications';

SELECT
    NotificationId,
    UserId,
    Title,
    Message,
    Type,
    IsRead,
    RelatedPropertyId,
    CreatedDate
FROM Notifications
ORDER BY NotificationId DESC;

SELECT
    UserId,
    Name,
    Email,
    Role
FROM Users
WHERE Email = 'suresh@primehomes.com';


SELECT
    NotificationId,
    UserId,
    Title,
    IsRead,
    CreatedDate
FROM Notifications
WHERE NotificationId = 1;



SELECT
    NotificationId,
    UserId,
    Title,
    IsRead,
    CreatedDate
FROM Notifications
WHERE NotificationId = 1;

SELECT COUNT(*) AS UnreadCount
FROM Notifications
WHERE UserId = 4
  AND IsRead = 0;

  UPDATE Notifications
SET IsRead = 0
WHERE NotificationId = 1;


SELECT TABLE_SCHEMA, TABLE_NAME
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_NAME = 'ContactRequests';

SELECT *
FROM __EFMigrationsHistory
ORDER BY MigrationId;

SELECT TABLE_SCHEMA, TABLE_NAME
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_NAME = 'ContactRequests';

SELECT
    ContactRequestId,
    FullName,
    Email,
    PhoneNumber,
    InterestedIn,
    Message,
    Status,
    CreatedDate
FROM ContactRequests
ORDER BY CreatedDate DESC;