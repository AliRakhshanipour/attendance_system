import cors from 'cors';
import { config } from 'dotenv';
import morgan from 'morgan';
import path from 'path';

config(); // Load environment variables from .env file

const port = process.env.PORT || 3000; // Default to 3000 if PORT is not set

// Array of allowed origins
const allowedOrigins = [
  `http://127.0.0.1:${port}`, // Local development
  `http://localhost:${port}`, // Another allowed origin
];

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS')); // Reject the request
    }
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // If you need to send cookies or authorization headers
};

// Middleware function that accepts the express instance
export const setupMiddlewares = (app, express) => {
  app.use(express.static(path.join(process.cwd(), 'public'))); // Serve static files from 'public' directory
  app.use(express.json()); // Parse JSON request bodies
  app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
  app.use(morgan('dev')); // HTTP request logger
  app.use(cors(corsOptions)); // CORS middleware
};
