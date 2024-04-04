import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('cidades- create', () => {

  let accessToken = '';
  beforeAll(async () => {
    const email = 'create-cidades@gmail.com';
    await testServer.post('/cadastrar').send({ nome: 'Teste', email, senha: '123456' });
    const signInRes = await testServer.post('/entrar').send({ email, senha: '123456' });

    accessToken = signInRes.body.accessToken;
  });


  it('Tenta criar um registro sem token de acesso', async () => {
    const res1 = await testServer
      .post('/cidades')
      .send({ nome: 'Caxias do Sul' });

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty('errors.default');
  });

  it('Cria registro', async () => {
    const rest1 = await testServer.post('/cidades').set({ Authorization: `Bearer ${accessToken}` }).send({ nome: 'Bragança' });
    //  console.log('res1', rest1);

    expect(rest1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof rest1.body).toEqual('number');
  });

  it('não deveria criar um registro com o nome muito curto', async () => {
    const rest1 = await testServer.post('/cidades').set({ Authorization: `Bearer ${accessToken}` }).send({ nome: 'Br' });

    expect(rest1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(rest1.body).toHaveProperty('errors.body.nome');
  });
});