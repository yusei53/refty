import { PrismaClient } from "@prisma/client";
import prismaRandom from "prisma-extension-random";

declare global {
  // eslint-disable-next-line no-var
  var prisma: ReturnType<typeof createPrismaClient> | undefined;
}

const createPrismaClient = () => new PrismaClient().$extends(prismaRandom());
const prisma = globalThis.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

export default prisma;
