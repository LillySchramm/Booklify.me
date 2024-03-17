import { env } from 'process';
import * as request from 'supertest';

describe('/books', () => {
    const app = env.URL || 'http://localhost:3000';

    beforeEach(async () => {
        await request(app).post('/system/reset').expect(201);
    });

    it('/:isbn should block unauthorized requests for unknown books', async () => {
        await request(app).get('/books/978-3-551-76194-1').expect(401);
    });

    it('/:isbn?skipCrawl=true should return existing book for unauthorized requests', async () => {
        const res = await request(app)
            .get('/books/978-3-7704-2860-1?skipCrawl=true')
            .expect(200);
        expect(res.body).toMatchObject({
            isbn: '9783770428601',
            title: 'Test Book',
            subtitle: 'Test Subtitle',
            publishedDate: null,
            description: 'Test Description',
            pageCount: 100,
            printedPageCount: 100,
            language: 'de',
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            publisherId: expect.any(String),
            bookCoverId: null,
            amazonLink: null,
            authors: [{ id: expect.any(String) }],
            groupId: null,
            hidden: false,
            noGroup: false,
            favorite: false,
        });
    });

    it('/:isbn?skipCrawl=true should not block unauthorized requests', async () => {
        await request(app)
            .get('/books/978-3-551-76194-1?skipCrawl=true')
            .expect(404);
    });
});
