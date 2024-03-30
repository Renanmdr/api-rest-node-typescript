import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('pessoas - UpdateById', () => {

  let cidadeId: number | undefined = undefined;
  beforeAll(async () => {
    const resCidade = await testServer
      .post('/cidades')
      .send({ nome: 'Teste' });

    cidadeId = resCidade.body;
  });

  it('Deveria atualizar pelo ID', async () => {
    const rest1 = await testServer.post('/pessoas').send({ nomeCompleto: 'Renan', email: 'renan@gmail.com', cidadeId });

    expect(rest1.statusCode).toEqual(StatusCodes.CREATED);


    const resAtualizada = await testServer.put(`/pessoas/${rest1.body}`).send({ nomeCompleto: 'Renan', email: 'renanupdate@gmail.com', cidadeId });

    expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it('Não deveria tentar  atualizar um registro que não existe', async () => {
    const resAtualizada = await testServer.put('/pessoas/99999').send({ nomeCompleto: 'Renan', email: 'renan@gmail.com', cidadeId });

    expect(resAtualizada.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(resAtualizada.body).toHaveProperty('errors.default');
  });
});