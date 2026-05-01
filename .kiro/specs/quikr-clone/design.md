# Design Document: Quikr Clone

## Overview

This document provides the technical design for a Quikr.com clone - an online classified ads marketplace platform. The system enables buyers and sellers to connect through classified advertisements across multiple categories with location-based filtering.

### Technology Stack

- **Frontend**: ReactJS with TypeScript, Tailwind CSS, Redux Toolkit for state management
- **Backend**: NestJS with TypeScript
- **Database**: PostgreSQL with TypeORM
- **Authentication**: JWT-based authentication
- **File Storage**: Local file system (with path stored in database)
- **API**: RESTful API architecture

### Key Features

1. User authentication and authorization
2. Three-level category hierarchy (Parent → Sub-category → Leaf)
3. Ad creation, editing, and management with image uploads
4. Location-based ad filtering and personalization
5. Search with filters (category, location, price range)
6. Responsive design matching Quikr.com's visual style
7. Database migrations and seeders for development

## Architecture

### System Architecture

The application follows a client-server architecture with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend (React)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Pages      │  │  Components  │  │  Redux Store │      │
│  │              │  │              │  │              │      │
│  │ - Home       │  │ - Header     │  │ - Auth       │      │
│  │ - Category   │  │ - Footer     │  │ - Ads        │      │
│  │ - AdDetails  │  │ - AdCard     │  │ - Categories │      │
│  │ - PostAd     │  │ - SearchBar  │  │ - Location   │      │
│  │ - Profile    │  │ - Filters    │  │              │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                           │                                  │
│                           │ HTTP/REST API                    │
└───────────────────────────┼──────────────────────────────────┘
                            │
┌───────────────────────────┼──────────────────────────────────┐
│                           │                                  │
│                    Backend (NestJS)                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Controllers  │  │   Services   │  │ Repositories │      │
│  │              │  │              │  │              │      │
│  │ - Auth       │  │ - Auth       │  │ - User       │      │
│  │ - Users      │  │ - Users      │  │ - Ad         │      │
│  │ - Ads        │  │ - Ads        │  │ - Category   │      │
│  │ - Categories │  │ - Categories │  │ - Location   │      │
│  │ - Search     │  │ - Search     │  │ - Image      │      │
│  │ - Images     │  │ - Images     │  │              │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│         │                  │                  │              │
│         │                  │                  │              │
│  ┌──────┴──────────────────┴──────────────────┴──────┐      │
│  │              Guards & Middleware                   │      │
│  │  - JWT Auth Guard                                  │      │
│  │  - Validation Pipe                                 │      │
│  │  - Rate Limiting                                   │      │
│  └────────────────────────────────────────────────────┘      │
│                           │                                  │
└───────────────────────────┼──────────────────────────────────┘
                            │
┌───────────────────────────┼──────────────────────────────────┐
│                    PostgreSQL Database                       │
│  ┌──────────────────────────────────────────────────┐       │
│  │  Tables: users, ads, categories, cities, areas,  │       │
│  │          images, parent_categories, sub_categories│       │
│  └──────────────────────────────────────────────────┘       │
└──────────────────────────────────────────────────────────────┘
```

### Design Patterns

1. **Repository Pattern**: Data access abstraction through TypeORM repositories
2. **Dependency Injection**: NestJS built-in DI container for loose coupling
3. **DTO Pattern**: Data Transfer Objects for validation and type safety
4. **Guard Pattern**: Authentication and authorization guards
5. **Middleware Pattern**: Request preprocessing and logging
6. **Redux Pattern**: Centralized state management in frontend

## Components and Interfaces

### Backend Components

#### 1. Authentication Module

**AuthController**
- `POST /auth/check` - Check if email/phone exists
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/profile` - Get current user profile (protected)

**AuthService**
- `checkUserExists(identifier: string): Promise<boolean>` - Check if email/phone exists
- `register(dto: RegisterDto): Promise<{ access_token: string, user: User }>` - Create new user account
- `login(dto: LoginDto): Promise<{ access_token: string, user: User }>` - Authenticate user
- `validateUser(identifier: string, password: string): Promise<User>` - Validate credentials
- `hashPassword(password: string): Promise<string>` - Hash password with bcrypt

