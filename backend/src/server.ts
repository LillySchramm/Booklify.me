import { PrismaClient } from '@prisma/client';
import { app } from './app';
import { PORT } from './tools/config';
import { initializeMinio } from './tools/s3';

export const prisma = new PrismaClient();

app.listen(PORT, async () => {
    await initializeMinio();
    console.log(`Server listening at http://localhost:${PORT}`);
});
