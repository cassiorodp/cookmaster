const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const jwt = require('jsonwebtoken');

const server = require('../api/app');
const { getConnection } = require('./connectionMock');

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /users', () => {
  describe('quando é criado com sucesso', () => {
    let response;
    let connectionMock;
    before(async () => {
      connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect')
        .resolves(connectionMock);

      response = await chai.request(server)
        .post('/users')
        .send({
          "name": "cassio",
          "email": "cassio@example.com",
          "password": "1234"
        });
    });

    after(async () => {
      MongoClient.connect.restore();
    });

    it('retorna o código de status 201', () => {
      expect(response).to.have.status(201);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('user');
    });
  });
  describe('quando falta o email', () => {
    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect')
        .resolves(connectionMock);

      response = await chai.request(server)
        .post('/users')
        .send({
          "name": "cassio",
          "password": "1234"
        });
    });

    after(async () => {
      MongoClient.connect.restore();
    });

    it('retorna o código de status 400', () => {
      expect(response).to.have.status(400);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it(' a propriedade "message" possui o text', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });
  });
});

describe('POST /login', () => {
  describe('quando é logado com sucesso', () => {
    let response;
    let connectionMock;
    before(async () => {
      connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect')
        .resolves(connectionMock);

      const usersCollection = connectionMock.db('Cookmaster').collection('users');

      await usersCollection.insertOne({
        name: "cassio",
        email: "cassio@example.com",
        password: "1234"
      });

      response = await chai.request(server)
        .post('/login')
        .send({
          "email": "cassio@example.com",
          "password": "1234"
        });
    });

    after(async () => {
      MongoClient.connect.restore();
    });

    it('retorna o código de status 200', () => {
      expect(response).to.have.status(200);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "token"', () => {
      expect(response.body).to.have.property('token');
    });


  it('a propriedade "message" deve conter um token JWT com o email usado no login no seu payload', () => {
    const { token } = response.body;
    const payload = jwt.decode(token);

    expect(payload.data.email).to.be.equals('cassio@example.com')
  });
  });
});

describe('POST /recipes', () => {
  describe('quando a receita é cadastrada com sucesso', () => {
    let response;
    let connectionMock;
    before(async () => {
      connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect')
        .resolves(connectionMock);

      const usersCollection = connectionMock.db('Cookmaster').collection('users');

      await usersCollection.insertOne({
        name: "cassio",
        email: "cassio@example.com",
        password: "1234"
      });

      const token = await chai.request(server)
        .post('/login')
        .send({
          "email": "cassio@example.com",
          "password": "1234"
        })
        .then((res) => res.body.token);

      response = await chai.request(server)
        .post('/recipes')
        .send({
          "name": "Frango",
          "ingredients": "Frango, Sazon",
          "preparation": "10 minutos no forno"
        })
        .set('authorization', token)
    });

    after(async () => {
      MongoClient.connect.restore();
    });

    it('retorna o código de status 201', () => {
      expect(response).to.have.status(201);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "recipe"', () => {
      expect(response.body).to.have.property('recipe');
    });

    it('a propriedade "recipe" possui um "_id"', () => {
      expect(response.body.recipe).to.have.property('_id');
    })
  });
});