**JwtStrategy**
- Validates JWT tokens
- Extracts user payload from token

#### 2. Users Module

**UsersController**
- `GET /users/profile` - Get user profile (protected)
- `PATCH /users/profile` - Update user profile (protected)
- `GET /users/:id/ads` - Get ads by user

**UsersService**
- `findById(id: string): Promise<User>` - Find user by ID
- `findByEmail(email: string): Promise<User>` - Find user by email
- `update(id: string, dto: UpdateUserDto): Promise<User>` - Update user profile
- `getUserAds(userId: string): Promise<Ad[]>` - Get all ads posted by user

#### 3. Ads Module

**AdsController**
- `POST /ads` - Create new ad (protected)
- `GET /ads` - Get all ads with pagination and filters
- `GET /ads/:id` - Get ad details
- `PATCH /ads/:id` - Update ad (protected, owner only)
- `DELETE /ads/:id` - Soft delete ad (protected, owner only)
- `POST /ads/:id/view` - Increment view count

**AdsService**
- `create(userId: string, dto: CreateAdDto): Promise<Ad>` - Create new ad
- `findAll(query: FindAdsDto): Promise<PaginatedResponse<Ad>>` - Get ads with filters
- `findById(id: string): Promise<Ad>` - Get ad by ID
- `update(id: string, userId: string, dto: UpdateAdDto): Promise<Ad>` - Update ad
- `softDelete(id: string, userId: string): Promise<void>` - Soft delete ad
- `incrementViews(id: string): Promise<void>` - Increment view count

#### 4. Categories Module

**CategoriesController**
- `GET /categories` - Get all categories (hierarchical)
- `GET /categories/parent` - Get all parent categories
- `GET /categories/parent/:id/sub` - Get sub-categories by parent
- `GET /categories/sub/:id/leaf` - Get leaf categories by sub-category

**CategoriesService**
- `findAll(): Promise<CategoryTree[]>` - Get complete category hierarchy
- `findParentCategories(): Promise<ParentCategory[]>` - Get all parent categories
- `findSubCategories(parentId: string): Promise<SubCategory[]>` - Get sub-categories
- `findLeafCategories(subId: string): Promise<LeafCategory[]>` - Get leaf categories

#### 5. Locations Module

**LocationsController**
- `GET /locations/cities` - Get all cities
- `GET /locations/cities/:id/areas` - Get areas by city
- `POST /locations/detect` - Detect city from coordinates

**LocationsService**
- `findAllCities(): Promise<City[]>` - Get all cities
- `findAreasByCity(cityId: string): Promise<Area[]>` - Get areas for city
- `detectCity(lat: number, lon: number): Promise<City>` - Detect city from coordinates

#### 6. Images Module

**ImagesController**
- `POST /images/upload` - Upload image (protected)
- `GET /images/:filename` - Serve image file

**ImagesService**
- `uploadImage(file: Express.Multer.File, adId: string): Promise<Image>` - Upload and save image
- `validateImage(file: Express.Multer.File): boolean` - Validate image format and size
- `deleteImage(id: string): Promise<void>` - Delete image file and record

#### 7. Search Module

**SearchController**
- `GET /search` - Search ads with filters
- `GET /search/autocomplete` - Get autocomplete suggestions

**SearchService**
- `search(query: SearchDto): Promise<PaginatedResponse<Ad>>` - Search ads
- `autocomplete(term: string): Promise<string[]>` - Get autocomplete suggestions

### Frontend Components

#### 1. Layout Components

**Header**
- Logo with dynamic parent category name
- Location selector
- Search bar
- User menu (Login/Register or Profile/Logout)
- "Post Free Ad" button

**Footer**
- About section links
- Categories links
- Help and Support links
- Social media icons
- Download app badges
- Copyright information

**Sidebar**
- All leaf categories organized by parent and sub-category
- Collapsible sections

#### 2. Page Components

**HomePage**
- Location permission prompt (first visit)
- Category cards (parent categories with featured sub-categories)
- Sidebar with all leaf categories
- Featured ads section

**CategoryPage**
- Breadcrumbs (Parent > Sub > Leaf)
- Filter panel (price range, location)
- Sort options (newest, price low-high, price high-low)
- Ad grid with pagination
- Ad count

