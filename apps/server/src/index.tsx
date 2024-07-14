import { Hono } from "hono";
import { cors } from "hono/cors";

import urlRoutes from "./routes/url";

const app = new Hono();

app.use("/api/*", cors());

app.route("/api/v1/url", urlRoutes);

export default app;
