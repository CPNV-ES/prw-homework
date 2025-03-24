# Homework Management Application

A full-stack application for managing homework assignments, built with modern web technologies. The project consists of a React frontend and a Node.js backend with Prisma ORM.

## 📁 Project Structure

```
.
├── client/           # React frontend application
├── server/           # Node.js backend application
├── package.json      # Root package.json
└── LICENSE          # Project license
```

## 🚀 Features

- Full-stack homework management system
- User authentication and authorization
- Discord integration
- Modern responsive UI
- RESTful API
- Database management with Prisma
- Automated testing

## 🛠️ Tech Stack

### Frontend
- React 19
- Vite
- Bootstrap 5
- React Router DOM
- Axios

### Backend
- Node.js
- Express
- Prisma ORM
- JWT Authentication
- Discord.js
- Node-cron

## 📦 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database
- Discord Bot Token (for Discord integration)

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd prw-homework
```

2. Install dependencies for both client and server:
```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env` in the server directory
   - Fill in the required environment variables

4. Set up the database:
```bash
cd server
npx prisma migrate dev
npx prisma db seed
```

5. Start the development servers:

In one terminal (server):
```bash
cd server
npm run dev
```

In another terminal (client):
```bash
cd client
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## 📝 Available Scripts

### Root Directory
- `npm install` - Install all dependencies

### Client
- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Server
- `npm run dev` - Start development server
- `npm test` - Run tests
- `npx prisma migrate dev` - Run database migrations
- `npx prisma db seed` - Seed the database

## 📚 Documentation

- [Client Documentation](./client/README.md)
- [Server Documentation](./server/README.md)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the terms specified in the [LICENSE](LICENSE) file.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- CPNV - Project requirements and guidance
- All contributors who have helped with the project 