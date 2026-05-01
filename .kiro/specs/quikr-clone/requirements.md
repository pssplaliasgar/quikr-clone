# Requirements Document: Quikr Clone

## Introduction

This document specifies the requirements for a Quikr.com clone - an online classified ads marketplace platform where buyers and sellers connect to buy, sell, and rent items across multiple categories. The platform will support multi-category listings, location-based search, user authentication, and ad management capabilities.

## Glossary

- **System**: The Quikr Clone web application
- **User**: Any person accessing the platform (authenticated or guest)
- **Seller**: An authenticated user who posts classified ads
- **Buyer**: A user browsing and searching for classified ads
- **Ad**: A classified advertisement listing posted by a seller
- **Category**: A classification group for ads (e.g., Electronics, Furniture, Vehicles)
- **Location**: Geographic area (city/area) associated with an ad
- **Authentication_Service**: Component handling user registration and login
- **Ad_Service**: Component managing ad creation, updates, and retrieval
- **Search_Service**: Component handling search queries and filters
- **Image_Service**: Component managing ad image uploads and storage
- **Database**: PostgreSQL database storing all application data

## Requirements

### Requirement 1: User Registration and Authentication

**User Story:** As a new user, I want to authenticate with email/phone and password through a modal popup, so that I can post ads and manage my listings.

#### Acceptance Criteria

1. WHEN a user clicks login/register, THE System SHALL display a modal popup with email/phone and password fields
2. WHEN a user enters an email or phone number, THE Authentication_Service SHALL check if the user exists
3. WHEN the email/phone exists in the database, THE System SHALL treat it as a login attempt
4. WHEN the email/phone does not exist in the database, THE System SHALL treat it as a registration attempt and show additional fields (name)
5. WHEN registering a new user, THE Authentication_Service SHALL create a new user account with hashed password
6. WHEN a user submits a password, THE Authentication_Service SHALL hash the password before storing it in the Database
7. THE Authentication_Service SHALL require passwords to be at least 8 characters long
8. WHEN a user submits valid login credentials, THE Authentication_Service SHALL return a JWT token valid for 24 hours
9. WHEN a user submits invalid login credentials, THE Authentication_Service SHALL return an authentication error
10. WHEN an authenticated user makes a request with a valid JWT token, THE System SHALL authorize the request
11. WHEN a user makes a request with an expired or invalid JWT token, THE System SHALL return an unauthorized error
12. THE System SHALL accept both email and phone number as login identifiers
13. WHEN a user successfully authenticates, THE System SHALL close the modal and update the header to show user menu

### Requirement 2: User Profile Management

**User Story:** As an authenticated user, I want to manage my profile information, so that buyers can contact me and view my listings.

#### Acceptance Criteria

1. WHEN a user registers, THE System SHALL create a profile with email, name, and phone number fields
2. WHEN a user updates their profile, THE System SHALL validate and save the updated information
3. WHEN a user views their profile, THE System SHALL display their email, name, phone number, and creation date
4. WHEN a user views their profile, THE System SHALL display a list of all ads posted by that user
5. THE System SHALL allow users to update their name and phone number but not their email
6. WHEN a user provides a phone number, THE System SHALL validate it contains only digits and is 10 characters long

### Requirement 3: Category Management and Navigation

**User Story:** As a user, I want to browse ads by category with intuitive navigation, so that I can find items relevant to my interests.

#### Acceptance Criteria

