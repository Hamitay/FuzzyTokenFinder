import { Folder } from ".prisma/client";
import { prisma } from "../db";

const createNewFolder = async (folderName: string, parentFolderId?: number): Promise<Folder> => {
    return await prisma.folder.create({
        data: {
            name: folderName,
            folderId: parentFolderId
        }
    })
}

const findAllFolders = async () : Promise<Folder[]> => {
    return await prisma.folder.findMany({
        include: {
            folders: true,
        }
    });
}

const findFolderById = async (folderId: number) : Promise<Folder | null> => {
    return await prisma.folder.findUnique({
        where: {
            id: folderId
        }
    })
}

export {
    createNewFolder,
    findAllFolders,
    findFolderById,
}