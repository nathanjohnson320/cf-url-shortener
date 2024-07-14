import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.json({ data: [] });
});

app.post("/", (c) => {
  return c.json({
    data: {
      id: 1,
      longUrl: "https://example.com",
      shortUrl: "123",
    },
  });
});

app.delete("/:id", (c) => {
  return c.text("", 204);
});

export default app;
