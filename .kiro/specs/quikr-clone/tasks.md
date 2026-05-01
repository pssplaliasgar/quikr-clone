# Implementation Plan: Quikr Clone

## Overview

This implementation plan breaks down the Quikr Clone platform into discrete, manageable tasks. The approach follows an incremental development strategy, building core infrastructure first, then adding features layer by layer, and finally integrating everything together.

## Tasks

- [x] 1. Project Setup and Infrastructure
  - Initialize NestJS backend project with TypeScript
  - Initialize React frontend project with Vite, TypeScript, Tailwind CSS, and Redux Toolkit
  - Set up PostgreSQL database connection
  - Configure environment variables for both projects (use VITE_ prefix for frontend)
  - Set up CORS and basic middleware
  - _Requirements: 10.1, 12.8_

- [x] 2. Database Schema and Migrations
  - [x] 2.1 Create migration for users table
    - Create users table with id (UUID), email, password, name, phone, createdAt, updatedAt
    - Add unique constraint on email
    - _Requirements: 1.1, 2.1, 10.2, 10.6_
  
  - [x] 2.2 Create migration for parent_categories table
    - Create parent_categories table with id (UUID), name, slug, icon
    - Add unique constraints on name and slug
    - _Requirements: 3.1, 10.6_
  
  - [x] 2.3 Create migration for sub_categories table
    - Create sub_categories table with id (UUID), name, slug, parentId (FK)
    - Add foreign key constraint to parent_categories
    - _Requirements: 3.2-3.8, 10.6, 10.7_
  
  - [x] 2.4 Create migration for leaf_categories table
    - Create leaf_categories table with id (UUID), name, slug, subCategoryId (FK)
    - Add foreign key constraint to sub_categories
    - _Requirements: 3.4-3.20, 10.6, 10.7_
  
  - [x] 2.5 Create migration for cities table
    - Create cities table with id (UUID), name, state
    - _Requirements: 7.8, 10.6_
  
  - [x] 2.6 Create migration for areas table
    - Create areas table with id (UUID), name, cityId (FK)
    - Add foreign key constraint to cities
    - _Requirements: 7.9, 10.6, 10.7_
  
  - [x] 2.7 Create migration for ads table
    - Create ads table with id (UUID), title, description, price, userId (FK), categoryId (FK), cityId (FK), areaId (FK), views, isActive, createdAt, updatedAt
    - Add foreign key constraints to users, leaf_categories, cities, areas
    - Add indexes on categoryId, cityId, areaId, isActive, createdAt
    - _Requirements: 4.1, 4.3, 4.6, 7.7, 10.6, 10.7, 10.8_
  
  - [x] 2.8 Create migration for images table
    - Create images table with id (UUID), filename, path, url, adId (FK), order, createdAt
    - Add foreign key constraint to ads with CASCADE delete
    - _Requirements: 8.3, 8.4, 10.6, 10.7_

- [x] 3. Database Seeders
  - [x] 3.1 Create cities and areas seeder
    - Seed 50+ major Indian cities with their states
    - Seed areas for each city (5-10 areas per city)
    - _Requirements: 7.10, 7.11, 10.10_
  
  - [x] 3.2 Create categories seeder
    - Seed parent categories (QuikrBazar, QuikrCars, QuikrBikes, QuikrHomes, QuikrJobs, QuikrServices, QuikrEducation)
    - Seed sub-categories under each parent
    - Seed leaf categories under each sub-category
    - _Requirements: 3.1-3.8, 10.11_
  
  - [x] 3.3 Create users seeder
    - Seed 5 buyer users with password "buyer@123" (hashed)
    - Seed 5 seller users with password "seller@123" (hashed)
    - _Requirements: 10.12, 10.13, 10.14, 10.21_
  
  - [x] 3.4 Create ads seeder
    - Seed 7-10 ads per seller user with realistic data
    - Assign random categories, cities, and areas
    - Set random prices and view counts
    - _Requirements: 10.15, 10.22_
  
  - [x] 3.5 Create images seeder
    - Seed 2-4 images per ad with placeholder image URLs
    - _Requirements: 10.16_
  
  - [x] 3.6 Create master seeder command
    - Run all seeders in correct order with duplicate prevention
    - _Requirements: 10.17, 10.18, 10.19, 10.20_

