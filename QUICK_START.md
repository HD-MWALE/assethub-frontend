# AssetHub Frontend - Quick Start Guide

Get up and running with the AssetHub frontend in minutes.

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend running on `http://localhost:3001`

## Installation

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Start development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

## First Steps

### 1. Register a New Account
- Go to `/auth/v1/register`
- Fill in: Email, Password, First Name, Last Name, Company Name, Company Slug
- Submit to create account and tenant

### 2. Verify Email (Optional)
- Check email for verification link
- Click to verify account (if email backend is enabled)

### 3. Login
- Go to `/auth/v1/login`
- Enter your email and password
- Click "Login"

### 4. Access Dashboard
- View overview at `/dashboard/overview`
- See statistics and recent items
- Navigate to any module from the sidebar

## Module Navigation

### Main Modules

**Assets** - `/dashboard/assets`
- View all assets
- Create new asset
- Edit/delete existing assets
- View asset details and history

**Users** - `/dashboard/users`
- Manage team members
- Create new users
- Activate/deactivate users
- View user profiles

**Locations** - `/dashboard/locations`
- Manage facilities/offices
- Create locations with addresses
- Organize hierarchical locations

**Maintenance** - `/dashboard/maintenance`
- Track maintenance activities
- Create maintenance records
- Track maintenance costs
- View status (scheduled, in-progress, completed)

**Asset Categories** - `/dashboard/asset-categories`
- Organize assets into categories
- Create hierarchical categories
- View category statistics

**Asset Assignments** - `/dashboard/asset-assignments`
- Assign assets to users
- Track assignment history
- Manage return dates

**Audit Logs** - `/dashboard/audit-logs`
- View system activity
- Filter by action and resource type
- Track user activities

**Reports** - `/dashboard/reports`
- Generate Asset Register report
- Generate Maintenance History report
- Generate Depreciation Analysis
- Download as PDF

**Notification Rules** - `/dashboard/notification-rules`
- Create notification rules
- Configure alert triggers
- Set notification channels (email, SMS, in-app, webhook)
- Manage recipients

## Common Tasks

### Create a New Asset
1. Go to `/dashboard/assets`
2. Click "New Asset"
3. Fill in:
   - Asset Code
   - Name
   - Description
   - Category
   - Location
   - Serial Number
   - Purchase Date
   - Purchase Price
   - Warranty Expiry Date
4. Click "Save Asset"

### Assign Asset to User
1. Go to `/dashboard/asset-assignments`
2. Click "New Assignment"
3. Select Asset
4. Select User
5. Set Assignment Date
6. Click "Save Assignment"

### Create Maintenance Record
1. Go to `/dashboard/maintenance`
2. Click "New Maintenance Record"
3. Select Asset
4. Choose Maintenance Type
5. Add Description
6. Set Dates and Cost
7. Click "Save Maintenance Record"

### Generate Report
1. Go to `/dashboard/reports`
2. Select Report Type
3. Set optional date range
4. Click "Generate & Download Report"
5. PDF will download automatically

## API Endpoints

### Authentication
```
POST   /auth/register          - Register new user
POST   /auth/login             - User login
POST   /auth/forgot-password   - Request password reset
POST   /auth/reset-password    - Reset password
POST   /auth/logout            - Logout user
```

### Assets
```
GET    /assets                 - List all assets
POST   /assets                 - Create asset
GET    /assets/:id             - Get asset details
PUT    /assets/:id             - Update asset
DELETE /assets/:id             - Delete asset
GET    /assets/stats           - Asset statistics
```

### Users
```
GET    /users                  - List all users
POST   /users                  - Create user
GET    /users/:id              - Get user details
PUT    /users/:id              - Update user
PUT    /users/:id/activate     - Activate user
PUT    /users/:id/deactivate   - Deactivate user
```

### Locations
```
GET    /locations              - List all locations
POST   /locations              - Create location
GET    /locations/:id          - Get location details
PUT    /locations/:id          - Update location
PUT    /locations/:id/activate - Activate location
```

### Maintenance
```
GET    /maintenance            - List maintenance records
POST   /maintenance            - Create maintenance record
GET    /maintenance/:id        - Get maintenance details
PUT    /maintenance/:id        - Update maintenance
DELETE /maintenance/:id        - Delete maintenance
```

### Asset Categories
```
GET    /asset-categories       - List all categories
POST   /asset-categories       - Create category
GET    /asset-categories/:id   - Get category details
PUT    /asset-categories/:id   - Update category
DELETE /asset-categories/:id   - Delete category
```

### Asset Assignments
```
GET    /asset-assignments      - List assignments
POST   /asset-assignments      - Create assignment
GET    /asset-assignments/:id  - Get assignment details
PUT    /asset-assignments/:id  - Update assignment
```

### Reports
```
GET    /reports/types          - Get available report types
POST   /reports/asset-register - Generate asset register
POST   /reports/maintenance-history - Generate maintenance report
POST   /reports/depreciation   - Generate depreciation report
```

## File Structure

```
src/
├── app/
│   ├── (main)/
│   │   ├── auth/              # Authentication pages
│   │   │   ├── v1/login
│   │   │   ├── v1/register
│   │   │   ├── forgot-password
│   │   │   └── reset-password
│   │   └── dashboard/
│   │       ├── overview/      # Dashboard overview
│   │       ├── assets/        # Asset module
│   │       ├── users/         # User module
│   │       ├── locations/     # Location module
│   │       ├── maintenance/   # Maintenance module
│   │       ├── asset-categories/
│   │       ├── asset-assignments/
│   │       ├── audit-logs/
│   │       ├── reports/
│   │       └── notification-rules/
│   └── layout.tsx
├── lib/
│   ├── api-client.ts          # API client
│   ├── auth-context.tsx       # Authentication context
│   └── utils.ts               # Utilities
└── navigation/
    └── sidebar/
        └── sidebar-items.ts   # Sidebar navigation
```

## Configuration

### Environment Variables
Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

## Common Commands

```bash
# Development
npm run dev              # Start development server

# Building
npm run build           # Build for production
npm start              # Start production server

# Code Quality
npm run lint           # Run ESLint
npm run type-check     # Check TypeScript types
```

## Troubleshooting

### Login Issues
- Check email/password are correct
- Ensure backend is running
- Clear localStorage and try again

### API Errors
- Check backend is running on port 3001
- Verify NEXT_PUBLIC_API_URL is correct
- Check browser console for error details

### Token Expired
- Automatically refreshed - just reload page
- If persists, logout and login again

### 404 Errors
- Check backend API endpoints are correct
- Verify tenantId in request if needed
- Check request parameters

## Key Features

✅ Complete Authentication Flow
✅ Asset Management (CRUD)
✅ User Management
✅ Location Management
✅ Maintenance Tracking
✅ Asset Categories
✅ Asset Assignments
✅ Audit Logging
✅ Report Generation
✅ Notification Rules
✅ JWT Token Management
✅ Form Validation
✅ Error Handling
✅ Loading States
✅ Toast Notifications

## Support

For issues or questions:
1. Check the IMPLEMENTATION_SUMMARY.md for detailed docs
2. Review API_ENDPOINTS_COVERAGE.md for endpoint info
3. Check ASSETHUB_SETUP.md for setup details
4. Review backend documentation

## Next Steps

1. Customize styling in `/src/app/globals.css`
2. Add more modules following existing patterns
3. Connect to production backend
4. Deploy to Vercel

---

**Ready to develop? Let's go!** 🚀
