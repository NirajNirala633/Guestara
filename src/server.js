import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import { connectDB, closeDB } from './config/db.js';
import categoryRoutes from "./routes/categoryRoutes.js";
import subCategoryRoutes from "./routes/subCategoryRoutes.js";
import itemRoutes from "./routes/itemsRoutes.js";
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerOptions from './swagger.js';

dotenv.config();

const app = express();

// database connection
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello App")
});

// Swagger setup
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Gracefully shutdown the database connection when the server exits
process.on('SIGINT', async () => {
    console.log("Closing database connection...");
    await closeDB();
    process.exit(0);  // Exit the process
});

app.use("/category", categoryRoutes);
app.use("/sub-category", subCategoryRoutes);
app.use("/item", itemRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}.`);
});