**AdDetailsPage**
- Image gallery with thumbnails
- Ad title, price, description
- Location, category path
- Posted date, view count
- Seller information (name, phone)
- "Contact Seller" button

**PostAdPage** (Protected)
- Multi-step form:
  1. Category selection (drill down from parent to leaf)
  2. Ad details (title, description, price)
  3. Location selection (city, area)
  4. Image upload (up to 5 images)
- Form validation
- Preview before submit

**ProfilePage** (Protected)
- User information display
- Edit profile form
- List of user's ads with edit/delete options

**LoginPage**
- Email and password form
- Link to register page
- Form validation

**RegisterPage**
- Registration form (name, email, phone, password)
- Link to login page
- Form validation

**AuthModal** (Modal Popup)
- Smart authentication form
- Email/phone input field
- Password input field
- Conditional name field (shown only for new users)
- Auto-detection of login vs register
- Form validation
- Close button

#### 3. Reusable Components

**AdCard**
- Thumbnail image
- Title (truncated)
- Price
- Location
- Posted date
- Click to view details

**SearchBar**
- Text input with autocomplete
- Search button
- Clear button

**CategoryCard**
- Parent category icon
- Parent category name
- 1-2 featured sub-categories
- Click to view all sub-categories

**FilterPanel**
- Price range slider
- Location dropdown
- Category filter
- Apply/Clear buttons

**ImageUploader**
- Drag and drop zone
- File input
- Image preview with remove option
- Upload progress
- Validation messages

**LocationModal**
- City dropdown
- Area dropdown (loads based on city)
- Current location button
- Save button

**Pagination**
- Page numbers
- Previous/Next buttons
- Total pages display
- Jump to page input

## Data Models

### Database Schema

#### Users Table
```typescript
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  name: string;

  @Column({ length: 10 })
  phone: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Ad, ad => ad.user)
  ads: Ad[];
}
```

#### Parent Categories Table
```typescript
@Entity('parent_categories')
export class ParentCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string; // QuikrBazar, QuikrCars, etc.

  @Column({ unique: true })
  slug: string;

  @Column({ nullable: true })
  icon: string;

  @OneToMany(() => SubCategory, sub => sub.parent)
  subCategories: SubCategory[];
}
```

#### Sub Categories Table
```typescript
@Entity('sub_categories')
export class SubCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string; // Electronics, Furniture, etc.

  @Column()
  slug: string;

  @ManyToOne(() => ParentCategory, parent => parent.subCategories)
  parent: ParentCategory;

  @Column()
  parentId: string;

  @OneToMany(() => LeafCategory, leaf => leaf.subCategory)
  leafCategories: LeafCategory[];
}
```

#### Leaf Categories Table
```typescript
@Entity('leaf_categories')
export class LeafCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string; // Mobile Phones, TV, etc.

  @Column()
  slug: string;

  @ManyToOne(() => SubCategory, sub => sub.leafCategories)
  subCategory: SubCategory;

  @Column()
  subCategoryId: string;

  @OneToMany(() => Ad, ad => ad.category)
  ads: Ad[];
}
```

#### Cities Table
```typescript
@Entity('cities')
export class City {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  state: string;

  @OneToMany(() => Area, area => area.city)
  areas: Area[];

  @OneToMany(() => Ad, ad => ad.city)
  ads: Ad[];
}
```

#### Areas Table
```typescript
@Entity('areas')
export class Area {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => City, city => city.areas)
  city: City;

  @Column()
  cityId: string;

  @OneToMany(() => Ad, ad => ad.area)
  ads: Ad[];
}
```

#### Ads Table
```typescript
@Entity('ads')
export class Ad {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => User, user => user.ads)
  user: User;

  @Column()
  userId: string;

  @ManyToOne(() => LeafCategory, category => category.ads)
  category: LeafCategory;

  @Column()
  categoryId: string;

  @ManyToOne(() => City, city => city.ads)
  city: City;

  @Column()
  cityId: string;

  @ManyToOne(() => Area, area => area.ads)
  area: Area;

  @Column()
  areaId: string;

  @Column({ default: 0 })
  views: number;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Image, image => image.ad)
  images: Image[];
}
```

