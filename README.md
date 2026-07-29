
## Getting Started

Follow these steps to run Smart Database Explorer locally:

1. **Install dependencies for frontend:**
   ```bash
   cd frontend
   npm install
   npm start
   ```

2. **Install dependencies for backend:**
   ```bash
   cd server
   npm install
   cp .env.example .env
   npm run dev
   ```

3. **Access the application:**
   - Frontend: http://localhost:3002
   - Backend API: http://localhost:5000

That's it! You're ready to explore databases with ease!

## About

Smart Database Explorer is a web-based application for exploring, managing, and optimizing MongoDB databases. It offers a user-friendly interface for a wide range of MongoDB operations, from basic querying to advanced performance optimization.

**Note:** The backend uses in-memory storage by default. To connect a real MongoDB database, set the `MONGO_URI` environment variable in the server's `.env` file:
```bash
MONGO_URI=mongodb://localhost:27017/smart-database-explorer
```

## Key Features

- Multi-instance MongoDB connections
- Database and collection browsing
- Query execution and management
- Performance analysis
- AI-assisted query generation and optimization
- Index management interface
- Schema browsing for collections and queries
- Favorite query management
- JSON export of query results
- Query log analysis
- OpenAI integration for advanced features
- AI-powered index suggestions with one-click creation
- In-database query profiling and enhancement

## Project Architecture

The project consists of two main components:

1. **Frontend**: React-based web application
2. **Backend**: Node.js + Express API
