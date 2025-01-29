# Guestara

Guestara is a Node.js application for managing categories, sub-categories, and items. It provides RESTful APIs for creating, retrieving, updating, and deleting these entities. The project uses Express.js for the server, Prisma for database interactions, and Swagger for API documentation.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/guestara.git
   cd guestara
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   ```bash
   npx prisma migrate dev --name init
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

The server will start on the port specified in the `.env` file. You can access the API at `http://localhost:<PORT>`.

## API Documentation

Swagger is used for API documentation. Once the server is running, you can access the API documentation at:
```
http://localhost:<PORT>/api-docs
```

## Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```
DATABASE_URL=your_database_url
PORT=your_port_number
```

## Project Structure

```
guestara/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── categoryController.js
│   │   ├── subCategoryController.js
│   │   └── itemsController.js
│   ├── routes/
│   │   ├── categoryRoutes.js
│   │   ├── subCategoryRoutes.js
│   │   └── itemsRoutes.js
│   ├── swagger.js
│   └── server.js
├── prisma/
│   └── schema.prisma
├── .env
├── package.json
└── README.md
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License.
