import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('pessoas - DeleteById', () => {

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


  it('Não deveria deletar um registro sem token de acesso', async () => {
    const res1 = await testServer
      .delete('/pessoas/1')
      .send({ nomeCompleto: 'Renan', email: 'renan@gmail.com', cidadeId });

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty('errors.default');
  });

  it('Deveria deletar pelo ID', async () => {
    const resp = await testServer.post('/pessoas').set({ Authorization: `Bearer ${accessToken}` }).send({ nomeCompleto: 'Renan', email: 'renandelete@gmail.com', cidadeId });

    expect(resp.statusCode).toEqual(StatusCodes.CREATED);

    const resDeletada = await testServer.delete(`/pessoas/${resp.body}`).set({ Authorization: `Bearer ${accessToken}` });

    expect(resDeletada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it('Não deveria tentar deletar um registro que não existe', async () => {
    const resp = await testServer.delete('/pessoas/99999').set({ Authorization: `Bearer ${accessToken}` });

    expect(resp.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(resp.body).toHaveProperty('errors.default');
  });
});