import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('cidades - DeleteById', () => {
  it('Deveria deletar pelo ID', async () => {
    const resp = await testServer.post('/cidades').send({ nome: 'Bragança' });

    expect(resp.statusCode).toEqual(StatusCodes.CREATED);

    const resDeletada = await testServer.delete(`/cidades/${resp.body}`);

    expect(resDeletada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it('Não deveria tentar deletar um registro que não existe', async () => {
    const resp = await testServer.delete('/cidades/99999');

    expect(resp.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(resp.body).toHaveProperty('errors.default');
  });
});