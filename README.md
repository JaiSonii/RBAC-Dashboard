# RBAC Dashboard

A Role-Based Access Control (RBAC) dashboard built with Next.js, Redux, and shadcn/ui components. This application provides a comprehensive interface for managing users, roles, and permissions in an organization.

## Features

- **User Management:**
  - View and manage users in a responsive table layout
  - Add new users with name, email, and role
  - Edit existing user details
  - Toggle user status (Active/Inactive)
  - Delete users
  - Search functionality
  - Sorting capabilities

- **Role Management:**
  - Create and manage roles
  - Assign permissions to roles
  - Edit role permissions dynamically
  - Delete roles

- **Permission Management:**
  - View and manage permissions
  - Add new permissions with descriptions
  - Edit existing permissions
  - Delete permissions

- **Theme Toggle:**
  - Switch between light and dark modes

## Tech Stack

- Next.js 14 (App Router)
- Redux Toolkit for state management
- TypeScript for type safety
- shadcn/ui components
- Tailwind CSS for styling

## Getting Started

First, clone the repository:

\`\`\`bash
git clone https://github.com/yourusername/rbac-dashboard.git
cd rbac-dashboard
\`\`\`

Install the dependencies:

\`\`\`bash
npm install
# or
yarn install
# or
pnpm install
\`\`\`

Run the development server:

\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing the Application

### User Management Testing

1. Navigate to the Users tab
2. Try adding a new user:
   - Click "Add User"
   - Fill in the name, email, and select a role
   - Submit the form
3. Test the search functionality:
   - Enter text in the search box
   - Verify that users are filtered correctly
4. Test sorting functionality:
   - Click on column headers to sort
   - Verify that sorting works correctly
5. Test user editing:
   - Click the edit icon for any user
   - Modify their details
   - Save changes
6. Test user deletion:
   - Click the delete icon for a user
   - Verify the user is removed from the list

### Role Management Testing

1. Navigate to the Roles tab
2. Test role creation:
   - Click "Add Role"
   - Enter role name
   - Select permissions
   - Submit the form
3. Test permission toggling:
   - Click checkboxes to toggle permissions for existing roles
   - Verify changes are saved
4. Test role deletion:
   - Delete a role
   - Verify it's removed from the system

### Permission Management Testing

1. Navigate to the Permissions tab
2. Test adding new permissions:
   - Click "Add Permission"
   - Enter name and description
   - Submit the form
3. Test editing permissions:
   - Modify existing permission details
   - Save changes
4. Test permission deletion:
   - Delete a permission
   - Verify it's removed from the list

## Project Structure

\`\`\`
rbac-dashboard/
├── app/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── user-management.tsx
│   ├── role-management.tsx
│   └── permission-management.tsx
├── lib/
│   ├── store.ts
│   ├── hooks.ts
│   ├── api/
│   │   └── mockApi.ts
│   └── features/
│       └── users/
│           └── usersSlice.ts
└── public/
\`\`\`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Redux Toolkit](https://redux-toolkit.js.org/) - state management
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Tailwind CSS](https://tailwindcss.com/) - styling

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

#