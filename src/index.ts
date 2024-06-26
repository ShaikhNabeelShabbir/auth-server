import { Hono } from "hono"; // To use hono framework
import { prettyJSON } from "hono/pretty-json"; // To work with json
import { authRoutes } from "./authRoutes"; // To use routes declared in the authRoutes
import { serve } from "@hono/node-server"; //To start server

// To create a new Hono instance
const app = new Hono();
app.get("/", (c) => {
  return c.html("<h1>Hello Hono!</h1>");
});

app.use("*", prettyJSON());

// To use routes declared in the authRoutes and port number
app.route("/auth", authRoutes);
const port = 5000;

serve({
  fetch: app.fetch,
  port: port,
});
console.log(`Server running on http://localhost:${port}`);
