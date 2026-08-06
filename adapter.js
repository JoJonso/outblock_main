import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaMariaDb({
  user: "root",
  password: "",
  host: "localhost",
  port: 3307,
  database: 'outblockMain'
});
const prisma = new PrismaClient({ adapter });

export default prisma;