# NestJS Development Rules

## Project Architecture

### Module Structure
- One module per feature domain
- Keep modules focused and cohesive
- Use barrel exports (index.ts) for clean imports
- Organize by feature, not by file type

### Layered Architecture
- **Controllers**: Handle HTTP requests/responses, validation, routing
- **Services**: Business logic, data manipulation, orchestration
- **Repositories**: Data access layer, database operations
- **DTOs**: Data transfer objects for validation and type safety
- **Entities**: Database models and schemas

### Module Organization
```
src/
├── modules/
│   ├── users/
│   │   ├── dto/
│   │   ├── entities/
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   ├── users.module.ts
│   │   └── index.ts
├── common/
│   ├── decorators/
│   ├── filters/
│   ├── guards/
│   ├── interceptors/
│   ├── pipes/
│   └── middleware/
├── config/
├── database/
└── main.ts
```

## Dependency Injection

### Constructor Injection
```typescript
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly emailService: EmailService,
  ) {}
}
```

### Injection Best Practices
- Always use constructor injection
- Inject interfaces, not concrete implementations when possible
- Keep constructor parameters under 5 dependencies
- Use `@Optional()` for optional dependencies
- Avoid circular dependencies

## Controllers

### Controller Structure
```typescript
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  async findAll(@Query() query: FindUsersDto): Promise<User[]> {
    return this.usersService.findAll(query);
  }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }
}
```

### Controller Rules
- Keep controllers thin - delegate to services
- Use DTOs for all request bodies and query parameters
- Apply validation pipes globally or per route
- Use proper HTTP status codes
- Document with Swagger decorators
- Handle only HTTP concerns (routing, status codes, headers)

### HTTP Methods
- **GET**: Retrieve resources (idempotent)
- **POST**: Create new resources
- **PUT**: Full update of resources (idempotent)
- **PATCH**: Partial update of resources
- **DELETE**: Remove resources (idempotent)

## Services

### Service Structure
```typescript
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(query: FindUsersDto): Promise<User[]> {
    return this.userRepository.find({
      where: query.filters,
      take: query.limit,
      skip: query.offset,
    });
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
}
```

### Service Rules
- One service per domain responsibility
- Services contain business logic only
- Return domain entities or DTOs, never raw database results
- Throw appropriate HTTP exceptions
- Use transactions for multi-step operations
- Keep methods focused and single-purpose

## Data Transfer Objects (DTOs)

### DTO Structure
```typescript
import { IsString, IsEmail, IsOptional, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ minLength: 8 })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name?: string;
}
```

### DTO Rules
- Use class-validator decorators for validation
- Use class-transformer for type conversion
- Separate DTOs for create, update, and query operations
- Use PartialType, PickType, OmitType for DTO composition
- Document with Swagger decorators
- Never expose sensitive fields in response DTOs

### DTO Types
- **CreateDto**: For POST requests
- **UpdateDto**: For PUT/PATCH requests
- **QueryDto**: For GET query parameters
- **ResponseDto**: For API responses (exclude sensitive data)

## Validation

### Global Validation Pipe
```typescript
// main.ts
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }),
);
```

### Validation Rules
- Enable whitelist to strip unknown properties
- Use forbidNonWhitelisted to reject invalid properties
- Transform payloads to DTO instances
- Validate all incoming data
- Use custom validators for complex validation logic

## Error Handling

### Exception Filters
```typescript
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

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
```

### Error Handling Rules
- Use built-in HTTP exceptions (NotFoundException, BadRequestException, etc.)
- Create custom exceptions for domain-specific errors
- Implement global exception filter
- Log errors with context
- Never expose stack traces in production
- Return consistent error response format

### Common HTTP Exceptions
- `BadRequestException` (400): Invalid input
- `UnauthorizedException` (401): Authentication required
- `ForbiddenException` (403): Insufficient permissions
- `NotFoundException` (404): Resource not found
- `ConflictException` (409): Resource conflict
- `InternalServerErrorException` (500): Server error

## Authentication & Authorization

### JWT Authentication
```typescript
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    return { id: payload.sub, email: payload.email };
  }
}
```

### Guards
```typescript
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
```

### Security Rules
- Use JWT for stateless authentication
- Store tokens in HttpOnly cookies or Authorization header
- Implement refresh token rotation
- Use guards for route protection
- Hash passwords with bcrypt (min 10 rounds)
- Validate and sanitize all inputs
- Implement rate limiting
- Use CORS appropriately

## Database

