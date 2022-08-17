import bodyParser from 'body-parser';
import { RegisterRoutes } from '../build/routes';
import express, { Response as ExResponse, Request as ExRequest } from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import { readFileSync } from 'fs';
import jpeg from 'jpeg-js';
import { minioClient } from './tools/s3';
import { MINIO_BUCKET_NAME } from './tools/config';

export const app = express();
export const rawNotFoundImage = readFileSync('./public/notFound.jpg');
export const notFoundImage = jpeg.decode(rawNotFoundImage);

const NUMBER_REGEX = /^\d+$/;

app.use(cors());
// Use body parser to read sent json payloads
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());

app.use('/public/thumbnails/:imageName.png', async (req, res) => {
    const imageName = req.params.imageName;
    if (NUMBER_REGEX.test(imageName) && imageName.length <= 13) {
        try {
            const imageData = await minioClient.getObject(
                MINIO_BUCKET_NAME,
                'thumbnails/' + imageName + '.png'
            );
            imageData.on('data', (chunk) => res.write(chunk));
            imageData.on('close', () => res.end());
            res.status(200);
            return;
        } catch (e: any) {
            console.warn('Public image warning: ' + e.message);
        }
    }

    res.status(404);
    res.end(rawNotFoundImage);
});

app.use('/docs', swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
    return res.send(
        swaggerUi.generateHTML(await import('../build/swagger.json'))
    );
});

RegisterRoutes(app);
