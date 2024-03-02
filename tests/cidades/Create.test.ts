import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('cidades- create', () => {
  it('Cria registro', async () => {
    const rest1 = await testServer.post('/cidades').send({ nome: 'Bragança' });
    //  console.log('res1', rest1);

    expect(rest1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof rest1.body).toEqual('number');
  });

  it('não deveria criar um registro com o nome muito curto', async () => {
    const rest1 = await testServer.post('/cidades').send({ nome: 'Br' });

    expect(rest1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(rest1.body).toHaveProperty('errors.body.nome');
  });
});