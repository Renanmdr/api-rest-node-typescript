import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('cidades - getById', () => {

  let accessToken = '';
  beforeAll(async () => {
    const email = 'getById-cidades@gmail.com';
    await testServer.post('/cadastrar').send({ nome: 'Teste', email, senha: '123456' });
    const signInRes = await testServer.post('/entrar').send({ email, senha: '123456' });

    accessToken = signInRes.body.accessToken;
  });

  it('Não deveria tentar pegar um registro sem token de acesso', async () => {
    const res1 = await testServer
      .get('/cidades/1')
      .send({ nome: 'Caxias do Sul' });

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty('errors.default');
  });

  it('Pegar registro por Id', async () => {
    const rest1 = await testServer.post('/cidades').set({ Authorization: `Bearer ${accessToken}` }).send({ nome: 'Bragança' });


    expect(rest1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer.get(`/cidades/${rest1.body}`).set({ Authorization: `Bearer ${accessToken}` });

    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body).toHaveProperty('nome');

  });

  it('Não deveria buscar um resgistro que não existe', async () => {
    const rest1 = await testServer.get('/cidades/99999').set({ Authorization: `Bearer ${accessToken}` });


    expect(rest1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(rest1.body).toHaveProperty('errors.default');


  });


});