#### Images Table
```typescript
@Entity('images')
export class Image {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  filename: string;

  @Column()
  path: string;

  @Column()
  url: string;

  @ManyToOne(() => Ad, ad => ad.images, { onDelete: 'CASCADE' })
  ad: Ad;

  @Column()
  adId: string;

  @Column({ default: 0 })
  order: number;

  @CreateDateColumn()
  createdAt: Date;
}
```

### DTOs (Data Transfer Objects)

#### Authentication DTOs
```typescript
export class CheckUserDto {
  @IsString()
  identifier: string; // email or phone
}

export class RegisterDto {
  @IsString()
  identifier: string; // email or phone

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @MinLength(2)
  name: string;
}

export class LoginDto {
  @IsString()
  identifier: string; // email or phone

  @IsString()
  password: string;
}
```

#### Ad DTOs
```typescript
export class CreateAdDto {
  @IsString()
  @MinLength(10)
  @MaxLength(100)
  title: string;

  @IsString()
  @MinLength(50)
  @MaxLength(5000)
  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsUUID()
  categoryId: string;

  @IsUUID()
  cityId: string;

  @IsUUID()
  areaId: string;
}

export class UpdateAdDto extends PartialType(CreateAdDto) {}

export class FindAdsDto {
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @IsOptional()
  @IsUUID()
  cityId?: string;

  @IsOptional()
  @IsUUID()
  areaId?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  minPrice?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  maxPrice?: number;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(['newest', 'oldest', 'price_asc', 'price_desc'])
  sortBy?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 20;
}
```

#### User DTOs
```typescript
export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @IsOptional()
  @IsString()
  @Length(10, 10)
  @Matches(/^[0-9]+$/)
  phone?: string;
}
```

### API Response Formats

#### Success Response
```typescript
interface ApiResponse<T> {
  success: true;
  data: T;
  message?: string;
}
```

#### Error Response
```typescript
interface ErrorResponse {
  success: false;
  message: string;
  errors?: ValidationError[];
  statusCode: number;
}
```

#### Paginated Response
```typescript
interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
```

## API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/check` | Check if email/phone exists | No |
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/profile` | Get current user | Yes |

### User Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/users/profile` | Get user profile | Yes |
| PATCH | `/api/users/profile` | Update user profile | Yes |
| GET | `/api/users/:id/ads` | Get user's ads | No |

### Ad Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/ads` | Create new ad | Yes |
| GET | `/api/ads` | Get all ads (with filters) | No |
| GET | `/api/ads/:id` | Get ad details | No |
| PATCH | `/api/ads/:id` | Update ad | Yes (owner) |
| DELETE | `/api/ads/:id` | Delete ad | Yes (owner) |
| POST | `/api/ads/:id/view` | Increment view count | No |

### Category Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/categories` | Get all categories (tree) | No |
| GET | `/api/categories/parent` | Get parent categories | No |
| GET | `/api/categories/parent/:id/sub` | Get sub-categories | No |
| GET | `/api/categories/sub/:id/leaf` | Get leaf categories | No |

### Location Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/locations/cities` | Get all cities | No |
| GET | `/api/locations/cities/:id/areas` | Get areas by city | No |
| POST | `/api/locations/detect` | Detect city from coords | No |

### Image Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/images/upload` | Upload image | Yes |
| GET | `/api/images/:filename` | Get image file | No |

### Search Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/search` | Search ads | No |
| GET | `/api/search/autocomplete` | Get suggestions | No |


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: User Registration Creates Valid Account

*For any* valid email and password (meeting length requirements), when a user registers, the system should create a new user account with a hashed password, and the user should be able to login with those credentials.

**Validates: Requirements 1.1, 1.3, 1.5**

### Property 2: Password Validation Enforces Minimum Length

*For any* password string, the authentication service should reject passwords shorter than 8 characters and accept passwords of 8 or more characters.

**Validates: Requirements 1.4**

### Property 3: JWT Authentication Round Trip

*For any* authenticated user, when they login and receive a JWT token, making requests with that token should authorize them until the token expires, and expired/invalid tokens should be rejected.

**Validates: Requirements 1.7, 1.8, 12.6**

### Property 4: Profile Updates Preserve Email Immutability

*For any* user profile, when updating name or phone number, the changes should be saved, but attempts to update email should be rejected.

