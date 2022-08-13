import { PrismaClient } from '@prisma/client';
import { app } from './app';

export const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);
