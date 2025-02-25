# TypeScript API Server

This project is a simple CRUD API server for managing tasks, built with TypeScript and Express.

## Features
- Create, Read, Update, and Delete tasks
- Uses Express for handling HTTP requests
- TypeScript for type safety and modern JavaScript features

## Endpoints
- **Create a Task**: `POST /tasks` with JSON body `{ "name": "Task Name", "completed": false }`
- **Read All Tasks**: `GET /tasks`
- **Update a Task**: `PUT /tasks/:id` with JSON body `{ "completed": true }`
- **Delete a Task**: `DELETE /tasks/:id`

## Getting Started

### Prerequisites
- Node.js and npm installed

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/harukitosa/typescript_api_server.git
   cd typescript_api_server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Server
To start the server, run:
```bash
npx ts-node src/index.ts
```
The server will be running at `http://localhost:54902`.

### Configuration
- The server is configured to allow CORS requests and can be accessed from any host.

## License
This project is licensed under the MIT License.