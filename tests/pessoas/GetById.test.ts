import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('pessoas - getById', () => {

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

  it('Não deveria pegar um registro sem token de acesso', async () => {
    const res1 = await testServer
      .get('/pessoas/1')
      .send({ nomeCompleto: 'Renan', email: 'renan@gmail.com', cidadeId });

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty('errors.default');
  });

  it('Pegar registro por Id', async () => {
    const rest1 = await testServer.post('/pessoas').set({ Authorization: `Bearer ${accessToken}` }).send({ nomeCompleto: 'Renan', email: 'renan@gmail.com', cidadeId });


    expect(rest1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer.get(`/pessoas/${rest1.body}`).set({ Authorization: `Bearer ${accessToken}` });

    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body).toHaveProperty('nomeCompleto');

  });

  it('Não deveria buscar um resgistro que não existe', async () => {
    const rest1 = await testServer.get('/pessoas/99999').set({ Authorization: `Bearer ${accessToken}` });


    expect(rest1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(rest1.body).toHaveProperty('errors.default');


  });


});