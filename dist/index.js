"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hono_1 = require("hono"); // To use hono framework
const pretty_json_1 = require("hono/pretty-json"); // To work with json
const authRoutes_1 = require("./authRoutes"); // To use routes declared in the authRoutes
const node_server_1 = require("@hono/node-server"); //To start server
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// To create a new Hono instance
const app = new hono_1.Hono();
app.get("/", (c) => {
    return c.html("<h1>Hello OCG!</h1>");
});
app.use("*", (0, pretty_json_1.prettyJSON)());
// To use routes declared in the authRoutes and port number
app.route("/auth", authRoutes_1.authRoutes);
const port = Number(process.env.PORT);
(0, node_server_1.serve)({
    fetch: app.fetch,
    port: port,
});
console.log(`Server running on http://localhost:${port}`);
