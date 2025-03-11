# PRW Homework Backend

A RESTful API server for managing homework assignments, subjects, and their states. Built with Express.js and Prisma.

## Features

- CRUD operations for homework assignments
- Subject management
- State tracking for assignments
- End-to-end testing with Vitest
- Database management with Prisma ORM

## Prerequisites

- Node.js (v22.11.0)
- npm (v11.1.0)

## Installation

1. Clone the repository

```bash
git clone <repository-url>
cd prw-homework/server
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

```bash
cp .env.example .env
```

Edit `.env` and configure your database connection string and other settings:

```
DATABASE_URL="file:./dev.db"
PORT=3000
```

4. Set up the database

```bash
npx prisma migrate dev
```

## Running the Application

Run the server:

```bash
npm start
```

## Testing

Run tests in watch mode:

```bash
npm test
```

## API Endpoints

### Homeworks

- `GET /homeworks` - Get all homeworks
- `GET /homeworks/:id` - Get a specific homework
- `POST /homeworks` - Create a new homework
- `PUT /homeworks/:id` - Update a homework
- `DELETE /homeworks/:id` - Delete a homework

### Subjects

- `GET /subjects` - Get all subjects
- `GET /subjects/:id` - Get a specific subject
- `POST /subjects` - Create a new subject
- `PUT /subjects/:id` - Update a subject
- `DELETE /subjects/:id` - Delete a subject

### States

- `GET /states` - Get all states
- `GET /states/:id` - Get a specific state
- `POST /states` - Create a new state
- `PUT /states/:id` - Update a state
- `DELETE /states/:id` - Delete a state

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