- [x] 4. Authentication Module (Backend)
  - [x] 4.1 Set up JWT strategy and guards
    - Install @nestjs/jwt and @nestjs/passport
    - Create JWT strategy for token validation
    - Create JWT auth guard
    - Configure JWT secret and expiration (24 hours)
    - _Requirements: 1.8, 1.10, 1.11_
  
  - [x] 4.2 Create authentication DTOs
    - Create CheckUserDto with identifier field
    - Create RegisterDto with identifier, password, name fields
    - Create LoginDto with identifier, password fields
    - Add validation decorators
    - _Requirements: 1.1, 1.2, 1.4, 1.7, 12.1, 12.3_
  
  - [x] 4.3 Implement AuthService
    - Implement checkUserExists method (check email or phone)
    - Implement register method with password hashing
    - Implement login method with credential validation
    - Implement validateUser method
    - Implement hashPassword method using bcrypt
    - _Requirements: 1.2, 1.3, 1.5, 1.6, 1.8, 1.9_
  
  - [x] 4.4 Implement AuthController
    - Create POST /auth/check endpoint
    - Create POST /auth/register endpoint
    - Create POST /auth/login endpoint
    - Create GET /auth/profile endpoint (protected)
    - Add validation pipes
    - _Requirements: 1.1, 1.2, 1.5, 1.10_

- [x] 5. Users Module (Backend)
  - [x] 5.1 Create user DTOs
    - Create UpdateUserDto with optional name and phone fields
    - Add validation decorators
    - _Requirements: 2.2, 2.5, 2.6, 12.1, 12.3_
  
  - [x] 5.2 Implement UsersService
    - Implement findById method
    - Implement findByEmail method
    - Implement findByPhone method
    - Implement update method (exclude email updates)
    - Implement getUserAds method
    - _Requirements: 2.2, 2.3, 2.4, 2.5_
  
  - [x] 5.3 Implement UsersController
    - Create GET /users/profile endpoint (protected)
    - Create PATCH /users/profile endpoint (protected)
    - Create GET /users/:id/ads endpoint
    - _Requirements: 2.2, 2.3, 2.4_

- [x] 6. Categories Module (Backend)
  - [x] 6.1 Implement CategoriesService
    - Implement findAll method (returns hierarchical tree)
    - Implement findParentCategories method
    - Implement findSubCategories method
    - Implement findLeafCategories method
    - _Requirements: 3.1-3.8_
  
  - [x] 6.2 Implement CategoriesController
    - Create GET /categories endpoint
    - Create GET /categories/parent endpoint
    - Create GET /categories/parent/:id/sub endpoint
    - Create GET /categories/sub/:id/leaf endpoint
    - _Requirements: 3.9, 3.10, 3.11_

- [x] 7. Locations Module (Backend)
  - [x] 7.1 Implement LocationsService
    - Implement findAllCities method
    - Implement findAreasByCity method
    - Implement detectCity method (from coordinates)
    - _Requirements: 7.1, 7.2, 7.8, 7.12_
  
  - [x] 7.2 Implement LocationsController
    - Create GET /locations/cities endpoint
    - Create GET /locations/cities/:id/areas endpoint
    - Create POST /locations/detect endpoint
    - _Requirements: 7.1, 7.2, 7.12_

- [x] 8. Images Module (Backend)
  - [x] 8.1 Set up multer for file uploads
    - Configure multer storage (local file system)
    - Set up file size limit (5MB)
    - Set up file type filter (JPEG, PNG, WebP)
    - _Requirements: 4.4, 4.5, 8.1, 8.2_
  
  - [x] 8.2 Implement ImagesService
    - Implement uploadImage method with validation
    - Implement validateImage method (format and size)
    - Implement deleteImage method
    - Generate unique filenames
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_
  
  - [x] 8.3 Implement ImagesController
    - Create POST /images/upload endpoint (protected, multipart/form-data)
    - Create GET /images/:filename endpoint (serve static files)
    - _Requirements: 8.3_

- [x] 9. Ads Module (Backend)
  - [x] 9.1 Create ad DTOs
    - Create CreateAdDto with title, description, price, categoryId, cityId, areaId
    - Create UpdateAdDto (partial of CreateAdDto)
    - Create FindAdsDto with filters (categoryId, cityId, areaId, minPrice, maxPrice, search, sortBy, page, limit)
    - Add validation decorators
    - _Requirements: 4.1, 4.8, 4.10, 4.11, 4.12, 6.1-6.6, 11.1, 12.1, 12.3_
  
  - [x] 9.2 Implement AdsService
    - Implement create method (set userId, isActive=true, store timestamp)
    - Implement findAll method with pagination and filters
    - Implement findById method
    - Implement update method (check ownership, update timestamp)
    - Implement softDelete method (set isActive=false)
    - Implement incrementViews method
    - _Requirements: 4.1, 4.3, 4.6, 4.8, 4.9, 5.7, 6.1-6.10, 11.1, 11.2_
  
  - [x] 9.3 Implement AdsController
    - Create POST /ads endpoint (protected)
    - Create GET /ads endpoint with query params
    - Create GET /ads/:id endpoint
    - Create PATCH /ads/:id endpoint (protected, ownership check)
    - Create DELETE /ads/:id endpoint (protected, ownership check)
    - Create POST /ads/:id/view endpoint
    - _Requirements: 4.1, 4.7, 4.8, 4.9, 5.7_

