import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('pessoas - GetAll', () => {

  let cidadeId: number | undefined = undefined;
  beforeAll(async () => {
    const resCidade = await testServer
      .post('/cidades')
      .send({ nome: 'Teste' });

    cidadeId = resCidade.body;
  });

  it('Deveria pegar todas as cidades', async () => {
    const rest1 = await testServer.post('/pessoas').send({ nomeCompleto: 'Renan', email: 'renan@gmail.com', cidadeId });

    expect(rest1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer.get('/pessoas');

    expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0);
    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body.length).toBeGreaterThan(0);

  });
});