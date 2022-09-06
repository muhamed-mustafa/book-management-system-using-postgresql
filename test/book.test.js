import { app } from '../app.js';
import request from 'supertest';
import chai from 'chai';

describe('GET /book', function () {
  it('return list of books', function (done) {
    request(app)
      .get('/api/v1/book')
      .expect(200)
      .expect((res) => {
        chai.expect(res.statusCode).equal(200);
      })
      .end(done);
  });
});

describe('POST /book', function () {
  it('Added a new book', function (done) {
    request(app)
      .post('/api/v1/book')
      .send({
        title: 'title two',
        description: 'description two',
        publisher: 'Nour',
        author: 'Nour',
        pages: 400,
        storeCode: 'WNFJN',
      })
      .expect(201)
      .expect((res) => {
        chai.expect(res.statusCode).equal(201);
        chai.expect(res.body.message).equal('Successfully adding new book');
      })
      .end(done);
  });
});
