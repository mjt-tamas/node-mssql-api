import request from 'supertest';
import app from '~/app';
import { User } from '~/models/User';

describe('POST /users', () => {
  it('should create a new user', async () => {
    const newUser = {
      username: 'John Doe',
      email: 'johndoe@email.com',
      password: 'password123',
    };
    const response = await request(app).post('/api/users').send(newUser);
    console.log('response.body', response.body);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    // expect(response.body).toBeInstanceOf(User);
  });
});

describe('GET /users', () => {
  it('should return a list of users', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe('GET /users/:id', () => {
  it('should return a user by ID', async () => {
    const userId = 1;
    const response = await request(app).get(`/api/users/${userId}`);
    expect(response.status).toBe(200);
    // expect(response.body).toBeInstanceOf(User);
    expect(response.body).toHaveProperty('id', userId);
  });
  it('should return 404 for a non-existent user', async () => {
    const response = await request(app).get('/api/users/99999'); // Replace with a non-existent user ID
    expect(response.status).toBe(404);
  });
  it('should return 400 for an invalid ID', async () => {
    const response = await request(app).get('/api/users/invalid-id');
    expect(response.status).toBe(400);
  });
});

describe('PUT /users/:id', () => {
  it('should update a user by ID', async () => {
    const userId = 5; // Replace with a valid user ID
    const updatedUserPayload = { password: 'newpassword123' };
    const response = await request(app)
      .put(`/api/users/${userId}`)
      .send(updatedUserPayload);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', userId);
    expect(response.body.password).toBe(updatedUserPayload.password);
  });
  it('should return 404 for a non-existent user', async () => {
    const response = await request(app)
      .put('/api/users/99999')
      .send({ password: 'newpassword123' }); // Replace with a non-existent user ID
    expect(response.status).toBe(404);
  });
  it('should return 400 for an invalid ID', async () => {
    const response = await request(app)
      .put('/api/users/invalid-id')
      .send({ password: 'newpassword123' });
    expect(response.status).toBe(400);
  });
  it('should return 400 for invalid payload', async () => {
    const userId = 1; // Replace with a valid user ID
    const response = await request(app)
      .put(`/api/users/${userId}`)
      .send({ invalidField: 'value' });
    expect(response.status).toBe(400);
  });
});

describe('DELETE /users/:id', () => {
  it('should delete a user by ID', async () => {
    const userId = 1; // Replace with a valid user ID
    const response = await request(app).delete(`/api/users/${userId}`);
    expect(response.status).toBe(204);
  });
  it('should return 404 for a non-existent user', async () => {
    const response = await request(app).delete('/api/users/99999'); // Replace with a non-existent user ID
    expect(response.status).toBe(404);
  });
  it('should return 400 for an invalid ID', async () => {
    const response = await request(app).delete('/api/users/invalid-id');
    expect(response.status).toBe(400);
  });
});
