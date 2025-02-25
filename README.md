# TypeScript API Server

A simple CRUD API server for tasks using TypeScript and Express.

## Features
- CRUD operations for tasks
- Express for HTTP requests
- TypeScript for type safety

## Endpoints
- **Create**: `POST /tasks` with `{ "name": "Task Name", "completed": false }`
- **Read**: `GET /tasks`
- **Update**: `PUT /tasks/:id` with `{ "completed": true }`
- **Delete**: `DELETE /tasks/:id`

## Setup
1. **Install Node.js and npm**
2. **Clone and Install**:
   ```bash
   git clone https://github.com/harukitosa/typescript_api_server.git
   cd typescript_api_server
   npm install
   ```
3. **Run Server**:
   ```bash
   npx ts-node src/index.ts
   ```
   Access at `http://localhost:54902`.

## License
MIT License.
