import { Request, Router } from "express";
import { getTokens, addToken } from "./TokenService";
import { imageUploadMiddleware } from "../images/ImageUploadMIddleware";

const controller = Router();

type NewTokenRequest = {
  name: string;
  metadata?: {};
};

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
    const file = (req as MulterRequest).file;;

    if(!file) {
        console.error('Error saving new token image');
        return res.sendStatus(500);
    }

    try {
        const location = file.location;
        const newToken = await addToken(newTokenRequest.name, location, newTokenRequest.metadata)
        res.json(newToken);
    } catch(error) {
        console.error(error);
        return res.sendStatus(500);
    }
})


export default controller;


