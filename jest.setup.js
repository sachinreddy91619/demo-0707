// jest.setup.js
jest.setTimeout(10000);

// Suppress Fastify logger during tests
beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
    jest.restoreAllMocks();
});

// Handle MongoDB connection mocking if needed
jest.mock('mongoose', () => ({
    connect: jest.fn().mockResolvedValue(true),
    connection: {
        close: jest.fn().mockResolvedValue(true)
    }
}));