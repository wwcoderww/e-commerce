import express from "express";
import { productsRouter } from "./routes/productsRoutes.js";
import cors from "cors";
import { auth } from "./lib/auth.js";
import { toNodeHandler } from "better-auth/node";
import { cartRouter } from "./routes/cartRoute.js";
const app = express();
const apiRouter = express.Router();
app.set("trust proxy", true);
// Middlewares
app.use(
  cors({
    origin: ["http://localhost:3000", process.env.FRONTEND_URL].filter(
      Boolean,
    ) as string[],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["set-auth-token"],
    credentials: true,
  }),
);
app.options("*splat", cors());

apiRouter.all("/auth/*splat", toNodeHandler(auth));

apiRouter.use(express.json());
apiRouter.use(express.urlencoded({ extended: true }));
apiRouter.use("/products", productsRouter);
apiRouter.use("/cart", cartRouter);

app.use(process.env.DATABASE_URL?.includes("amazon") ? "/api" : "/", apiRouter);

export default app;