1. THE System SHALL support a three-level category hierarchy: Parent Category, Sub-Category, and Leaf Category
2. THE System SHALL support the following parent categories: QuikrBazar, QuikrCars, QuikrBikes, QuikrHomes, QuikrJobs, QuikrServices, QuikrEducation
3. THE System SHALL support sub-categories under QuikrBazar: Electronics, Furniture, Fashion, Home and Lifestyle
4. THE System SHALL support leaf categories under Electronics: Mobile Phones, TV, Laptops, Cameras, Audio Systems
5. THE System SHALL support leaf categories under Furniture: Sofa, Bed, Table, Chair, Wardrobe
6. THE System SHALL support leaf categories under Fashion: Men's Clothing, Women's Clothing, Footwear, Accessories
7. THE System SHALL support leaf categories under Home and Lifestyle: Home Appliances, Kitchen Items, Home Decor, Garden
8. THE System SHALL support sub-categories under QuikrCars: Used Cars, New Cars
9. THE System SHALL support leaf categories under Used Cars: Sedan, SUV, Hatchback, Luxury
10. THE System SHALL support sub-categories under QuikrBikes: Motorcycles, Scooters, Bicycles
11. THE System SHALL support leaf categories under Motorcycles: Sports Bikes, Cruiser, Commuter
12. THE System SHALL support sub-categories under QuikrHomes: Properties for Sale, Properties for Rent, PG and Hostels
13. THE System SHALL support leaf categories under Properties for Sale: Apartments, Houses, Villas, Land
14. THE System SHALL support leaf categories under Properties for Rent: 1 BHK, 2 BHK, 3 BHK, Commercial
15. THE System SHALL support sub-categories under QuikrJobs: Full Time, Part Time, Freelance, Work From Home
16. THE System SHALL support leaf categories under Full Time: IT Jobs, Sales, Marketing, Finance, Healthcare
17. THE System SHALL support sub-categories under QuikrServices: Home Services, Repair Services, Event Services
18. THE System SHALL support leaf categories under Home Services: Cleaning, Plumbing, Electrical, Carpentry
19. THE System SHALL support sub-categories under QuikrEducation: Tuitions, Classes, Courses
20. THE System SHALL support leaf categories under Tuitions: School Tuition, College Tuition, Competitive Exams
21. WHEN a user views the homepage, THE System SHALL display all leaf categories in a left sidebar organized by parent and sub-category
22. WHEN a user views the homepage, THE System SHALL display parent category cards in the main content area
23. WHEN displaying a parent category card, THE System SHALL show the parent category name and 1-2 featured sub-categories with their leaf categories
24. WHEN a user clicks on a parent category card, THE System SHALL navigate to a page showing all sub-categories and leaf categories under that parent
25. WHEN a user clicks on a leaf category from the sidebar or card, THE System SHALL navigate to that category's ad listing page
26. WHEN a user selects a leaf category, THE System SHALL update the header to display the corresponding parent category name
27. WHEN displaying the header, THE System SHALL show "Quikr" by default and change to the parent category name when a leaf category is selected
28. WHEN displaying category ad listings, THE System SHALL show ad title, price, location, and thumbnail image
29. WHEN an ad is created, THE Ad_Service SHALL require assignment to exactly one leaf category
30. WHEN displaying an ad, THE System SHALL show the full category path as breadcrumbs: Parent > Sub-Category > Leaf Category
31. THE System SHALL maintain the selected category context in the header across page navigation within that category

### Requirement 4: Ad Creation and Management

**User Story:** As a seller, I want to post classified ads with details and images, so that buyers can discover and purchase my items.

#### Acceptance Criteria

1. WHEN an authenticated user creates an ad, THE Ad_Service SHALL require title, description, price, category, and location
2. WHEN creating an ad, THE Ad_Service SHALL allow the seller to upload up to 5 images
3. WHEN an ad is created, THE Ad_Service SHALL store the seller's user ID and creation timestamp
4. WHEN a seller uploads images, THE Image_Service SHALL validate that each file is a valid image format (JPEG, PNG, WebP)
5. WHEN a seller uploads images, THE Image_Service SHALL validate that each file is under 5MB in size
6. WHEN an ad is created, THE Ad_Service SHALL set the ad status to active
7. WHEN a seller views their ads, THE System SHALL display all ads they have posted with edit and delete options
8. WHEN a seller updates an ad, THE Ad_Service SHALL save the changes and update the modification timestamp
9. WHEN a seller deletes an ad, THE Ad_Service SHALL perform a soft delete by marking the ad as inactive
10. THE Ad_Service SHALL require price to be a positive number
11. THE Ad_Service SHALL require title to be between 10 and 100 characters
12. THE Ad_Service SHALL require description to be between 50 and 5000 characters

### Requirement 5: Ad Viewing and Details

**User Story:** As a buyer, I want to view detailed information about ads, so that I can make informed purchasing decisions.

#### Acceptance Criteria

1. WHEN a user clicks on an ad, THE System SHALL display the full ad details page
2. WHEN displaying ad details, THE System SHALL show title, description, price, location, category, posted date, and all uploaded images
3. WHEN displaying ad details, THE System SHALL show the seller's name and phone number
4. WHEN displaying ad images, THE System SHALL show the first image as the primary image with thumbnails for additional images
5. WHEN a user clicks on a thumbnail, THE System SHALL display that image as the primary image
6. WHEN displaying ad details, THE System SHALL show the number of views for that ad
7. WHEN a user views an ad details page, THE Ad_Service SHALL increment the view count by one
8. THE System SHALL display ads in a grid layout on category and search result pages

### Requirement 6: Search and Filter Functionality

**User Story:** As a buyer, I want to search for ads using keywords and filters, so that I can quickly find relevant items.

#### Acceptance Criteria