**Validates: Requirements 2.2, 2.5**

### Property 5: Phone Number Validation

*For any* phone number input, the system should accept only strings containing exactly 10 digits and reject all other formats.

**Validates: Requirements 2.6**

### Property 6: User-Ad Relationship Integrity

*For any* user, when viewing their profile, the system should return exactly the ads they created (matching userId), and no ads from other users.

**Validates: Requirements 2.4, 4.7**

### Property 7: Ad Creation Requires All Fields

*For any* ad creation attempt, the system should reject ads missing any required field (title, description, price, category, location) and accept ads with all required fields present.

**Validates: Requirements 4.1**

### Property 8: Ad Field Validation

*For any* ad, the system should enforce: title length between 10-100 characters, description length between 50-5000 characters, and price as a positive number. Ads violating these constraints should be rejected.

**Validates: Requirements 4.10, 4.11, 4.12**

### Property 9: Ad Category Assignment

*For any* ad, the system should require assignment to exactly one leaf category and reject ads without a category or with multiple categories.

**Validates: Requirements 3.17**

### Property 10: Image Upload Validation

*For any* uploaded file, the image service should accept only JPEG, PNG, or WebP formats under 5MB in size, and reject files that don't meet these criteria.

**Validates: Requirements 4.4, 4.5, 8.1, 8.2**

### Property 11: Image Filename Uniqueness

*For any* set of uploaded images, the system should generate unique filenames for each image to prevent collisions, even if the original filenames are identical.

**Validates: Requirements 8.4**

### Property 12: Soft Delete Preserves Data

*For any* ad, when a seller deletes it, the system should mark it as inactive (isActive = false) rather than removing the record, and the ad should no longer appear in public listings.

**Validates: Requirements 4.9**

### Property 13: Ad Update Timestamp

*For any* ad, when updated, the system should save the changes and update the updatedAt timestamp to reflect the modification time.

**Validates: Requirements 4.8**

### Property 14: View Count Increment

*For any* ad, each time the ad details page is viewed, the view count should increment by exactly one.

**Validates: Requirements 5.7**

### Property 15: Search Query Matching

*For any* search query string, the search service should return all ads where the query appears in either the title or description (case-insensitive), and exclude ads that don't match.

**Validates: Requirements 6.1, 6.2**

### Property 16: Comprehensive Filter Application

*For any* combination of filters (category, location, price range), the search service should return only ads matching all applied filter criteria simultaneously.

**Validates: Requirements 6.3, 6.4, 6.5, 6.6, 7.13**

### Property 17: Search Result Count Accuracy

*For any* search query with filters, the total count returned in metadata should exactly match the number of ads that satisfy the search criteria.

**Validates: Requirements 6.7**

### Property 18: Sort Order Correctness

*For any* search results, when sorted by date (newest/oldest) or price (low-high/high-low), the results should be in the correct order according to the selected sort criterion.

**Validates: Requirements 6.9, 6.10**

### Property 19: City-Area Relationship

*For any* city selection, when loading areas, the system should return only areas belonging to that city (matching cityId), and no areas from other cities.

**Validates: Requirements 7.12**

### Property 20: Location Display Format

*For any* ad with location data, when displaying the location, the system should format it as "Area, City" by joining the area and city names.

**Validates: Requirements 7.14**

### Property 21: Image Cascade Cleanup

*For any* ad with images, when the ad is deleted, all associated images should be marked for cleanup (cascade delete behavior).

**Validates: Requirements 8.5**

### Property 22: Pagination Correctness

*For any* paginated ad listing, the system should return the correct subset of ads for the requested page, calculate total pages correctly (total / limit), and provide accurate page metadata.

**Validates: Requirements 11.2, 11.6, 11.7**

### Property 23: Input Sanitization

*For any* text input containing HTML or script tags, the system should sanitize the input to prevent XSS attacks by escaping or removing malicious content.

**Validates: Requirements 12.2**

### Property 24: Type Validation

*For any* API request, the system should validate that all fields match their expected data types (string, number, UUID, etc.) and reject requests with type mismatches.

**Validates: Requirements 12.3**

### Property 25: Validation Error Specificity

*For any* validation failure, the system should return error messages that specifically identify which fields are invalid and why, rather than generic error messages.

