import cors from "cors";
import express, { Express } from "express";
import tokenController from "./token/TokenController";
import folderController from "./folder/FolderController";

const app: Express = express();
const port = 8080;

app.use(cors())
app.use('/tokens', tokenController)
app.use('/folder', folderController)


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