### TypeORM Entity
```typescript
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ nullable: true })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

### Database Rules
- Use migrations for schema changes
- Never run synchronize in production
- Use transactions for multi-step operations
- Index frequently queried columns
- Use soft deletes for important data
- Avoid N+1 queries with eager loading
- Use query builders for complex queries
- Implement pagination for large datasets

### Repository Pattern
```typescript
@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({ where: { email } });
  }

  async createUser(data: CreateUserDto): Promise<User> {
    const user = this.repository.create(data);
    return this.repository.save(user);
  }
}
```

## Configuration

### Environment Variables
```typescript
// config/configuration.ts
export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  },
});
```

### Configuration Rules
- Use @nestjs/config module
- Validate environment variables on startup
- Use .env files for local development
- Never commit .env files
- Use different configs per environment
- Type-safe configuration access
- Provide sensible defaults

## Middleware & Interceptors

### Logging Interceptor
```typescript
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;
    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();
        const delay = Date.now() - now;
        console.log(`${method} ${url} ${response.statusCode} - ${delay}ms`);
      }),
    );
  }
}
```

### Middleware Rules
- Use middleware for request preprocessing
- Use interceptors for response transformation
- Use pipes for validation and transformation
- Apply globally when appropriate
- Keep middleware focused and single-purpose

## API Documentation

### Swagger Setup
```typescript
// main.ts
const config = new DocumentBuilder()
  .setTitle('API Documentation')
  .setDescription('API description')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api/docs', app, document);
```

### Documentation Rules
- Document all endpoints with @ApiOperation
- Use @ApiResponse for response documentation
- Document DTOs with @ApiProperty
- Include examples in documentation
- Group endpoints with tags
- Document authentication requirements

## Performance

### Caching
```typescript
@Injectable()
export class UsersService {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  async findById(id: string): Promise<User> {
    const cacheKey = `user:${id}`;
    const cached = await this.cacheManager.get<User>(cacheKey);
    
    if (cached) {
      return cached;
    }

    const user = await this.userRepository.findOne({ where: { id } });
    await this.cacheManager.set(cacheKey, user, 3600);
    return user;
  }
}
```

### Performance Rules
- Implement caching for frequently accessed data
- Use Redis for distributed caching
- Implement pagination for large datasets
- Use database indexes appropriately
- Optimize database queries
- Use compression middleware
- Implement rate limiting
- Monitor and profile performance

## Logging

### Logger Usage
```typescript
@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  async create(createUserDto: CreateUserDto): Promise<User> {
    this.logger.log(`Creating user with email: ${createUserDto.email}`);
    try {
      const user = await this.userRepository.save(createUserDto);
      this.logger.log(`User created successfully: ${user.id}`);
      return user;
    } catch (error) {
      this.logger.error(`Failed to create user: ${error.message}`, error.stack);
      throw error;
    }
  }
}
```

### Logging Rules
- Use NestJS Logger, not console.log
- Include context in log messages
- Log at appropriate levels (log, error, warn, debug)
- Never log sensitive information
- Use structured logging in production
- Include correlation IDs for request tracking

## Code Quality

### Naming Conventions
- Controllers: `*.controller.ts` (UsersController)
- Services: `*.service.ts` (UsersService)
- Modules: `*.module.ts` (UsersModule)
- DTOs: `*.dto.ts` (CreateUserDto)
- Entities: `*.entity.ts` (User)
- Guards: `*.guard.ts` (JwtAuthGuard)
- Interceptors: `*.interceptor.ts` (LoggingInterceptor)

### File Organization
- One class per file
- Group related files in feature folders
- Use barrel exports (index.ts)
- Keep files under 300 lines
- Extract complex logic into separate services

### Code Style
- Use TypeScript strict mode
- Explicit return types for all methods
- Use async/await over promises
- Prefer const over let
- Use meaningful variable names
- Remove unused imports and code

## API Versioning

### URI Versioning
```typescript
@Controller({
  path: 'users',
  version: '1',
})
export class UsersV1Controller {}

// main.ts
app.enableVersioning({
  type: VersioningType.URI,
});
```

### Versioning Rules
- Version APIs from the start
- Use URI versioning for simplicity
- Maintain backward compatibility
- Deprecate old versions gracefully
- Document version differences

## Request/Response Patterns

### Pagination
```typescript
export class PaginationDto {
  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
```

### Response Format
```typescript
export class ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: any[];
}
```

## Microservices

### Message Patterns
```typescript
@Controller()
export class UsersController {
  @MessagePattern({ cmd: 'get_user' })
  async getUser(@Payload() data: { id: string }): Promise<User> {
    return this.usersService.findById(data.id);
  }
}
```

### Microservices Rules
- Use message patterns for service communication
- Implement health checks
- Use circuit breakers for resilience
- Handle service failures gracefully
- Use event-driven architecture when appropriate

## Dependencies

### Package Management
- Lock dependencies with package-lock.json
- Audit dependencies regularly
- Keep NestJS packages in sync
- Remove unused dependencies
- Use exact versions for critical packages

### Common Dependencies
- `@nestjs/common`, `@nestjs/core`: Core framework
- `@nestjs/config`: Configuration management
- `@nestjs/typeorm`: Database integration
- `class-validator`, `class-transformer`: Validation
- `@nestjs/swagger`: API documentation
- `@nestjs/jwt`, `@nestjs/passport`: Authentication

## Git Practices

### Commits
- Use conventional commits format
- Keep commits atomic and focused
- Write descriptive commit messages
- Reference issue numbers
- Commit working code only

### Branch Strategy
- Feature branches from main/develop
- Branch naming: `feature/`, `fix/`, `refactor/`
- Keep branches short-lived
- Rebase before merging
- Delete merged branches
