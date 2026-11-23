# PolicyDesk — Insurance Management System

## Project Overview

PolicyDesk is a frontend insurance management application developed using Angular. It demonstrates authentication, role-based access control, protected routes, lazy loading, and navigation guards.

The application uses demo accounts to demonstrate different access permissions for Employees, Managers, and Administrators.

## Features

- Demo login for Employee, Manager, and Admin.
- Authentication and logout functionality.
- Protected Dashboard and Profile routes.
- Role-based access control.
- Admin-only routes.
- Lazy loading of the Admin module.
- Profile editing with unsaved-changes confirmation.
- Return URL navigation after login.
- Forbidden (403) page.
- Not Found (404) page.
- Admin Users and Settings pages.
- Add User functionality.

## Technologies Used

- Angular
- TypeScript
- HTML
- SCSS
- Angular Router
- Angular Signals
- Functional Route Guards

## Demo Accounts

| Role | Name | Email |
|---|---|---|
| Employee | Asha Pasha | asha@policydesk.com |
| Manager | Rahul M | rahul@policydesk.com |
| Admin | Meera J | meera@policydesk.com |

## Route Structure

| Route | Description | Access |
|---|---|---|
| `/` | Redirects to Dashboard | All |
| `/login` | Login page | Guests |
| `/dashboard` | Dashboard | Authenticated users |
| `/profile/edit` | Edit profile | Authenticated users |
| `/admin` | Admin section | Admin only |
| `/admin/users` | User management | Admin only |
| `/admin/settings` | Admin settings | Admin only |
| `/forbidden` | Access denied page | All |
| `**` | Not Found page | All |

## Route Guards

The application implements four functional route guards:

1. **authGuard** – Prevents unauthenticated users from accessing protected pages and preserves the requested URL.
2. **guestGuard** – Redirects authenticated users away from the Login page.
3. **roleGuard** – Restricts Admin routes to users with the Admin role.
4. **unsavedChangesGuard** – Warns users before leaving the Profile Edit page with unsaved changes.

The Admin section uses lazy loading with `CanMatch` protection to prevent unauthorized users from loading the Admin routes.

## Installation and Setup

### Prerequisites

- Node.js
- npm
- Angular CLI

### Steps

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Navigate to the project directory:

```bash
cd policydesk
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
ng serve
```

Open the application:

```text
http://localhost:4200
```

## Build

To generate the production build:

```bash
ng build
```

The build output is generated inside the `dist/policydesk` directory.

## Screenshots

Application screenshots are available in the `screenshots/` folder.

They demonstrate the Login, Dashboard, Profile Edit, Unsaved Changes dialog, Admin Users, Admin Settings, Forbidden (403), and Not Found (404) pages.

## Testing

The application was manually tested for:

- Login and logout.
- Return URL navigation.
- Guest route protection.
- Employee and Manager access restrictions.
- Admin route access.
- Admin lazy loading.
- Unsaved changes confirmation.
- Profile save functionality.
- Forbidden and Not Found routes.

## Author

Parvathy R Prasad


