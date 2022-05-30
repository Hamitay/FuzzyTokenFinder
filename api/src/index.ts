import cors from "cors";
import express, { Express } from "express";
import controller from "./token/TokenController";

const app: Express = express();
const port = 8080;

app.use(cors())
app.use('/tokens', controller)


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
