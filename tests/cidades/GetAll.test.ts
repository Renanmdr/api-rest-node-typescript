import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('cidades - GetAll', () => {
  it('Deveria pegar todas as cidades', async () => {
    const rest1 = await testServer.post('/cidades').send({ nome: 'Bragança' });

    expect(rest1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer.get('/cidades');

    expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0);
    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body.length).toBeGreaterThan(0);

  });
});