import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('pessoas - UpdateById', () => {

  let accessToken = '';
  beforeAll(async () => {
    const email = 'create-cidades@gmail.com';
    await testServer.post('/cadastrar').send({ nome: 'Teste', email, senha: '123456' });
    const signInRes = await testServer.post('/entrar').send({ email, senha: '123456' });

    accessToken = signInRes.body.accessToken;
  });

  let cidadeId: number | undefined = undefined;
  beforeAll(async () => {
    const resCidade = await testServer
      .post('/cidades').set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: 'Teste' });

    cidadeId = resCidade.body;
  });

  it('Não deveria atualizar um registro sem token de acesso', async () => {
    const res1 = await testServer
      .put('/pessoas/1')
      .send({ nomeCompleto: 'Renan', email: 'renan@gmail.com', cidadeId });

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty('errors.default');
  });

  it('Deveria atualizar pelo ID', async () => {
    const rest1 = await testServer.post('/pessoas').set({ Authorization: `Bearer ${accessToken}` }).send({ nomeCompleto: 'Renan', email: 'renan@gmail.com', cidadeId });

    expect(rest1.statusCode).toEqual(StatusCodes.CREATED);


    const resAtualizada = await testServer.put(`/pessoas/${rest1.body}`).set({ Authorization: `Bearer ${accessToken}` }).send({ nomeCompleto: 'Renan', email: 'renanupdate@gmail.com', cidadeId });

    expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it('Não deveria tentar  atualizar um registro que não existe', async () => {
    const resAtualizada = await testServer.put('/pessoas/99999').set({ Authorization: `Bearer ${accessToken}` }).send({ nomeCompleto: 'Renan', email: 'renan@gmail.com', cidadeId });

    expect(resAtualizada.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(resAtualizada.body).toHaveProperty('errors.default');
  });
});