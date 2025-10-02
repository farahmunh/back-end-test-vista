# Company and Service Managament API (Backend)
This is the backend API for managing **companies** and their **services**. 
It allows you to create, edit, delete companies, add services to companies, and retrieve company and service data.

## Technologies Used
- **Node.js**: JavaScript runtime environment for building the API.
- **TypeScript**: Provides type safety and helps prevent bugs in the backend code.
- **Express.js**: Web framework for building RESTful APIs.
- **Prisma ORM**: Object-relational mapper for interacting with MySQL database.
- **MySQL**: Database for storing company and service information.
- **dotenv**: For managing environment variables, including database connection.
- **cors**: Middleware to enable cross-origin resource sharing.
- **ESLint**: Linting tool to enforce consistent code quality.

## Setup Instructions
1. **Clone the repository:**

   ```bash
   git clone <repo-url>
   cd backend

2. **Install dependencies:**
   
   ```bash
   npm install

3. **Create a `.env` file:**
   
   Copy the `.env.example` file to `.env` and fill in the necessary configuration values (e.g., your database URL):

   ```bash
   cp .env.example .env

5. **Set up the database:**

   ```bash
   npx prisma migrate dev

6. **Start the server:**

   ```bash
   npm run start

7. **The API should now be running on** `http://localhost:3000`**.**

## API Endpoints
Here are the available API endpoints:
- `POST /companies`: **Create** a new company.
- `GET /companies`: **List** all companies and their services.
- `GET /companies/:id`: **Get** a specific company by ID (include services).
- `PUT /companies/:id`: **Edit** an existing company by ID.
- `DELETE /companies/:id`: **Delete** a company by ID.
- `POST /services`: **Create** a new service under a company.
- `GET /services/:id`: **Get** details of a service by ID.
- `PUT /services/:id`: **Edit** an existing service by ID.
- `DELETE /services/:id`: **Delete** a service by ID.

## Prisma Schema
The database schema is defined using Prisma in the `schema.prisma` file. It includes models for both **Company** and **Service**:

   ```prisma
   model Company {
      id                 Int       @id @default(autoincrement())
      name               String
      registrationNumber String
      services           Service[]
   }

   model Service {
     id          Int     @id @default(autoincrement())
     companyId   Int
     company     Company @relation(fields: [companyId], references: [id])
     name        String
     description String?
     price       Float
   }
   ```

## Additional Notes
- Ensure MySQL is running on your machine or configure it in the `.env` file.
- Use **Postman** or **Swagger** for API documentation.
- For detailed error messages and validation, refer to the error handling section in the code.
