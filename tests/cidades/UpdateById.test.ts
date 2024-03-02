import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('cidades - UpdateById', () => {
  it('Deveria atualizar pelo ID', async () => {
    const rest1 = await testServer.post('/cidades').send({ nome: 'Bragança' });

    expect(rest1.statusCode).toEqual(StatusCodes.CREATED);


    const resAtualizada = await testServer.put(`/cidades/${rest1.body}`).send({ nome: 'Belém' });

    expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it('Não deveria tentar  atualizar um registro que não existe', async () => {
    const resAtualizada = await testServer.put('/cidades/99999').send({ nome: 'Belém' });

    expect(resAtualizada.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(resAtualizada.body).toHaveProperty('errors.default');
  });
});