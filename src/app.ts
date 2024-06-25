import { Hono } from "hono";
import { authRoutes } from "./authRoutes";

const app = new Hono();

app.use("*", json());

app.route("/auth", authRoutes);

export default app;
