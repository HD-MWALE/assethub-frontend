# AssetHub Branding Guidelines

## Brand Identity

AssetHub is a comprehensive asset management platform designed to help organizations track, organize, and maintain their company assets efficiently.

### Logo

- **Primary Logo**: Full horizontal logo with the hexagonal badge and "AssetHub" text
- **Favicon**: Hexagonal badge icon (32x32px)
- **Logo URL**: https://hebbkx1anhila5yf.public.blob.vercel-storage.com/assethub_logo-X0SJoiHPakDl3iLyeOgCRvqwkqkXgF.png
- **Favicon URL**: https://hebbkx1anhila5yf.public.blob.vercel-storage.com/assethub_logo_favicon-V2bsr8fj1i482xcDX5DcDu4v8a2Xr8.png

### Color Palette

The brand uses a professional navy and cyan color scheme that represents connectivity, technology, and asset management.

#### Primary Colors
- **Navy Blue (Primary)**: `#001F3F` - Used for main brand elements, text, and primary actions
  - OKLCH: `oklch(0.294 0.192 245.161)`
- **Cyan (Accent)**: `#00BCD4` - Used for highlights, secondary actions, and interactive elements
  - OKLCH: `oklch(0.573 0.172 191.334)`

#### Neutral Colors
- **White**: `#FFFFFF` - Used for backgrounds and contrast
- **Light Gray**: `#F5F5F5` - Used for secondary backgrounds
- **Dark Gray**: `#333333` - Used for subtle text
- **Border**: `#E0E0E0` - Used for dividers and borders

### Typography

- **Font Family**: Inter (default), with fallback to system fonts
- **Headings**: Bold weight (600-700) for brand presence
- **Body**: Regular weight (400) for readability
- **Monospace**: Geist Mono for code and technical content

### Usage Guidelines

#### Logo Placement
- Always maintain clear space around the logo (at least 1/4 of the logo width)
- Never distort or rotate the logo
- Use the full logo when space permits; use the favicon for icons

#### Color Application
- Use Navy Blue for primary text and main interactive elements
- Use Cyan for hover states, focus states, and call-to-action buttons
- Maintain sufficient contrast for accessibility (WCAG AA minimum)
- In dark mode, use Cyan as the primary interactive color

#### Tone of Voice
- Professional yet approachable
- Clear and concise
- Focused on value and efficiency
- Asset-management focused language

### Brand Taglines

- "Asset Management Made Simple"
- "Track Your Assets, Manage Your Business"
- "Real-time Asset Visibility and Control"

### Color Usage in Interface

#### Light Mode
- Background: White
- Foreground: Navy Blue (#001F3F)
- Primary Actions: Navy Blue with white text
- Secondary Actions: Cyan with navy text
- Borders/Dividers: Light gray
- Status Indicators: Green (success), Red (error), Yellow (warning), Cyan (info)

#### Dark Mode
- Background: Dark Navy (#084F38)
- Foreground: White
- Primary Actions: Cyan with navy text
- Secondary Actions: Navy with cyan text
- Borders/Dividers: Dark gray with opacity
- Status Indicators: Green (success), Red (error), Yellow (warning), Cyan (info)

### Asset-Specific Brand Elements

#### Dashboard Branding
- Dashboard title: "AssetHub"
- Sidebar logo: Hexagonal badge with "AssetHub" text
- Favicon: Hexagonal badge

#### Authentication Pages
- Login heading: "AssetHub"
- Register heading: "AssetHub"
- Hero text: "Asset Management Made Simple"
- Tagline: "Start tracking today"

#### Feature Language
All features are framed around asset management:
- "Track Your Assets" instead of generic dashboard terminology
- "Maintenance Schedule" instead of generic calendar
- "Asset Assignments" instead of generic task management
- "Audit Logs" for compliance and tracking

### Implementation

All colors are defined as CSS variables in `globals.css` using OKLCH color space:
- `--primary`: Navy Blue
- `--secondary`: Cyan
- `--accent`: Cyan
- `--foreground`: Navy Blue text
- `--background`: White backgrounds

This ensures consistent branding across light and dark modes while maintaining accessibility standards.
