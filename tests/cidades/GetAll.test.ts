import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('cidades - GetAll', () => {


  let accessToken = '';
  beforeAll(async () => {
    const email = 'create-cidades@gmail.com';
    await testServer.post('/cadastrar').send({ nome: 'Teste', email, senha: '123456' });
    const signInRes = await testServer.post('/entrar').send({ email, senha: '123456' });

    accessToken = signInRes.body.accessToken;
  });

  it('Não deveria tentar pegar os registros sem token de acesso', async () => {
    const res1 = await testServer
      .get('/cidades')
      .send();

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty('errors.default');
  });

  it('Deveria pegar todas as cidades', async () => {
    const rest1 = await testServer.post('/cidades').set({ Authorization: `Bearer ${accessToken}` }).send({ nome: 'Bragança' });

    expect(rest1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer.get('/cidades').set({ Authorization: `Bearer ${accessToken}` });

    expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0);
    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body.length).toBeGreaterThan(0);

  });
});