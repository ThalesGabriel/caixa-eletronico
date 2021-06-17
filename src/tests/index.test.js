'use strict'

const request = require('supertest');
const { validateURL, validateParam } = require('../utils/errorHandler');
const app = require('../../config/express')();

describe('Validate URL', () => {
  it('should check if param does not exist', () => {
    const url = 'http://localhost:3000/transform?decimal='
    const param = url.split("=")[1]
    const res = validateURL(param)
    expect(res.message).toBe("You need to pass a decimal value from URL");
  });

  it('should check if a param exist even though it is not valid', () => {
    const url = 'http://localhost:3000/transform?decimal=R$'
    const param = url.split("=")[1]
    const res = validateURL(param)
    expect(res).toBe(undefined);
  });
});

describe('Validate param', () => {
  it('should get response 200 because we passed a valid param formating', () => {
    const url = 'http://localhost:3000/transform?decimal=R$30,00'
    const param = url.split("=")[1]
    const res = validateParam(param)
    expect(res).toBe("30");
  });

  it('should get response 200 because we passed another valid param formating', () => {
    const url = 'http://localhost:3000/transform?decimal=R$30'
    const param = url.split("=")[1]
    const res = validateParam(param)
    expect(res).toBe("30");
  });

  it('should get response 400 because we just passed "R$"', () => {
    const url = 'http://localhost:3000/transform?decimal=R$'
    const param = url.split("=")[1]
    const res = validateParam(param)
    expect(res.message).toBe("You need to pass a decimal value from URL");
  });

  it("should get response 400 because we passed a value that can't be represented by the bucks we have", () => {
    const url = 'http://localhost:3000/transform?decimal=R$31,00'
    const param = url.split("=")[1]
    const res = validateParam(param)
    expect(res.message).toBe("You need to pass multiple from 10");
  });
});

describe('Should test my app server', () => {
  it('should test first example of the challenge description R$30', async () => {
    const res = await request(app).get("/transform?decimal=R$30,00");
    const { body } = res;
    expect(body.message).toBe("Valor do Saque: R$ 30,00 – Resultado Esperado: Entregar 1 nota(s) de R$20,00, e 1 nota(s) de R$10,00.")
  });
  
  it('should test second example of the challenge description R$80', async () => {
    const res = await request(app).get("/transform?decimal=R$80,00");
    const { body } = res;
    expect(body.message).toBe("Valor do Saque: R$ 80,00 – Resultado Esperado: Entregar 1 nota(s) de R$50,00, entregar 1 nota(s) de R$20,00, e 1 nota(s) de R$10,00.")
  });

  it('should test a random value like R$12650', async () => {
    const res = await request(app).get("/transform?decimal=R$12650");
    const { body } = res;
    expect(body.message).toBe("Valor do Saque: R$ 12650,00 – Resultado Esperado: Entregar 126 nota(s) de R$100,00, e 1 nota(s) de R$50,00.")
  });

  it('should test a random value like R$380', async () => {
    const res = await request(app).get("/transform?decimal=R$380");
    const { body } = res;
    expect(body.message).toBe("Valor do Saque: R$ 380,00 – Resultado Esperado: Entregar 3 nota(s) de R$100,00, entregar 1 nota(s) de R$50,00, entregar 1 nota(s) de R$20,00, e 1 nota(s) de R$10,00.")
  });
})