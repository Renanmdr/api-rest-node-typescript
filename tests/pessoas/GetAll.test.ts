import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('pessoas - GetAll', () => {

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

  it('Não deveria pegar os registros sem token de acesso', async () => {
    const res1 = await testServer
      .get('/pessoas')
      .send({});

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty('errors.default');
  });

  it('Deveria pegar todas as cidades', async () => {
    const rest1 = await testServer.post('/pessoas').set({ Authorization: `Bearer ${accessToken}` }).send({ nomeCompleto: 'Renan', email: 'renan@gmail.com', cidadeId });

    expect(rest1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer.get('/pessoas').set({ Authorization: `Bearer ${accessToken}` });

    expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0);
    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body.length).toBeGreaterThan(0);

  });
});