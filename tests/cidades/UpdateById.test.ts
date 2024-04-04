import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('cidades - UpdateById', () => {

  let accessToken = '';
  beforeAll(async () => {
    const email = 'create-cidades@gmail.com';
    await testServer.post('/cadastrar').send({ nome: 'Teste', email, senha: '123456' });
    const signInRes = await testServer.post('/entrar').send({ email, senha: '123456' });

    accessToken = signInRes.body.accessToken;
  });

  it('Não deveria tentar atualizar um registro sem token de acesso', async () => {
    const res1 = await testServer
      .put('/cidades/1')
      .send({ nome: 'Caxias do Sul' });

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty('errors.default');
  });

  it('Deveria atualizar pelo ID', async () => {
    const rest1 = await testServer.post('/cidades').set({ Authorization: `Bearer ${accessToken}` }).send({ nome: 'Bragança' });

    expect(rest1.statusCode).toEqual(StatusCodes.CREATED);


    const resAtualizada = await testServer.put(`/cidades/${rest1.body}`).set({ Authorization: `Bearer ${accessToken}` }).send({ nome: 'Belém' });

    expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it('Não deveria tentar  atualizar um registro que não existe', async () => {
    const resAtualizada = await testServer.put('/cidades/99999').set({ Authorization: `Bearer ${accessToken}` }).send({ nome: 'Belém' });

    expect(resAtualizada.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(resAtualizada.body).toHaveProperty('errors.default');
  });
});