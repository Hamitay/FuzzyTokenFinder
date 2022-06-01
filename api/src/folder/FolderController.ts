import { json, Request, Router } from "express";
import { createNewFolder, findAllFolders } from "./FolderRepository";

const controller = Router();
controller.use(json());

type NewFolderRequest = {
  name: string;
  parentFolderId?: number;
};


controller.post("/", async (req, res) => {
    const { name, parentFolderId } = req.body as NewFolderRequest;
    const newFolder = await createNewFolder(name, parentFolderId)

    return res.json(newFolder);
})

controller.get("/", async (req, res) => {
  const folders = await findAllFolders();
  
  return res.json(folders)
})

export default controller;

/*
// Get all tokens
controller.get("/", async (req, res) => {
  const { searchParam } = req.query;
  try {
    const tokens = await getTokens(searchParam as string);
    res.json(tokens);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
});

// Hacky code because of odd multer type
interface MulterRequest extends Request {
  file: any;
}

controller.post("/", imageUploadMiddleware, async (req, res) => {
  const newTokenRequest = req.body as NewTokenRequest;
  const file = (req as MulterRequest).file;

  if (!file) {
    console.error("Error saving new token image");
    return res.sendStatus(500);
  }

  try {
    const location = file.location;
    const newToken = await addToken(
      newTokenRequest.name,
      location,
      newTokenRequest.metadata,
      newTokenRequest.folderId
    );
    res.json(newToken);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
});

export default controller;
*/