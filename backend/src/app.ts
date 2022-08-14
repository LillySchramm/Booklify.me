import bodyParser from 'body-parser';
import { RegisterRoutes } from '../build/routes';
import express, { Response as ExResponse, Request as ExRequest } from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import { readFileSync } from 'fs';
import jpeg from 'jpeg-js';

export const app = express();
export const notFoundImage = jpeg.decode(readFileSync('./public/notFound.jpg'));

app.use(cors());
// Use body parser to read sent json payloads
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());
app.use('/public', express.static('./public'));

app.use('/docs', swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
    return res.send(
        swaggerUi.generateHTML(await import('../build/swagger.json'))
    );
});

RegisterRoutes(app);
