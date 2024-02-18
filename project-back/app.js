import express, { json, urlencoded } from 'express';
import routerApp from "./routes/routerApp.js";
import routerAuth from "./routes/routerAuth.js";
import routerProducts from "./routes/routerProducts.js";
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();
// MongoDB Connection
import './database/db.js';

// Cors
import cors from "cors";
const corsOptions = {
   credentials: true,
   origin: process.env.PATHCORS || '*',
   methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

// Settings
const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(json());
app.use(urlencoded({ extended: true }));

// Routes
app.use("/app", routerApp);
app.use("/auth", routerAuth);
app.use("/products", routerProducts);

export default app;