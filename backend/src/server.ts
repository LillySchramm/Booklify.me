import { PrismaClient } from '@prisma/client';
import { app } from './app';
import { PORT } from './tools/config';

export const prisma = new PrismaClient();

app.listen(PORT, async () =>
    console.log(`Server listening at http://localhost:${PORT}`)
);