- [x] 10. Search Module (Backend)
  - [x] 10.1 Implement SearchService
    - Implement search method with case-insensitive text matching
    - Implement filter logic (category, location, price range)
    - Implement sorting (newest, oldest, price_asc, price_desc)
    - Implement pagination
    - Implement autocomplete method
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8, 6.9, 6.10_
  
  - [x] 10.2 Implement SearchController
    - Create GET /search endpoint with query params
    - Create GET /search/autocomplete endpoint
    - _Requirements: 6.1, 6.8_

- [-] 11. Backend Error Handling and Security
  - [x] 11.1 Create global exception filter
    - Catch all exceptions
    - Format error responses consistently
    - Log errors with context
    - Never expose stack traces in production
    - _Requirements: 12.4_
  
  - [x] 11.2 Implement input sanitization
    - Add sanitization pipe for XSS prevention
    - Use class-validator for type validation
    - _Requirements: 12.2, 12.3_
  
  - [x] 11.3 Set up rate limiting
    - Install @nestjs/throttler
    - Configure rate limits per endpoint
    - _Requirements: 12.5_
  
  - [x] 11.4 Configure validation pipe globally
    - Enable whitelist to strip unknown properties
    - Enable forbidNonWhitelisted to reject invalid properties
    - Enable transform for automatic type conversion
    - _Requirements: 12.1, 12.3_

- [x] 12. Checkpoint - Backend Complete
  - Verify all API endpoints are working
  - Test with Postman or similar tool
  - Verify database migrations and seeders work
  - Verify all endpoints return expected data

- [x] 13. Frontend Project Setup
  - [x] 13.1 Set up Redux store
    - Configure Redux Toolkit store
    - Create slices for auth, ads, categories, location
    - Set up Redux DevTools
    - _Requirements: N/A (infrastructure)_
  
  - [x] 13.2 Set up Axios with interceptors
    - Create axios instance with base URL
    - Add request interceptor for JWT token
    - Add response interceptor for error handling
    - Handle 401 (redirect to login), 403, 404, 500+ errors
    - _Requirements: 1.10, 1.11, 12.5_
  
  - [x] 13.3 Set up React Router
    - Configure routes for all pages
    - Set up protected routes
    - _Requirements: N/A (infrastructure)_
  
  - [x] 13.4 Configure Tailwind CSS
    - Set up Tailwind with Quikr color scheme (red/orange accents on white)
    - Configure responsive breakpoints
    - Disable gradient utilities
    - _Requirements: 9.8, 9.9, 9.10, 9.13_

- [x] 14. Authentication (Frontend)
  - [x] 14.1 Create auth Redux slice
    - Create actions for check user, login, register, logout
    - Create reducers for auth state (user, token, isAuthenticated)
    - Create selectors for auth state
    - _Requirements: 1.1, 1.2, 1.5_
  
  - [x] 14.2 Create AuthModal component
    - Create modal with email/phone and password inputs
    - Implement smart detection (check if user exists on blur)
    - Show name field conditionally for new users
    - Add form validation
    - Handle login/register submission
    - Close modal on success
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.13_
  
  - [x] 14.3 Implement auth API service
    - Create checkUser API call
    - Create register API call
    - Create login API call
    - Create getProfile API call
    - Store JWT token in localStorage
    - _Requirements: 1.1, 1.2, 1.5, 1.10_

- [x] 15. Layout Components (Frontend)
  - [x] 15.1 Create Header component
    - Display logo with dynamic parent category name
    - Add location selector button
    - Add search bar
    - Add user menu (Login/Register or Profile/Logout)
    - Add "Post Free Ad" button (protected)
    - Make responsive (hamburger menu on mobile)
    - _Requirements: 3.12, 3.15, 7.15, 7.18, 9.1, 9.3, 9.4_
  
  - [x] 15.2 Create Footer component
    - Organize links into columns (About, Categories, Help, Social)
    - Add About section links
    - Add Categories section with parent category links
    - Add Help and Support links
    - Add Social media icons
    - Add Download App section with badges
    - Add copyright information
    - Make responsive (stack columns on mobile)
    - _Requirements: 13.1-13.12_
  
  - [x] 15.3 Create Sidebar component
    - Display all leaf categories organized by parent and sub-category
    - Make collapsible sections
    - Highlight active category
    - _Requirements: 3.9_

