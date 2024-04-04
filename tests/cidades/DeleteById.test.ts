import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('cidades - DeleteById', () => {


  let accessToken = '';
  beforeAll(async () => {
    const email = 'create-cidades@gmail.com';
    await testServer.post('/cadastrar').send({ nome: 'Teste', email, senha: '123456' });
    const signInRes = await testServer.post('/entrar').send({ email, senha: '123456' });

    accessToken = signInRes.body.accessToken;
  });

  it('Não deveria tentar deletar um registro sem token de acesso', async () => {
    const res1 = await testServer
      .delete('/cidades/1')
      .send({ nome: 'Caxias do Sul' });

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty('errors.default');
  });

  it('Deveria deletar pelo ID', async () => {
    const resp = await testServer.post('/cidades').set({ Authorization: `Bearer ${accessToken}` }).send({ nome: 'Bragança' });

    expect(resp.statusCode).toEqual(StatusCodes.CREATED);

    const resDeletada = await testServer.delete(`/cidades/${resp.body}`).set({ Authorization: `Bearer ${accessToken}` });

    expect(resDeletada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it('Não deveria tentar deletar um registro que não existe', async () => {
    const resp = await testServer.delete('/cidades/99999').set({ Authorization: `Bearer ${accessToken}` });

    expect(resp.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(resp.body).toHaveProperty('errors.default');
  });
});