**Validates: Requirements 12.4**

### Property 26: Category Breadcrumb Path

*For any* ad, when displaying it, the system should show the complete category path (Parent > Sub-Category > Leaf) as breadcrumbs by traversing the category hierarchy.

**Validates: Requirements 3.18**

### Property 27: Ad Card Display Completeness

*For any* ad in a listing, the ad card should display all required fields: title, price, location, and thumbnail image.

**Validates: Requirements 3.16**

### Property 28: Foreign Key Integrity

*For any* ad created, the system should store valid foreign keys (userId, categoryId, cityId, areaId) that reference existing records in their respective tables.

**Validates: Requirements 4.3, 7.7**

### Property 29: Image URL Generation

*For any* successfully uploaded image, the image service should store the image file and return a valid URL that can be used to retrieve the image.

**Validates: Requirements 8.3**

### Property 30: Default Ad Status

*For any* newly created ad, the system should automatically set the isActive status to true.

**Validates: Requirements 4.6**

## Error Handling

### Error Categories

1. **Validation Errors (400 Bad Request)**
   - Missing required fields
   - Invalid data types
   - Field length violations
   - Format violations (email, phone, etc.)
   - Business rule violations (duplicate email, etc.)

2. **Authentication Errors (401 Unauthorized)**
   - Invalid credentials
   - Missing JWT token
   - Expired JWT token
   - Malformed JWT token

3. **Authorization Errors (403 Forbidden)**
   - Attempting to modify another user's ad
   - Accessing protected resources without permission

4. **Not Found Errors (404 Not Found)**
   - Ad not found
   - User not found
   - Category not found
   - City/Area not found

5. **Conflict Errors (409 Conflict)**
   - Email already registered
   - Duplicate resource creation

6. **Server Errors (500 Internal Server Error)**
   - Database connection failures
   - Unexpected exceptions
   - File system errors

### Error Response Format

All errors follow a consistent format:

```typescript
{
  "success": false,
  "message": "Human-readable error message",
  "errors": [
    {
      "field": "email",
      "message": "Email is already registered"
    }
  ],
  "statusCode": 400
}
```

### Error Handling Strategy

1. **Input Validation**: Use class-validator decorators in DTOs to validate all inputs at the controller level
2. **Global Exception Filter**: Catch all exceptions and format them consistently
3. **Custom Exceptions**: Create domain-specific exceptions for business logic errors
4. **Logging**: Log all errors with context (user ID, request ID, timestamp)
5. **User-Friendly Messages**: Never expose internal error details or stack traces to clients
6. **Graceful Degradation**: Handle partial failures (e.g., some images fail to upload)

### Backend Error Handling

```typescript
// Global Exception Filter
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = exception instanceof HttpException
      ? exception.getResponse()
      : 'Internal server error';

    // Log error with context
    logger.error({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message,
      stack: exception instanceof Error ? exception.stack : undefined,
    });

    response.status(status).json({
      success: false,
      statusCode: status,
      message: typeof message === 'string' ? message : message['message'],
      errors: typeof message === 'object' ? message['errors'] : undefined,
    });
  }
}
```

### Frontend Error Handling

1. **API Error Interceptor**: Axios interceptor to handle API errors globally
2. **Error Boundaries**: React error boundaries to catch rendering errors
3. **Toast Notifications**: Display user-friendly error messages
4. **Form Validation**: Client-side validation before API calls
5. **Retry Logic**: Automatic retry for network failures
6. **Fallback UI**: Show fallback content when data fails to load

```typescript
// Axios Error Interceptor
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error
      const { status, data } = error.response;
      
      if (status === 401) {
        // Redirect to login
        store.dispatch(logout());
        window.location.href = '/login';
      } else if (status === 403) {
        toast.error('You do not have permission to perform this action');
      } else if (status === 404) {
        toast.error('Resource not found');
      } else if (status >= 500) {
        toast.error('Server error. Please try again later.');
      } else {
        toast.error(data.message || 'An error occurred');
      }
    } else if (error.request) {
      // Request made but no response
      toast.error('Network error. Please check your connection.');
    } else {
      // Something else happened
      toast.error('An unexpected error occurred');
    }
    
    return Promise.reject(error);
  }
);
```

