# AssetHub Frontend Setup Guide

Welcome to the AssetHub Frontend! This guide will help you set up and configure the application to connect with your AssetHub backend.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- AssetHub backend running (default: `http://localhost:3001`)

## Quick Start

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` and set your backend API URL:

```env
# For local development (backend on port 3001)
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1

# For production
# NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api/v1
```

### 3. Start the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features Implemented

### ✅ Authentication
- User Registration with company setup
- Email verification flow
- Secure login/logout
- Token-based authentication
- Auth context for global state management

### ✅ Asset Management
- Create, read, update, delete assets
- Asset status tracking (Active, Inactive, Maintenance, Retired)
- Asset categorization
- Location assignment
- Purchase tracking
- Asset detail views

### ✅ User Management
- Team member management
- Role-based access (Admin, Manager, User)
- User activation/deactivation
- Email verification tracking
- User detail views

### ✅ Location Management
- Facility/office location management
- Address tracking
- Location descriptions
- Asset-location associations

### ✅ Dashboard
- Overview page with key statistics
- Asset inventory summary
- Team member overview
- Quick action buttons
- Real-time data loading

### ✅ UI/UX
- Toast notifications for user feedback
- Loading states
- Error handling
- Responsive design with Tailwind CSS
- Shadcn/ui components
- Dark mode support

## API Integration

The frontend automatically connects to your backend using the `NEXT_PUBLIC_API_URL` environment variable.

### Supported Endpoints

- **Authentication**: Register, Login, Forgot Password, Reset Password, Email Verification
- **Assets**: List, Create, Read, Update, Delete, Search
- **Asset Categories**: List, Create
- **Users**: List, Create, Read, Update, Delete, Search
- **Locations**: List, Create, Read, Update, Delete, Search
- **Dashboard**: Statistics and analytics

## Project Structure

```
src/
├── app/                          # Next.js app directory
│   ├── (main)/
│   │   ├── auth/                # Authentication pages
│   │   └── dashboard/            # Dashboard and management pages
│   │       ├── assets/          # Asset management
│   │       ├── users/           # User management
│   │       ├── locations/       # Location management
│   │       └── overview/        # Dashboard overview
├── components/
│   ├── ui/                      # Shadcn/ui components
│   └── data-table/              # Data table components
├── lib/
│   ├── api-client.ts            # API client implementation
│   ├── auth-context.tsx         # Authentication context
│   └── utils.ts                 # Utility functions
├── navigation/
│   └── sidebar/                 # Sidebar navigation config
└── stores/                      # State management

```

## Authentication Flow

1. **Register**: New users register with email, password, name, and company details
2. **Email Verification**: An email is sent with a verification link
3. **Login**: After email verification, users can log in with credentials
4. **Token Storage**: JWT tokens are stored in localStorage
5. **Auto-logout**: Session expires based on token expiration

## Error Handling

The application includes comprehensive error handling:

- **Network Errors**: Displayed as toast notifications
- **API Errors**: Backend error messages are shown to users
- **Form Validation**: Zod schema validation with helpful messages
- **Loading States**: Visual feedback during async operations
- **Fallback UI**: Graceful fallbacks when data fails to load

## Development Tips

### Adding a New Page

1. Create a new folder under `src/app/(main)/dashboard/`
2. Create `page.tsx` with your component
3. Update `src/navigation/sidebar/sidebar-items.ts` to add the navigation link
4. Use the API client for data fetching:

```tsx
const { data, error } = await apiClient.getAssets();
```

### Using the API Client

```typescript
import { apiClient } from "@/lib/api-client";

// Get list of assets
const result = await apiClient.getAssets();

// Create new asset
const result = await apiClient.createAsset({
  name: "Asset Name",
  assetCode: "ASSET-001",
  categoryId: "category-id",
  status: "ACTIVE"
});

// Update asset
const result = await apiClient.updateAsset(id, {
  name: "Updated Name"
});

// Delete asset
const result = await apiClient.deleteAsset(id);
```

### Using Authentication

```typescript
import { useAuth } from "@/lib/auth-context";

export function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();

  // user: Current logged-in user or null
  // isAuthenticated: Boolean indicating auth state
  // login: Function to log in
  // logout: Function to log out
}
```

## Troubleshooting

### API Connection Issues

1. Verify backend is running on the correct port
2. Check `NEXT_PUBLIC_API_URL` in `.env.local`
3. Ensure CORS is properly configured on the backend
4. Check browser console for detailed error messages

### Authentication Issues

1. Clear browser cookies and localStorage
2. Verify token is being stored correctly
3. Check backend token validation logic
4. Ensure email verification is enabled on backend

### Build Issues

1. Clear `.next` folder: `rm -rf .next`
2. Reinstall dependencies: `rm -rf node_modules && npm install`
3. Check Node.js version: `node --version`

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_API_URL`: Your production backend URL
4. Deploy

### Deploy to Other Platforms

The application is a Next.js 16 app and can be deployed to:
- Docker containers
- Traditional Node.js servers
- Netlify
- AWS Amplify
- Any platform supporting Next.js

## Support

For issues or questions:
1. Check the error messages and logs
2. Review the API documentation
3. Verify backend is responding correctly
4. Check browser console for client-side errors

## License

This project is part of the AssetHub platform. See LICENSE file for details.
