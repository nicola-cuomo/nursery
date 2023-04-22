import { PrismaClient } from "@prisma/client";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import appRouter from "./trpc";

export const prisma = new PrismaClient();

const port = process.env.PORT || 3000;

createHTTPServer({
  router: appRouter,
}).listen(Number(port));

// app.get("/todos/:id", async (req, res) => {
//   const id = req.params.id;
//   const todo = await prisma.activity.findUnique({
//     where: { id },
//   });

//   return res.json(todo);
// });

// app.put("/todos/:id", async (req, res) => {
//   const id = req.params.id;
//   const todo = await prisma.activity.update({
//     where: { id },
//     data: req.body,
//   });

//   return res.json(todo);
// });

// app.delete("/todos/:id", async (req, res) => {
//   const id = req.params.id;
//   await prisma.activity.delete({
//     where: { id },
//   });

//   return res.send({ status: "ok" });
// });

// app.get("/", async (req, res) => {
//   res.send(
//     `
//   <h1>Todo REST API</h1>
//   <h2>Available Routes</h2>
//   <pre>
//     GET, POST /todos
//     GET, PUT, DELETE /todos/:id
//   </pre>
//   `.trim()
//   );
// });

// app.listen(Number(port), "0.0.0.0", () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });
