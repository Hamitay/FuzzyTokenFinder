import { fetchTokens, createNewToken } from "./TokenRepository";

const getTokens = async (searchParam?: string) => {
  return await fetchTokens(searchParam);
};

const addToken =  async (name: string, url: string, metadata?: {}, folderId?: number) => {
  return await createNewToken(name, url, metadata, folderId)
}

export { getTokens, addToken };