1. WHEN a user enters a search query, THE Search_Service SHALL return ads matching the query in title or description
2. WHEN a user searches, THE Search_Service SHALL perform case-insensitive matching
3. WHEN a user applies a category filter, THE Search_Service SHALL return only ads from that category
4. WHEN a user applies a location filter, THE Search_Service SHALL return only ads from that location
5. WHEN a user applies a price range filter, THE Search_Service SHALL return only ads within the specified price range
6. WHEN a user applies multiple filters, THE Search_Service SHALL return ads matching all filter criteria
7. WHEN displaying search results, THE System SHALL show the total count of matching ads
8. WHEN a user types in the search box, THE System SHALL provide autocomplete suggestions based on popular searches and ad titles
9. THE Search_Service SHALL return results sorted by most recent first by default
10. THE System SHALL allow users to sort search results by price (low to high, high to low) or date (newest, oldest)

### Requirement 7: Location Management and Personalization

**User Story:** As a user, I want to filter ads by location and see relevant items for my area, so that I can find items available nearby.

#### Acceptance Criteria

1. WHEN a user visits the homepage for the first time, THE System SHALL prompt the user to allow location access
2. WHEN a user grants location permission, THE System SHALL detect the user's city using browser geolocation API
3. WHEN a user denies location permission, THE System SHALL prompt the user to manually select their city from a dropdown
4. WHEN location is determined, THE System SHALL store the selected city in browser local storage for future visits
5. WHEN displaying ads on the homepage, THE System SHALL filter and show ads from the user's selected city by default
6. WHEN creating an ad, THE Ad_Service SHALL require the seller to manually select a city and area from predefined dropdown lists
7. WHEN an ad is created, THE Database SHALL store the city ID and area ID as foreign keys in the ads table
8. THE System SHALL maintain a cities table with columns: id, name, state
9. THE System SHALL maintain an areas table with columns: id, city_id, name
10. THE Database SHALL enforce foreign key constraints between ads and locations
11. THE System SHALL pre-populate the database with at least 50 major Indian cities and their areas
12. WHEN a user selects a city in the ad creation form, THE System SHALL load and display areas for that city via API call
13. WHEN a user filters by location, THE Search_Service SHALL query ads by city_id and optionally area_id
14. WHEN displaying ads, THE System SHALL show the location as "Area, City" format by joining location tables
15. WHEN a user views the homepage, THE System SHALL display the currently selected city name in the header
16. WHEN a user clicks on the location in the header, THE System SHALL show a modal to change city and area
17. WHEN a user changes location, THE System SHALL update local storage and reload ads for the new location
18. THE System SHALL show a location icon in the header indicating the current selected city
19. WHEN geolocation detection fails, THE System SHALL default to showing ads from all cities with a prompt to select location

### Requirement 8: Image Upload and Storage

**User Story:** As a seller, I want to upload multiple images for my ads, so that buyers can see what I am selling.

#### Acceptance Criteria

1. WHEN a seller uploads an image, THE Image_Service SHALL validate the file type is JPEG, PNG, or WebP
2. WHEN a seller uploads an image, THE Image_Service SHALL validate the file size is under 5MB
3. WHEN an image passes validation, THE Image_Service SHALL store the image and return a URL
4. WHEN storing images, THE Image_Service SHALL generate a unique filename to prevent collisions
5. WHEN an ad is deleted, THE Image_Service SHALL mark associated images for cleanup
6. THE Image_Service SHALL compress uploaded images to optimize storage and loading times
7. WHEN displaying images, THE System SHALL serve optimized versions for thumbnails and full-size views

### Requirement 9: Responsive Design and UI Style

**User Story:** As a user, I want to access the platform on mobile and desktop devices with a clean interface similar to Quikr.com, so that I can browse ads anywhere with a familiar experience.

#### Acceptance Criteria

1. WHEN a user accesses the System on a mobile device, THE System SHALL display a mobile-optimized layout
2. WHEN a user accesses the System on a desktop device, THE System SHALL display a desktop-optimized layout
3. WHEN displaying on mobile, THE System SHALL show a hamburger menu for navigation
4. WHEN displaying on desktop, THE System SHALL show a horizontal navigation bar
5. WHEN displaying ad grids, THE System SHALL adjust the number of columns based on screen size
6. THE System SHALL ensure all interactive elements are touch-friendly on mobile devices
7. THE System SHALL ensure text is readable without zooming on all device sizes
8. THE System SHALL use Tailwind CSS for styling without gradient colors
9. THE System SHALL replicate Quikr.com's visual design including color scheme, layout patterns, and component styles
10. THE System SHALL use a clean, minimal design with white backgrounds and clear typography
11. THE System SHALL NOT include emojis in any user interface elements
12. WHEN displaying category cards, THE System SHALL use icon-based representations similar to Quikr.com
13. THE System SHALL use a consistent color palette matching Quikr's brand colors (primarily red/orange accents on white)