- [x] 16. Location Features (Frontend)
  - [x] 16.1 Create location Redux slice
    - Create actions for set location, fetch cities, fetch areas
    - Create reducers for location state (selectedCity, selectedArea, cities, areas)
    - Store selected location in localStorage
    - _Requirements: 7.4, 7.17_
  
  - [x] 16.2 Create LocationModal component
    - Create modal with city and area dropdowns
    - Load areas when city is selected
    - Add "Use Current Location" button
    - Request geolocation permission
    - Detect city from coordinates
    - Save location to localStorage
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.12, 7.16, 7.17_
  
  - [x] 16.3 Implement location permission prompt
    - Show modal on first visit
    - Request browser geolocation permission
    - Auto-detect city if granted
    - Prompt manual selection if denied
    - _Requirements: 7.1, 7.2, 7.3, 7.19_

- [x] 17. Categories Features (Frontend)
  - [x] 17.1 Create categories Redux slice
    - Create actions for fetch categories, set active category
    - Create reducers for categories state (tree, parentCategories, activeCategory)
    - _Requirements: 3.1-3.8_
  
  - [x] 17.2 Create CategoryCard component
    - Display parent category icon and name
    - Display 1-2 featured sub-categories
    - Handle click to view all sub-categories
    - _Requirements: 3.10, 3.11, 3.12_
  
  - [x] 17.3 Implement category navigation
    - Update header with parent category name on selection
    - Maintain category context across navigation
    - _Requirements: 3.14, 3.15, 3.19_

- [x] 18. HomePage (Frontend)
  - [x] 18.1 Create HomePage component
    - Display location permission prompt (first visit)
    - Display parent category cards in grid
    - Display sidebar with leaf categories
    - Fetch and display ads from selected location
    - _Requirements: 3.9, 3.10, 7.1, 7.5_
  
  - [x] 18.2 Implement location-based ad filtering
    - Filter ads by selected city on homepage
    - Update ads when location changes
    - _Requirements: 7.5, 7.14_

- [x] 19. Ad Listing and Display (Frontend)
  - [x] 19.1 Create ads Redux slice
    - Create actions for fetch ads, fetch ad details, create ad, update ad, delete ad
    - Create reducers for ads state (list, currentAd, loading, error)
    - _Requirements: 4.1, 4.7, 4.8, 4.9_
  
  - [x] 19.2 Create AdCard component
    - Display thumbnail image
    - Display title (truncated if needed)
    - Display price
    - Display location (Area, City format)
    - Display posted date
    - Handle click to view details
    - _Requirements: 3.16, 7.14_
  
  - [x] 19.3 Create CategoryPage component
    - Display breadcrumbs (Parent > Sub > Leaf)
    - Display filter panel
    - Display sort options
    - Display ad grid with pagination
    - Display ad count
    - _Requirements: 3.18, 6.7, 6.9, 6.10, 11.1_
  
  - [x] 19.4 Create FilterPanel component
    - Add price range slider
    - Add location dropdown
    - Add category filter
    - Add Apply/Clear buttons
    - _Requirements: 6.3, 6.4, 6.5, 6.6_
  
  - [x] 19.5 Create Pagination component
    - Display page numbers
    - Add Previous/Next buttons
    - Display total pages
    - Disable buttons at boundaries
    - Handle page navigation
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 11.7_

- [x] 20. Ad Details Page (Frontend)
  - [x] 20.1 Create AdDetailsPage component
    - Display image gallery with thumbnails
    - Display ad title, price, description
    - Display location, category breadcrumbs
    - Display posted date, view count
    - Display seller information (name, phone)
    - Add "Contact Seller" button
    - Increment view count on page load
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7_
  
  - [x] 20.2 Create ImageGallery component
    - Display primary image
    - Display thumbnails for additional images
    - Handle thumbnail click to change primary image
    - _Requirements: 5.4, 5.5_

- [x] 21. Search Features (Frontend)
  - [x] 21.1 Create SearchBar component
    - Add text input with autocomplete
    - Fetch autocomplete suggestions on typing
    - Add search button
    - Add clear button
    - Handle search submission
    - _Requirements: 6.1, 6.8_
  
  - [x] 21.2 Implement search functionality
    - Create search API calls
    - Handle search with filters
    - Handle sorting
    - Handle pagination
    - Display search results
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.9, 6.10_

