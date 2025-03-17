# Homework Manager API

A modern REST API for managing homework assignments, built with Express and Prisma.

## Getting Started

### Prerequisites

- Node.js (v22.11.0)
- npm (v11.1.0)

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/homework-manager.git
cd homework-manager/server
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the server directory:

```bash
cp .env.example .env
```

Edit the `.env` file with your database connection string:

```
DATABASE_URL="file:./dev.db"
```

4. **Set up the database**

```bash
npx prisma migrate dev
```

## Authentication Setup

The application uses Discord OAuth2 for authentication. Follow these steps to set it up:

1. **Create a Discord application**

   - Go to [Discord Developer Portal](https://discord.com/developers/applications)
   - Create a new application
   - Navigate to OAuth2 settings
   - Add redirect URL: `http://localhost:5173/auth/discord/callback`

2. **Configure authentication environment variables**

Add the following to your `.env` file:

```
# Discord OAuth2 credentials
DISCORD_CLIENT_ID="your_discord_client_id"
DISCORD_CLIENT_SECRET="your_discord_client_secret"
DISCORD_REDIRECT_URI="http://localhost:5173/auth/discord/callback"

# Frontend URL
FRONTEND_URL="http://localhost:5173"

# JWT configuration
JWT_SECRET="generate_a_strong_random_secret_here"
```

> **Security Tip**: For production, generate a strong random JWT secret using a tool like:
>
> ```bash
> node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
> ```

## Running the Server

Start the development server:

```bash
npm run dev
```

The API will be available at `http://localhost:3000`.

## API Documentation

| Endpoint                 | Method | Description                     |
| ------------------------ | ------ | ------------------------------- |
| `/auth/discord`          | GET    | Initiates Discord OAuth2 flow   |
| `/auth/discord/callback` | GET    | Handles Discord OAuth2 callback |
| `/auth/verify`           | GET    | Verifies authentication token   |
| `/auth/logout`           | GET    | Logs out the current user       |
| `/homeworks`             | GET    | Lists all homeworks             |
| `/homeworks/:id`         | GET    | Gets a specific homework        |
| `/subjects`              | GET    | Lists all subjects              |
| `/states`                | GET    | Lists all states                |

## Testing

Run tests with:

```bash
npm test
```

## Features

- CRUD operations for homework assignments
- Subject management
- State tracking for assignments
- End-to-end testing with Vitest
- Database management with Prisma ORM

## Project Structure

```
server/
├── src/
│   ├── routes/        # Route definitions
│   ├── services/      # Business logic
│   ├── app.js         # Express app setup
├── tests/
│   ├── setup.js       # Test configuration
│   └── *.test.js      # Test files
├── prisma/
│   └── schema.prisma  # Database schema
└── main.js            # Application entry point
```

## Technologies

- [Express.js](https://expressjs.com/) - Web framework
- [Prisma](https://www.prisma.io/) - ORM
- [Vitest](https://vitest.dev/) - Testing framework
- [Supertest](https://github.com/visionmedia/supertest) - HTTP testing

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.
