import { fetchTokens, createNewToken } from "./TokenRepository";

const getTokens = async (searchParam: string | undefined) => {
  return await fetchTokens(searchParam);
};

const addToken =  async (name: string, url: string, metadata: {} | undefined) => {
  return await createNewToken(name, url, metadata)
}

export { getTokens, addToken };