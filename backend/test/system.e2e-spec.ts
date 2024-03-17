import * as request from 'supertest';

describe('/system', () => {
    const app = 'http://localhost:3000';

    beforeEach(async () => {
        await request(app).post('/system/reset').expect(201);
    });

    it('/health should return database and s3', async () => {
        const res = await request(app).get('/system/health').expect(200);
        expect(res.body).toEqual({ database: true, s3: true });
    });

    it('/info should show the relevant information about the backend', async () => {
        const res = await request(app).get('/system/info').expect(200);
        expect(res.body).toEqual({
            signUpEnabled: true,
            cdn: expect.any(String),
            recaptcha: {
                enabled: false,
                siteKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
            },
            legal: {
                enabled: false,
                tosUrl: 'https://example.com/tos',
                privacyUrl: 'https://example.com/privacy',
            },
            reports: { enabled: true },
            version: expect.any(String),
            amazon: { referralTag: '' },
        });
    });
});
