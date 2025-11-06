import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './config/db.js';
import connectCloudinary from "./config/cloudinary.js";
import jwt from "jsonwebtoken";


import userRouter from "./routes/userRoutes.js";
import hotelRouter from './routes/hotelRoutes.js';
import roomRouter from "./routes/roomRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import { stripeWebHooks } from "./controllers/stripeWebHook.js";

const app = express();


await connectDB();
await connectCloudinary();

// Allowed origins for CORS
const allowedOrigins = [
  "http://localhost:5173",
  "https://stayza.vercel.app",
];

// Stripe webhook (must be raw body)
app.post('/api/stripe', express.raw({ type: "application/json" }), stripeWebHooks);

// CORS setup
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Middlewares
app.use(express.json());

// ---------------- JWT AUTH ----------------

// Issue JWT (example login route, replace with real logic)
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  // TODO: validate email/password with DB
  if (email !== "test@example.com" || password !== "password") {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Payload for JWT
  const payload = { email };

  // Sign token
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.json({ token });
});

// Middleware to protect routes
function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1]; // Expect "Bearer <token>"

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    req.user = decoded; // attach decoded payload (like email) to req
    next();
  });
}


app.use('/api/user', authMiddleware, userRouter);
app.use('/api/hotel', authMiddleware, hotelRouter);
app.use('/api/room', authMiddleware, roomRouter);
app.use('/api/bookings', authMiddleware, bookingRouter);

app.get('/', (req, res) => res.send("Working..."));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