- [x] 22. Post Ad Feature (Frontend)
  - [x] 22.1 Create PostAdPage component (protected)
    - Create multi-step form (category, details, location, images)
    - Add step navigation
    - Add form validation
    - Add preview before submit
    - _Requirements: 4.1, 4.2_
  
  - [x] 22.2 Create category selection step
    - Display parent categories
    - Display sub-categories on parent selection
    - Display leaf categories on sub-category selection
    - Validate category selection
    - _Requirements: 3.17, 4.1_
  
  - [x] 22.3 Create ad details step
    - Add title input (10-100 chars)
    - Add description textarea (50-5000 chars)
    - Add price input (positive number)
    - Add validation
    - _Requirements: 4.1, 4.10, 4.11, 4.12_
  
  - [x] 22.4 Create location selection step
    - Add city dropdown
    - Add area dropdown (loads based on city)
    - Add validation
    - _Requirements: 4.1, 7.6, 7.12_
  
  - [x] 22.5 Create ImageUploader component
    - Add drag and drop zone
    - Add file input
    - Display image previews
    - Add remove button per image
    - Limit to 5 images
    - Validate file type (JPEG, PNG, WebP)
    - Validate file size (under 5MB)
    - Show upload progress
    - _Requirements: 4.2, 4.4, 4.5, 8.1, 8.2_
  
  - [x] 22.6 Implement ad creation
    - Upload images first
    - Create ad with image URLs
    - Handle success (redirect to ad details)
    - Handle errors
    - _Requirements: 4.1, 4.3, 4.6, 8.3_

- [x] 23. User Profile (Frontend)
  - [x] 23.1 Create ProfilePage component (protected)
    - Display user information
    - Add edit profile form
    - Display list of user's ads
    - Add edit/delete buttons per ad
    - _Requirements: 2.3, 2.4, 4.7_
  
  - [x] 23.2 Implement profile update
    - Allow updating name and phone
    - Prevent email updates
    - Add validation
    - Handle success/error
    - _Requirements: 2.2, 2.5, 2.6_
  
  - [x] 23.3 Implement ad management
    - Handle ad edit (navigate to edit form)
    - Handle ad delete (soft delete)
    - Refresh ad list after changes
    - _Requirements: 4.7, 4.8, 4.9_

- [x] 24. Responsive Design Implementation
  - [x] 24.1 Implement mobile layouts
    - Make header responsive (hamburger menu)
    - Make footer responsive (stack columns)
    - Make ad grid responsive (adjust columns)
    - Make forms responsive
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.11_
  
  - [x] 24.2 Ensure touch-friendly interactions
    - Make buttons and links large enough for touch
    - Add appropriate spacing
    - Test on mobile devices
    - _Requirements: 9.6_
  
  - [x] 24.3 Ensure text readability
    - Use appropriate font sizes
    - Ensure sufficient contrast
    - Test on various screen sizes
    - _Requirements: 9.7_

- [x] 25. UI Styling to Match Quikr
  - [x] 25.1 Apply Quikr color scheme
    - Use red/orange accents on white backgrounds
    - Apply consistent colors across all components
    - _Requirements: 9.9, 9.10, 9.13_
  
  - [x] 25.2 Create icon-based category representations
    - Add icons for each parent category
    - Style category cards to match Quikr
    - _Requirements: 9.12_
  
  - [x] 25.3 Ensure no emojis in UI
    - Review all components
    - Remove any emoji usage
    - _Requirements: 9.11_
  
  - [x] 25.4 Apply clean, minimal design
    - Use white backgrounds
    - Use clear typography
    - Maintain consistent spacing
    - _Requirements: 9.10_

- [x] 26. Final Integration and Testing
  - [x] 26.1 Connect all frontend components to backend APIs
    - Verify all API calls work correctly
    - Handle loading states
    - Handle error states
    - _Requirements: All_

- [x] 27. Final Checkpoint
  - Ensure all features are working end-to-end
  - Verify database is properly seeded
  - Test all user flows
  - Ensure responsive design works on all devices
  - Ask the user if questions arise

## Notes

- Each task builds on previous tasks incrementally
- Backend tasks are completed before frontend tasks
- Database migrations and seeders are created early for development data
- Authentication is implemented first as it's required for many features
- Core modules (users, categories, locations) are built before dependent modules (ads, search)
- Frontend follows a similar pattern: infrastructure → auth → layout → features
- Responsive design and styling are applied throughout but finalized at the end
- No test cases are included as per requirements