### Requirement 10: Data Persistence, Migrations, and Seeders

**User Story:** As a system administrator, I want database schema changes managed through migrations and mock data through seeders, so that the database structure is version-controlled and the application can be tested with realistic data.

#### Acceptance Criteria

1. THE System SHALL use PostgreSQL as the database
2. WHEN the database schema changes, THE System SHALL provide a migration script
3. THE System SHALL track applied migrations to prevent duplicate execution
4. WHEN running migrations, THE System SHALL apply them in chronological order
5. THE System SHALL support rollback of migrations for schema changes
6. THE Database SHALL store users, ads, categories, locations, and images in separate tables
7. THE Database SHALL enforce foreign key constraints between related tables
8. THE Database SHALL use UUID as primary keys for all main entities
9. THE System SHALL provide seeder scripts to populate the database with mock data
10. THE System SHALL create seeders for cities and areas covering at least 50 major Indian cities
11. THE System SHALL create seeders for the three-level category hierarchy (parent, sub-category, leaf)
12. THE System SHALL create seeders for mock users with hashed passwords
13. WHEN creating buyer users in seeders, THE System SHALL use the password "buyer@123" (hashed)
14. WHEN creating seller users in seeders, THE System SHALL use the password "seller@123" (hashed)
15. THE System SHALL create seeders for mock ads with realistic titles, descriptions, prices, and locations
16. THE System SHALL create seeders for mock images associated with ads
17. WHEN running seeders, THE System SHALL check if data already exists to prevent duplicate seeding
18. THE System SHALL provide separate seeder commands for each entity type
19. THE System SHALL provide a master seeder command to run all seeders in the correct order
20. THE System SHALL ensure seeded data maintains referential integrity across all tables
21. THE System SHALL create at least 5 buyer users and 5 seller users in the seeders
22. THE System SHALL ensure each seller user has 7-10 ads associated with them in the seeders

### Requirement 11: Ad Listing Pagination

**User Story:** As a user, I want to browse ads in pages, so that the application loads quickly and I can navigate through many listings.

#### Acceptance Criteria

1. WHEN displaying ad listings, THE System SHALL show 20 ads per page by default
2. WHEN a user navigates to the next page, THE System SHALL load the next set of ads
3. WHEN displaying paginated results, THE System SHALL show page numbers and navigation controls
4. WHEN on the first page, THE System SHALL disable the previous page button
5. WHEN on the last page, THE System SHALL disable the next page button
6. THE System SHALL display the total number of pages and current page number
7. WHEN a user clicks a specific page number, THE System SHALL navigate to that page

### Requirement 13: Footer and Site Information

**User Story:** As a user, I want to access important links and information in the footer, so that I can navigate to help pages, policies, and other resources.

#### Acceptance Criteria

1. THE System SHALL display a footer on all pages matching Quikr.com's footer design
2. WHEN displaying the footer, THE System SHALL organize links into columns: About, Categories, Help and Support, Social
3. WHEN displaying the About section, THE System SHALL include links for: About Us, Contact Us, Careers, Terms of Use, Privacy Policy
4. WHEN displaying the Categories section, THE System SHALL include links to all parent categories
5. WHEN displaying the Help and Support section, THE System SHALL include links for: FAQ, Safety Tips, Sitemap
6. WHEN displaying the Social section, THE System SHALL include icons linking to social media platforms
7. THE System SHALL display copyright information at the bottom of the footer
8. THE System SHALL display the footer with a light background color matching Quikr's design
9. WHEN a user clicks on a footer link, THE System SHALL navigate to the corresponding page
10. THE System SHALL ensure the footer is responsive and adjusts layout for mobile devices
11. WHEN displaying on mobile, THE System SHALL stack footer columns vertically
12. THE System SHALL include a "Download App" section in the footer with app store badges

### Requirement 12: Input Validation and Security

**User Story:** As a system administrator, I want all user inputs validated and sanitized, so that the platform is secure from malicious attacks.

#### Acceptance Criteria

1. WHEN a user submits any form, THE System SHALL validate all required fields are present
2. WHEN a user submits text input, THE System SHALL sanitize the input to prevent XSS attacks
3. WHEN a user submits data, THE System SHALL validate data types match expected formats
4. WHEN validation fails, THE System SHALL return specific error messages indicating which fields are invalid
5. THE System SHALL implement rate limiting on API endpoints to prevent abuse
6. THE System SHALL validate JWT tokens on all protected endpoints
7. WHEN a user attempts SQL injection, THE System SHALL use parameterized queries to prevent execution
8. THE System SHALL implement CORS policies to restrict cross-origin requests

