# AssetHub - Comprehensive Asset Management System

**AssetHub** - A complete asset management platform for tracking, organizing, and maintaining company assets with real-time insights.

![AssetHub Logo](https://hebbkx1anhila5yf.public.blob.vercel-storage.com/assethub_logo-X0SJoiHPakDl3iLyeOgCRvqwkqkXgF.png)

AssetHub is built on modern web technologies to provide a seamless experience for managing assets across your organization. Track assets in real-time, schedule maintenance, manage team assignments, and generate comprehensive reports—all from one intuitive dashboard.

## Features

- **Complete Asset Management** - Track all company assets with detailed information and status  
- **Maintenance Scheduling** - Schedule and monitor maintenance activities  
- **Team Assignments** - Assign assets to team members and track usage  
- **Location Management** - Organize assets across multiple facilities and locations  
- **Audit Logs** - Complete activity tracking for compliance and auditing  
- **Advanced Reports** - Generate PDF reports (Asset Register, Maintenance History, Depreciation)  
- **Notification Rules** - Configure custom alerts and notifications  
- **Built with Modern Stack** - Next.js 16, TypeScript, Tailwind CSS v4, and Shadcn UI  
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile  
- **Dark Mode Support** - Eye-friendly interface with theme customization

> [!NOTE]
> The default dashboard uses the **shadcn neutral** theme.  
> It also includes additional color presets inspired by [Tweakcn](https://tweakcn.com):  
>
> - Tangerine  
> - Neo Brutalism  
> - Soft Pop  
>
> You can create more presets by following the same structure as the existing ones.

> Looking for the **Next.js 15** version?  
> Check out the [`archive/next15`](https://github.com/arhamkhnz/next-shadcn-admin-dashboard/tree/archive/next15) branch.  
> This branch contains the setup prior to upgrading to Next 16 and the React Compiler.

> Looking for the **Next.js 14 + Tailwind CSS v3** version?  
> Check out the [`archive/next14-tailwindv3`](https://github.com/arhamkhnz/next-shadcn-admin-dashboard/tree/archive/next14-tailwindv3) branch.  
> It has a different color theme and is not actively maintained, but I try to keep it updated with major changes.  

## Tech Stack

- **Framework**: Next.js 16 (App Router), TypeScript, Tailwind CSS v4  
- **UI Components**: Shadcn UI  
- **Validation**: Zod  
- **Forms & State Management**: React Hook Form, Zustand  
- **Tables & Data Handling**: TanStack Table  
- **Tooling & DX**: Biome, Husky  

## Screens

### Available
- Default Dashboard  
- CRM Dashboard  
- Finance Dashboard  
- Authentication (4 screens)

### Coming Soon
- Analytics Dashboard  
- eCommerce Dashboard  
- Academy Dashboard  
- Logistics Dashboard  
- Email Page  
- Chat Page  
- Calendar Page  
- Kanban Board  
- Invoice Page  
- Users Management  
- Roles Management  

## Colocation File System Architecture

This project follows a **colocation-based architecture** each feature keeps its own pages, components, and logic inside its route folder.  
Shared UI, hooks, and configuration live at the top level, making the codebase modular, scalable, and easier to maintain as the app grows.

For a full breakdown of the structure with examples, see the [Next Colocation Template](https://github.com/arhamkhnz/next-colocation-template).

## Getting Started

You can run this project locally, or deploy it instantly with Vercel.

### Deploy with Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Farhamkhnz%2Fnext-shadcn-admin-dashboard)

_Deploy your own copy with one click._

### Run locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/arhamkhnz/next-shadcn-admin-dashboard.git
   ```
   
2. **Navigate into the project**
   ```bash
    cd next-shadcn-admin-dashboard
   ```
   
3. **Install dependencies**
   ```bash
    npm install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

Your app will be running at [http://localhost:3000](http://localhost:3000)

### Formatting and Linting

Format, lint, and organize imports
```bash
npx @biomejs/biome check --write
```
> For more information on available rules, fixes, and CLI options, refer to the [Biome documentation](https://biomejs.dev/).

---

> [!IMPORTANT]  
> This project is updated frequently. If you’re working from a fork or an older clone, pull the latest changes before syncing. Some updates may include breaking changes.

---

Contributions are welcome. Feel free to open issues, feature requests, or start a discussion.


**Happy Vibe Coding!**
