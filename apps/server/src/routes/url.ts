import { Hono } from "hono";
import { validator } from "hono/validator";
import { checkHttpUrl, createShortUrl } from "../helpers/url";

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/", async (c) => {
  try {
    let { results } = await c.env.DB.prepare("SELECT * FROM urls").all();
    return c.json({ data: results });
  } catch (e: any) {
    return c.json({ err: e.message }, 500);
  }
});

app.post(
  "/",
  validator("json", (body, c) => {
    // If we want we can swap this out with a zod validator but
    // to keep it simple we're just using this for now.
    const longUrl = body?.data?.longUrl;
    if (!longUrl || typeof longUrl !== "string") {
      return c.json({ errors: [{ message: "Missing url" }] }, 400);
    }

    if (!checkHttpUrl(longUrl)) {
      return c.json({ errors: [{ message: "Invalid URL" }] }, 422);
    }

    return {
      body: body,
    };
  }),
  async (c) => {
    const { body } = c.req.valid("json");

    try {
      let { results: results } = await c.env.DB.prepare(
        "INSERT INTO urls (longUrl, shortUrl) VALUES (?, ?) RETURNING *"
      )
        .bind(body.data.longUrl.trim(), createShortUrl())
        .run();

      return c.json({
        data: results.pop(),
      });
    } catch (e: any) {
      console.error(e.message);
      return c.json({ errors: [{ message: "Error creating short url" }] }, 500);
    }
  }
);

app.delete("/:id", async (c) => {
  const id = c.req.param("id");

  const url = await c.env.DB.prepare("SELECT * FROM urls WHERE id = ?")
    .bind(id)
    .first("id");
  if (!url) {
    return c.json({ errors: [{ message: "Not Found" }] }, 404);
  }

  await c.env.DB.prepare("DELETE FROM urls WHERE id = ?").bind(id).run();

  return c.body(null, 204);
});

export default app;
