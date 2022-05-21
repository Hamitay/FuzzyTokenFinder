import express, { Express, Request, Response } from "express";
//import dotenv from 'dotenv';

//dotenv.config();

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const main = async () => {
  const tokens = await prisma.token.findMany();

  const similarTokens = await prisma.$queryRaw`SELECT
  name, SIMILARITY(name,'dragão')
  FROM "Token";`
  console.table(similarTokens)
};

main().catch((e) => {
  throw e;
}).finally(async () => await prisma.$disconnect());

// const app: Express = express();
// const port = 8080;

// app.get("/", (req: Request, res: Response) => {
//   res.send("Express + TypeScript Server");
// });

// app.listen(port, () => {
//   console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
// });
