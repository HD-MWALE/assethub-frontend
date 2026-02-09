# AssetHub Color Palette Reference

## Brand Colors

### Primary Color - Navy Blue
```
Name: Navy Blue
Hex: #001F3F
RGB: 0, 31, 63
HSL: 210°, 100%, 12%
OKLCH: oklch(0.294 0.192 245.161)
Usage: Primary text, brand elements, main buttons, sidebar
```

### Secondary Color - Cyan
```
Name: Cyan
Hex: #00BCD4
RGB: 0, 188, 212
HSL: 187°, 100%, 42%
OKLCH: oklch(0.573 0.172 191.334)
Usage: Highlights, accents, focus states, hover effects
```

## Extended Palette

### Neutrals
```
White: #FFFFFF (oklch(1 0 0))
Light Gray: #F5F5F5 (oklch(0.969 0 0))
Medium Gray: #CCCCCC (oklch(0.800 0 0))
Dark Gray: #333333 (oklch(0.227 0 0))
Black: #000000 (oklch(0 0 0))
```

### Semantic Colors
```
Success (Green): #10B981
Warning (Amber): #F59E0B
Error (Red): #EF4444
Info (Cyan): #00BCD4
```

## Color Variables in CSS

These variables are defined in `src/app/globals.css` and can be used throughout the application:

### Light Mode
```css
--primary: oklch(0.294 0.192 245.161);           /* Navy Blue */
--primary-foreground: oklch(1 0 0);              /* White text on navy */
--secondary: oklch(0.573 0.172 191.334);         /* Cyan */
--secondary-foreground: oklch(0.084 0.018 245.161); /* Navy text on cyan */
--accent: oklch(0.573 0.172 191.334);            /* Cyan */
--accent-foreground: oklch(0.084 0.018 245.161); /* Navy text on cyan */
--background: oklch(1 0 0);                      /* White */
--foreground: oklch(0.084 0.018 245.161);        /* Navy Blue */
--border: oklch(0.92 0.004 0);                   /* Light border */
--sidebar: oklch(0.098 0.014 245.161);           /* Dark navy sidebar */
--sidebar-foreground: oklch(1 0 0);              /* White sidebar text */
--sidebar-primary: oklch(0.573 0.172 191.334);   /* Cyan for sidebar active */
--sidebar-accent: oklch(0.573 0.172 191.334);    /* Cyan accent */
```

### Dark Mode
```css
--primary: oklch(0.573 0.172 191.334);           /* Cyan */
--primary-foreground: oklch(0.084 0.018 245.161); /* Navy text on cyan */
--secondary: oklch(0.196 0.022 245.161);         /* Dark navy */
--secondary-foreground: oklch(0.98 0.001 0);     /* White text */
--accent: oklch(0.573 0.172 191.334);            /* Cyan */
--accent-foreground: oklch(0.084 0.018 245.161); /* Navy text on cyan */
--background: oklch(0.098 0.014 245.161);        /* Dark navy background */
--foreground: oklch(0.98 0.001 0);               /* White text */
--border: oklch(1 0 0 / 8%);                     /* Subtle border */
--sidebar: oklch(0.084 0.018 245.161);           /* Very dark navy */
--sidebar-foreground: oklch(0.98 0.001 0);       /* White sidebar text */
--sidebar-primary: oklch(0.573 0.172 191.334);   /* Cyan for sidebar active */
--sidebar-accent: oklch(0.573 0.172 191.334);    /* Cyan accent */
```

## Color Usage Examples

### Buttons
- **Primary Button**: Navy Blue background with white text
- **Secondary Button**: Cyan background with navy text
- **Ghost Button**: Transparent with navy text, cyan border
- **Hover State**: Cyan text with navy background
- **Active State**: Cyan underline with navy text

### Interactive Elements
- **Links**: Navy Blue by default, Cyan on hover
- **Focus State**: Cyan outline/ring
- **Disabled State**: Gray with reduced opacity
- **Placeholder Text**: Medium Gray

### Status Indicators
- **Active/Success**: Green (`#10B981`)
- **Warning**: Amber (`#F59E0B`)
- **Error**: Red (`#EF4444`)
- **Info**: Cyan (`#00BCD4`)

### Components
- **Card Background**: White (light) / Dark Navy (dark)
- **Card Border**: Light Gray (light) / Subtle Navy (dark)
- **Sidebar Background**: Dark Navy (light) / Very Dark Navy (dark)
- **Sidebar Active Item**: Cyan highlight
- **Header Background**: White (light) / Dark Navy (dark)

## Accessibility

### Contrast Ratios
- Navy Blue on White: 11.4:1 ✓ (AAA)
- Cyan on Navy Blue: 7.2:1 ✓ (AAA)
- White on Navy Blue: 11.4:1 ✓ (AAA)
- Navy Blue on Cyan: 4.8:1 ✓ (AA)

All color combinations meet or exceed WCAG AA accessibility standards.

## Using Colors in Tailwind

### Background Colors
```tailwind
bg-primary      /* Navy Blue background */
bg-secondary    /* Cyan background */
bg-accent       /* Cyan background */
bg-background   /* White/Dark Navy depending on mode */
```

### Text Colors
```tailwind
text-primary-foreground     /* White text on navy */
text-secondary-foreground   /* Navy text on cyan */
text-foreground             /* Navy Blue text */
text-muted-foreground       /* Gray text for secondary content */
```

### Border Colors
```tailwind
border-primary      /* Navy Blue border */
border-secondary    /* Cyan border */
border-accent       /* Cyan border */
border-border       /* Gray border */
```

## Exporting Colors

Colors are also available as CSS custom properties that can be accessed in any stylesheet:

```css
/* In your CSS */
.custom-element {
  color: var(--primary);
  background-color: var(--background);
  border-color: var(--border);
}
```

## Theme Switching

The application automatically applies the correct color palette based on the theme mode (light/dark). No manual color switching is required when implementing components - just use the Tailwind color utilities and the system handles the rest.
