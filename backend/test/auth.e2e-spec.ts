import { env } from 'process';
import * as request from 'supertest';

describe('/auth', () => {
    const app = env.URL || 'http://localhost:3000';

    beforeEach(async () => {
        await request(app).post('/system/reset').expect(201);
    });

    it('/signup allows signup', async () => {
        const res = await request(app)
            .post('/auth/signup')
            .send({
                name: 'lillychan',
                email: 'me@example.com',
                password: '*wgtpGc3o$uVjW',
                recaptchaToken: 'string',
                agreedTos: true,
                agreedPrivacy: true,
            })
            .expect(201);
        expect(res.body).toMatchObject({
            id: expect.any(String),
            name: 'lillychan',
            email: 'me@example.com',
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            activated: true,
        });
    });

    it('/signup should block duplications', async () => {
        await request(app)
            .post('/auth/signup')
            .send({
                name: 'test',
                email: 'me@example.com',
                password: '*wgtpGc3o$uVjW',
                recaptchaToken: 'string',
                agreedTos: true,
                agreedPrivacy: true,
            })
            .expect(409);

        await request(app)
            .post('/auth/signup')
            .send({
                name: 'lillychan',
                email: 'test@test.de',
                password: '*wgtpGc3o$uVjW',
                recaptchaToken: 'string',
                agreedTos: true,
                agreedPrivacy: true,
            })
            .expect(409);
    });

    it('/signup should block insecure passwords', async () => {
        await request(app)
            .post('/auth/signup')
            .send({
                name: 'lillychan',
                email: 'me@example.com',
                password: 'a',
                recaptchaToken: 'string',
                agreedTos: true,
                agreedPrivacy: true,
            })
            .expect(400);
        await request(app)
            .post('/auth/signup')
            .send({
                name: 'lillychan',
                email: 'me@example.com',
                password: 'aaaaaaaaaaaaaaa',
                recaptchaToken: 'string',
                agreedTos: true,
                agreedPrivacy: true,
            })
            .expect(400);
        await request(app)
            .post('/auth/signup')
            .send({
                name: 'lillychan',
                email: 'me@example.com',
                password: 'AAAAAAAAAAA000000aaaaaa',
                recaptchaToken: 'string',
                agreedTos: true,
                agreedPrivacy: true,
            })
            .expect(400);
        await request(app)
            .post('/auth/signup')
            .send({
                name: 'lillychan',
                email: 'me@example.com',
                password: 'AAAAAAAAAA*A000000',
                recaptchaToken: 'string',
                agreedTos: true,
                agreedPrivacy: true,
            })
            .expect(400);
    });

    it('/login allows login', async () => {
        let res = await request(app)
            .post('/auth/login')
            .send({
                email: 'test@test.de',
                password: '*wgtpGc3o$uVjW',
                permanent: true,
            })
            .expect(200);
        expect(res.body).toMatchObject({
            accessToken: expect.any(String),
        });

        res = await request(app)
            .post('/auth/login')
            .send({
                email: 'test@test.de',
                password: '*wgtpGc3o$uVjW',
                permanent: false,
            })
            .expect(200);
        expect(res.body).toMatchObject({
            accessToken: expect.any(String),
        });
    });

    it('/login blocks login with wrong credentials', async () => {
        await request(app)
            .post('/auth/login')
            .send({
                email: 'test@test2.de',
                password: '*wgtpGc3o$uVjW',
                permanent: true,
            })
            .expect(401);
        await request(app)
            .post('/auth/login')
            .send({
                email: 'test@test.de',
                password: '**wgtpGc3o$uVjW',
                permanent: true,
            })
            .expect(401);
    });
});
