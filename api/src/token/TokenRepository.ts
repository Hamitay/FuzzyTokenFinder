import { Token } from ".prisma/client";
import { prisma } from "../db";

const SIMILARITY_THRESHOLD = 0.3

const fetchTokens = async (searchParam?: string) => {
  if (searchParam) {
    return await fetchSimilarTokens(searchParam)
  } else {
    return await fetchAllTokens();
  }
};

const createNewToken = async (name: string, url: string, metadata?: {}, folderId?: number) => {
  return await prisma.token.create({
    data: {
      name,
      url,
      metadata,
      folderId,
    }
  })
}

const fetchAllTokens = async () => {
    return await prisma.token.findMany({});
}

const fetchSimilarTokens = async (searchParam: string) => {
    const similarTokens = (await prisma.$queryRaw`SELECT * FROM "Token" 
            WHERE SIMILARITY(name, ${searchParam}) >= ${SIMILARITY_THRESHOLD} 
            ORDER BY SIMILARITY(name, ${searchParam}) DESC;`) as
      | Token[]
      | undefined;

    return similarTokens;
}

export { fetchTokens, createNewToken };
