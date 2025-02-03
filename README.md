# Notes Backend API

A backend API service for managing notes, built with Express.js, TypeScript, and PostgreSQL using Drizzle ORM.

## Prerequisites

- Node.js (Latest LTS version recommended)
- PNPM package manager
- PostgreSQL database

## Installation

1. Clone the repository
2. Install dependencies:
```bash
pnpm install
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=           # Port number for the server
DATABASE_URL=   # PostgreSQL connection URL for main database
TEST_DB_URL=    # PostgreSQL connection URL for test database
NODE_ENV=       # Environment (development/production/test)
```

## Available Scripts

- `pnpm start`: Start the production server
- `pnpm dev`: Start development server with hot reload
- `pnpm build`: Build the TypeScript project
- `pnpm test`: Run tests
- `pnpm test:watch`: Run tests in watch mode
- `pnpm test:coverage`: Run tests with coverage report
- `pnpm lint`: Run ESLint
- `pnpm db:generate`: Generate database migrations
- `pnpm db:migrate`: Run database migrations

## Database Setup

Before running the application, you need to create two PostgreSQL databases locally:

1. Development database:
```bash
createdb notes_dev    # or your preferred development database name
```

2. Test database:
```bash
createdb notes_test   # or your preferred test database name
```

Make sure to update your `.env` file with the correct database URLs:
```env
DATABASE_URL=postgresql://localhost:5432/notes_dev    # Update with your development database name
TEST_DB_URL=postgresql://localhost:5432/notes_test    # Update with your test database name
```

## Database Management

This project uses Drizzle ORM for database operations and migrations. Make sure to:

1. Set up your PostgreSQL database
2. Configure the database connection in your `.env` file
3. Run migrations before starting the application

## Project Structure

```
src/
├── features/        # Feature modules (notes, etc.)
├── shared/         # Shared utilities and configurations
└── index.ts        # Application entry point
```

## Testing

The project includes a comprehensive test suite using Vitest. Tests can be run using the test scripts mentioned above.

## Development

1. Set up your environment variables
2. Create and set up your databases:
   - Create development database (if not already done):
   ```bash
   createdb notes_dev
   ```
   - Verify your database connection in `.env` file
   - Run migrations to create the required tables:
   ```bash
   pnpm db:migrate
   ```
3. Start the development server:
```bash
pnpm dev
```

> **Important**: Always ensure your development database exists and migrations are up to date before starting the backend locally. If you make any changes to the database schema, run `pnpm db:generate` and then `pnpm db:migrate` again to apply the changes.

## License

ISC
