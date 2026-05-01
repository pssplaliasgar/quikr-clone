# React.js Development Rules

## Component Architecture

### Component Types
- **Presentational Components**: Pure UI, receive data via props, no business logic
- **Container Components**: Handle data fetching, state management, pass data to presentational components
- **Layout Components**: Define page structure, handle responsive behavior
- **Page Components**: Top-level route components, compose containers and layouts

### Component Structure
```typescript
// 1. Imports (external, then internal)
// 2. Type definitions
// 3. Component definition
// 4. Styled components or styles (if applicable)
// 5. Export
```

### Naming Conventions
- Components: PascalCase (`UserProfile.tsx`)
- Hooks: camelCase with 'use' prefix (`useAuth.ts`)
- Utils: camelCase (`formatDate.ts`)
- Constants: UPPER_SNAKE_CASE (`API_BASE_URL`)
- Props interfaces: ComponentName + 'Props' (`UserProfileProps`)

## TypeScript Usage

### Props Typing
```typescript
// Always define prop types
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

// Destructure with types
const Button: React.FC<ButtonProps> = ({ label, onClick, variant = 'primary', disabled = false }) => {
  // component logic
};
```

### Event Handlers
```typescript
// Type event handlers explicitly
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  // handler logic
};

const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  // handler logic
};
```

### Avoid 'any'
- Use proper types or 'unknown' instead of 'any'
- Create specific types for complex objects
- Use generics for reusable components

## Hooks Best Practices

### useState
- Initialize with proper types
- Group related state together
- Use functional updates when depending on previous state
```typescript
const [count, setCount] = useState<number>(0);
setCount(prev => prev + 1); // functional update
```

### useEffect
- One effect per concern
- Always include dependency array
- Clean up side effects (subscriptions, timers)
```typescript
useEffect(() => {
  const timer = setTimeout(() => {}, 1000);
  return () => clearTimeout(timer); // cleanup
}, [dependency]);
```

### Custom Hooks
- Extract reusable logic into custom hooks
- Prefix with 'use'
- Return arrays for multiple values, objects for named returns
- Keep hooks focused on single responsibility

### Hook Rules
- Only call hooks at top level
- Only call hooks in React functions
- Don't call hooks conditionally

## State Management

### Local State
- Use for component-specific UI state
- Form inputs, toggles, modals
- Keep state as close to where it's used as possible

### Context API
- Use for app-wide state (theme, auth, language)
- Avoid overuse - can cause unnecessary re-renders
- Split contexts by concern
- Memoize context values

### External State (Redux/Zustand)
- Use for complex shared state
- Async operations and caching
- State that needs to persist
- Multiple components need same data

## Performance Optimization

### Memoization
```typescript
// Memoize expensive components
const MemoizedComponent = React.memo(ExpensiveComponent);

// Memoize expensive calculations
const expensiveValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

// Memoize callbacks passed to children
const handleClick = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

### Code Splitting
```typescript
// Lazy load routes
const Dashboard = lazy(() => import('./pages/Dashboard'));

// Use Suspense for loading states
<Suspense fallback={<Loading />}>
  <Dashboard />
</Suspense>
```

### Avoid Unnecessary Renders
- Use React DevTools Profiler
- Memoize context values
- Split large components
- Move state down when possible

## Data Fetching

### API Calls
- Use custom hooks for data fetching
- Handle loading, error, and success states
- Implement proper error boundaries
- Consider using React Query or SWR for caching

```typescript
const useUser = (userId: string) => {
  const [data, setData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchUser(userId)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [userId]);

  return { data, loading, error };
};
```

## Forms

### Form Handling
- Use controlled components for form inputs
- Consider React Hook Form for complex forms
- Validate on blur and submit, not on every keystroke
- Provide clear error messages

### Form State
```typescript
const [formData, setFormData] = useState({
  email: '',
  password: ''
});

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData(prev => ({
    ...prev,
    [e.target.name]: e.target.value
  }));
};
```

## Styling

### CSS Modules
- One CSS module per component
- Use camelCase for class names
- Scope styles to component

### Styled Components / Emotion
- Define styled components outside main component
- Use theme for consistent design tokens
- Avoid inline styles for static values

### Tailwind CSS
- Use utility classes consistently
- Extract repeated patterns into components
- Use @apply for common patterns in CSS

### General Styling Rules
- Mobile-first responsive design
- Use CSS variables for theming
- Avoid !important
- Keep specificity low

## Error Handling

### Error Boundaries
```typescript
class ErrorBoundary extends React.Component<Props, State> {
  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

### Error States
- Show user-friendly error messages
- Provide retry mechanisms
- Log errors for debugging
- Never show raw error objects to users

## Accessibility

### Semantic HTML
- Use proper HTML elements (`<button>`, `<nav>`, `<main>`)
- Add ARIA labels when needed
- Ensure keyboard navigation works
- Test with screen readers

### Focus Management
- Visible focus indicators
- Logical tab order
- Trap focus in modals
- Return focus after modal closes

### Alt Text and Labels
- All images have alt text
- Form inputs have labels
- Buttons have descriptive text
- Use aria-label for icon buttons

## File Organization

### Project Structure
```
src/
├── components/       # Shared components
│   ├── Button/
│   │   ├── Button.tsx
│   │   └── index.ts
├── features/        # Feature modules
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types/
├── hooks/           # Shared hooks
├── pages/           # Route components
├── services/        # API services
├── utils/           # Utility functions
├── types/           # Shared types
└── constants/       # App constants
```

### Import Order
1. External libraries (React, third-party)
2. Internal modules (components, hooks)
3. Types
4. Styles
5. Assets

## Code Quality

### Component Size
- Keep components under 250 lines
- Extract complex logic into hooks
- Split large components into smaller ones
- One component per file

### Props
- Limit to 5-7 props per component
- Use composition over prop drilling
- Destructure props in function signature
- Provide default values for optional props

### Comments
- Explain complex logic
- Document non-obvious behavior
- Keep comments up to date
- Remove commented-out code

## Environment Variables

### Naming
- Prefix with `REACT_APP_` (Create React App)
- Prefix with `VITE_` (Vite)
- Use UPPER_SNAKE_CASE

### Usage
```typescript
const API_URL = import.meta.env.VITE_API_URL; // Vite
const API_URL = process.env.REACT_APP_API_URL; // CRA
```

### Security
- Never commit `.env` files
- Use `.env.example` for documentation
- Don't store secrets in environment variables exposed to browser

## Build and Bundle

### Optimization
- Enable production builds for deployment
- Analyze bundle size regularly
- Code split by route
- Lazy load heavy components
- Optimize images and assets

### Dependencies
- Audit dependencies regularly
- Remove unused dependencies
- Use exact versions for critical packages
- Keep React and related packages in sync

## Git Practices

### Commits
- Commit working code only
- Write descriptive commit messages
- Use conventional commits format
- Keep commits focused and atomic

### Code Review
- Self-review before requesting review
- Test changes locally
- Update tests with code changes
- Document breaking changes
