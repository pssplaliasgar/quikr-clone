# CSS and Styling Rules for Quikr Clone

## Tailwind CSS Configuration

### Color Palette - Quikr Theme

**Primary Colors (Red/Orange Accents):**
- Use the custom color palette defined in `tailwind.config.js`
- Primary: Red shades for main actions and branding
- Accent: Orange shades for secondary actions and highlights
- Background: White (#FFFFFF) for main backgrounds
- Text: Dark gray/black for readability

**CRITICAL: NO GRADIENT COLORS**
- Never use gradient utilities (bg-gradient-to-*, from-*, via-*, to-*)
- Use solid colors only throughout the application
- Quikr uses flat, clean design without gradients

### Color Usage Guidelines

```typescript
// Primary Actions (Buttons, Links, CTAs)
className="bg-primary-600 hover:bg-primary-700 text-white"

// Secondary Actions
className="bg-accent-500 hover:bg-accent-600 text-white"

// Backgrounds
className="bg-white"           // Main content areas
className="bg-gray-50"         // Subtle backgrounds
className="bg-gray-100"        // Card backgrounds

// Text Colors
className="text-gray-900"      // Primary text
className="text-gray-600"      // Secondary text
className="text-gray-400"      // Disabled/placeholder text
className="text-primary-600"   // Links and emphasis

// Borders
className="border-gray-200"    // Default borders
className="border-primary-600" // Active/focused borders
```

## Component Styling Patterns

### Buttons

```tsx
// Primary Button
<button className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md font-medium transition-colors">
  Post Free Ad
</button>

// Secondary Button
<button className="px-6 py-2 bg-accent-500 hover:bg-accent-600 text-white rounded-md font-medium transition-colors">
  Search
</button>

// Outline Button
<button className="px-6 py-2 border-2 border-primary-600 text-primary-600 hover:bg-primary-50 rounded-md font-medium transition-colors">
  Learn More
</button>

// Text Button
<button className="px-4 py-2 text-primary-600 hover:text-primary-700 font-medium transition-colors">
  Cancel
</button>
```

### Cards

```tsx
// Standard Card
<div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
  {/* Card content */}
</div>

// Ad Card
<div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
  <img className="w-full h-48 object-cover" />
  <div className="p-4">
    <h3 className="text-lg font-semibold text-gray-900 truncate">Title</h3>
    <p className="text-xl font-bold text-primary-600 mt-2">₹ 25,000</p>
    <p className="text-sm text-gray-600 mt-1">Location</p>
  </div>
</div>

// Category Card
<div className="bg-white rounded-lg border border-gray-200 p-6 hover:border-primary-600 hover:shadow-md transition-all cursor-pointer">
  {/* Icon and category info */}
</div>
```

### Forms and Inputs

```tsx
// Text Input
<input 
  type="text"
  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
  placeholder="Enter text"
/>

// Textarea
<textarea 
  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
  rows={4}
  placeholder="Enter description"
/>

// Select Dropdown
<select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white">
  <option>Select option</option>
</select>

// Checkbox
<input 
  type="checkbox"
  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
/>

// Radio Button
<input 
  type="radio"
  className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
/>
```

### Navigation

```tsx
// Header
<header className="bg-white border-b border-gray-200 sticky top-0 z-50">
  <div className="max-w-7xl mx-auto px-4 py-3">
    {/* Header content */}
  </div>
</header>

// Navigation Links
<a className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
  Link
</a>

// Active Navigation Link
<a className="text-primary-600 font-semibold border-b-2 border-primary-600">
  Active Link
</a>
```

### Modals

```tsx
// Modal Overlay
<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
  {/* Modal Content */}
  <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
    <div className="p-6">
      {/* Modal body */}
    </div>
  </div>
</div>
```

## Layout Guidelines

### Container Widths

```tsx
// Full width container
<div className="w-full">

// Centered container with max width
<div className="max-w-7xl mx-auto px-4">

// Content sections
<div className="max-w-4xl mx-auto">
```

### Spacing System

Use Tailwind's spacing scale consistently:
- `p-2` (8px), `p-4` (16px), `p-6` (24px), `p-8` (32px)
- `m-2` (8px), `m-4` (16px), `m-6` (24px), `m-8` (32px)
- `gap-2`, `gap-4`, `gap-6`, `gap-8` for flex/grid gaps

### Grid Layouts

```tsx
// Ad Grid (Responsive)
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  {/* Ad cards */}
</div>

// Category Grid
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {/* Category cards */}
</div>
```

## Responsive Design

### Breakpoints
- `sm`: 640px (Mobile landscape)
- `md`: 768px (Tablet)
- `lg`: 1024px (Desktop)
- `xl`: 1280px (Large desktop)
- `2xl`: 1536px (Extra large)

### Mobile-First Approach

```tsx
// Start with mobile, add larger breakpoints
<div className="text-sm md:text-base lg:text-lg">
<div className="p-4 md:p-6 lg:p-8">
<div className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

### Hide/Show Elements

```tsx
// Hide on mobile, show on desktop
<div className="hidden md:block">

// Show on mobile, hide on desktop
<div className="block md:hidden">
```

## Typography

### Font Sizes

```tsx
// Headings
<h1 className="text-3xl md:text-4xl font-bold text-gray-900">
<h2 className="text-2xl md:text-3xl font-bold text-gray-900">
<h3 className="text-xl md:text-2xl font-semibold text-gray-900">
<h4 className="text-lg font-semibold text-gray-900">

// Body Text
<p className="text-base text-gray-700">
<p className="text-sm text-gray-600">
<p className="text-xs text-gray-500">

// Price Display
<span className="text-2xl font-bold text-primary-600">₹ 25,000</span>
```

### Font Weights
- `font-normal` (400): Regular text
- `font-medium` (500): Slightly emphasized
- `font-semibold` (600): Subheadings
- `font-bold` (700): Headings and prices

## Icons

### Icon Styling

```tsx
// Use icon libraries like Heroicons, Lucide, or React Icons
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

// Icon sizes
<Icon className="w-4 h-4" />  // Small
<Icon className="w-5 h-5" />  // Medium
<Icon className="w-6 h-6" />  // Large
<Icon className="w-8 h-8" />  // Extra large

// Icon colors
<Icon className="text-gray-600" />
<Icon className="text-primary-600" />
<Icon className="text-white" />
```

## Animations and Transitions

### Hover Effects

```tsx
// Scale on hover
className="hover:scale-105 transition-transform"

// Shadow on hover
className="hover:shadow-lg transition-shadow"

// Color change on hover
className="hover:bg-primary-700 transition-colors"

// Combined effects
className="hover:shadow-lg hover:scale-105 transition-all duration-200"
```

### Loading States

```tsx
// Skeleton loader
<div className="animate-pulse bg-gray-200 h-4 rounded"></div>

// Spinner
<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
```

## Accessibility

### Focus States

```tsx
// Always include focus styles
className="focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"

// For buttons
className="focus:outline-none focus:ring-2 focus:ring-primary-500"
```

### Color Contrast

- Ensure text has sufficient contrast against backgrounds
- Primary text on white: Use `text-gray-900` or darker
- Secondary text: Use `text-gray-600` minimum
- Never use light gray text on white backgrounds

## Common Patterns

### Search Bar

```tsx
<div className="relative">
  <input 
    type="text"
    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
    placeholder="Search..."
  />
  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
</div>
```

### Badge/Tag

```tsx
<span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
  Featured
</span>
```

### Divider

```tsx
<hr className="border-gray-200" />
```

### Image Placeholder

```tsx
<div className="bg-gray-200 flex items-center justify-center">
  <ImageIcon className="w-12 h-12 text-gray-400" />
</div>
```

## Performance Optimization

### Image Optimization

```tsx
// Always specify dimensions
<img 
  src={url} 
  alt="Description"
  className="w-full h-48 object-cover"
  loading="lazy"
/>
```

### Avoid Arbitrary Values

```tsx
// Bad
className="w-[347px] h-[234px]"

// Good - use Tailwind's scale
className="w-80 h-56"
```

## Forbidden Practices

### ❌ Never Use:
- Gradient utilities (`bg-gradient-to-*`, `from-*`, `via-*`, `to-*`)
- Inline styles (use Tailwind classes)
- `!important` in custom CSS
- Arbitrary color values like `bg-[#ff0000]` (use theme colors)
- Emojis in UI elements
- Complex animations that affect performance

### ✅ Always Use:
- Tailwind utility classes
- Theme colors from config
- Responsive design patterns
- Semantic HTML elements
- Accessibility attributes
- Consistent spacing scale

## Custom CSS (When Necessary)

If you must write custom CSS:

```css
/* Use @apply with Tailwind utilities */
.custom-button {
  @apply px-6 py-2 bg-primary-600 text-white rounded-md font-medium;
  @apply hover:bg-primary-700 transition-colors;
}

/* Never write arbitrary CSS values */
/* Bad */
.bad-example {
  background: linear-gradient(to right, #ff0000, #00ff00);
}

/* Good */
.good-example {
  @apply bg-primary-600;
}
```

## Component Library Consistency

When creating reusable components, ensure:
1. Consistent padding and margins
2. Consistent border radius (rounded-md, rounded-lg)
3. Consistent shadow depths (shadow-sm, shadow-md, shadow-lg)
4. Consistent transition durations (duration-200, duration-300)
5. Consistent hover states

## Testing Checklist

Before committing styled components:
- [ ] No gradient colors used
- [ ] Colors match Quikr theme (red/orange accents on white)
- [ ] Responsive on all breakpoints
- [ ] Hover states work correctly
- [ ] Focus states are visible
- [ ] Text is readable (good contrast)
- [ ] No inline styles
- [ ] No arbitrary values
- [ ] Consistent with other components
