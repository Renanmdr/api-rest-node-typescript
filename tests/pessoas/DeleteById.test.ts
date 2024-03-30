import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('pessoas - DeleteById', () => {

  let cidadeId: number | undefined = undefined;
  beforeAll(async () => {
    const resCidade = await testServer
      .post('/cidades')
      .send({ nome: 'Teste' });

    cidadeId = resCidade.body;
  });



  it('Deveria deletar pelo ID', async () => {
    const resp = await testServer.post('/pessoas').send({ nomeCompleto: 'Renan', email: 'renandelete@gmail.com', cidadeId });

    expect(resp.statusCode).toEqual(StatusCodes.CREATED);

    const resDeletada = await testServer.delete(`/pessoas/${resp.body}`);

    expect(resDeletada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it('Não deveria tentar deletar um registro que não existe', async () => {
    const resp = await testServer.delete('/pessoas/99999');

    expect(resp.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(resp.body).toHaveProperty('errors.default');
  });
});