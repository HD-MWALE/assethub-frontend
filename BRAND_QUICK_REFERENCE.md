# AssetHub Brand Quick Reference

## Brand Basics

| Element | Value |
|---------|-------|
| Brand Name | AssetHub |
| Tagline | Asset Management Made Simple |
| Hex Primary Color | #001F3F (Navy Blue) |
| Hex Accent Color | #00BCD4 (Cyan) |
| Logo URL | https://hebbkx1anhila5yf.public.blob.vercel-storage.com/assethub_logo-X0SJoiHPakDl3iLyeOgCRvqwkqkXgF.png |
| Favicon URL | https://hebbkx1anhila5yf.public.blob.vercel-storage.com/assethub_logo_favicon-V2bsr8fj1i482xcDX5DcDu4v8a2Xr8.png |

## Key Phrases
- "Track Your Assets"
- "Asset Management Made Simple"
- "Real-time Asset Visibility"
- "Manage Your Business"
- "Start Tracking Today"

## Color Quick Reference

### Primary Color - Navy Blue
```
Hex:   #001F3F
RGB:   0, 31, 63
OKLCH: oklch(0.294 0.192 245.161)
```
**Use for**: Main text, primary buttons, brand elements

### Accent Color - Cyan
```
Hex:   #00BCD4
RGB:   0, 188, 212
OKLCH: oklch(0.573 0.172 191.334)
```
**Use for**: Interactive elements, highlights, focus states

## Tailwind Utilities

```tailwind
/* Primary Color */
bg-primary              /* Navy Blue background */
text-primary            /* Navy Blue text */
border-primary          /* Navy Blue border */

/* Accent Color */
bg-accent               /* Cyan background */
text-accent             /* Cyan text */
border-accent           /* Cyan border */

/* Foreground Colors */
text-primary-foreground /* White text on navy */
text-accent-foreground  /* Navy text on cyan */
```

## Logo Usage

### Where to Use
- Sidebar header
- Auth page hero
- Favicon in browser
- Email templates
- Documentation headers
- Social media profiles

### Size Guidelines
- Desktop: 28-48px
- Tablet: 24-40px
- Mobile: 20-28px
- Icons/Favicons: 16-32px

## Feature Keywords

Use these terms in UI copy:
- Asset Management
- Track Assets
- Maintenance Schedule
- Asset Assignment
- Location Management
- Audit Logs
- Real-time Insights
- Compliance Tracking

## Page Headings

| Page | Heading | Subheading |
|------|---------|-----------|
| Login | Sign In | Access your asset management dashboard to track and manage all your company assets |
| Register | Get Started | Create your AssetHub account to start managing your company assets effectively |
| Dashboard | AssetHub | Track Your Assets Dashboard |

## Button Labels

| Action | Label |
|--------|-------|
| Login | Sign In |
| Register | Create Account |
| Create Asset | New Asset |
| Edit | Edit Asset |
| Delete | Remove |
| Save | Save Changes |
| Cancel | Cancel |
| Settings | Settings |

## Links & Navigation

### Main Sections
1. Overview
2. Assets
3. Users
4. Locations
5. Categories
6. Assignments
7. Maintenance
8. Audit Logs
9. Reports
10. Notifications

## Color Palette Summary

```
Navy Blue:      #001F3F  (Primary brand color)
Cyan:           #00BCD4  (Accent color)
White:          #FFFFFF  (Background)
Light Gray:     #F5F5F5  (Secondary background)
Dark Gray:      #333333  (Text)
Success Green:  #10B981  (Status indicator)
Warning Amber:  #F59E0B  (Status indicator)
Error Red:      #EF4444  (Status indicator)
```

## Accessibility Notes

- Navy on White contrast ratio: 11.4:1 (AAA)
- Cyan on Navy contrast ratio: 7.2:1 (AAA)
- All colors meet WCAG AA minimum standards
- Dark mode automatically adjusts colors

## Documentation References

- Full branding guide: See `BRANDING.md`
- Color specifications: See `COLOR_PALETTE.md`
- Complete transformation: See `BRAND_TRANSFORMATION.md`
- Change details: See `REBRANDING_SUMMARY.md`

## Quick Styling Examples

### CSS Variables
```css
color: var(--primary);           /* Navy Blue */
background: var(--accent);       /* Cyan */
border-color: var(--border);     /* Gray */
```

### Tailwind Classes
```tailwind
className="bg-primary text-primary-foreground hover:bg-primary/80"
className="border border-primary rounded-md"
className="text-accent font-semibold"
```

## Common Components

| Component | Primary Color | Accent Color |
|-----------|---------------|--------------|
| Button | Navy bg | - |
| Link | Navy text | Cyan hover |
| Input | Border navy | Focus cyan |
| Card | White bg | Navy text |
| Badge | Cyan bg | Navy text |
| Alert | Cyan border | Cyan text |

## Mobile Considerations

- Logo displays in sidebar (responsive)
- Colors adapt to dark mode automatically
- Touch targets maintain brand colors
- Typography remains readable
- Focus states clearly visible (cyan)

## Dark Mode

The application automatically switches colors for dark mode:
- Primary interactive color: Cyan
- Background: Dark Navy
- Text: White
- All contrast ratios maintained

## Development Tips

1. Always use CSS variables for colors (not hex codes)
2. Use Tailwind utilities for consistency
3. Test colors in both light and dark modes
4. Check contrast ratios for accessibility
5. Use responsive image for logo
6. Maintain brand terminology throughout
