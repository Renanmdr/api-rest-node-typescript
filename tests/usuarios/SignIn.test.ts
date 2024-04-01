import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('usuario - Signin', () => {
  beforeAll(async () => {
    await testServer.post('/cadastrar').send({
      nome: 'Renan',
      senha: '123456',
      email: 'renan@gmail.com',
    });
  });


  it('login usuario', async () => {
    const rest1 = await testServer.post('/entrar').send({ email: 'renan@gmail.com', senha: '123456' });
    //  console.log('res1', rest1);

    expect(rest1.statusCode).toEqual(StatusCodes.OK);
    expect(rest1.body).toHaveProperty('accessToken');
  });

  it('Senha errada', async () => {
    const res1 = await testServer
      .post('/entrar')
      .send({
        email: 'renan@gmail.com',
        senha: '1234567',
      });
    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty('errors.default');
  });

  it('Email errado', async () => {
    const res1 = await testServer
      .post('/entrar')
      .send({
        senha: '123456',
        email: 'renannnnnnn@gmail.com',
      });
    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty('errors.default');
  });

  it('não deveria entrar com um email invalido', async () => {
    const rest1 = await testServer.post('/entrar').send({ email: 'renan3 @ gmail .com', senha: 123456 });

    expect(rest1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(rest1.body).toHaveProperty('errors.body.email');
  });

  it('não deveria usar um email muito curto', async () => {
    const rest1 = await testServer.post('/entrar').send({ email: 'r@.c', senha: 123456 });

    expect(rest1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(rest1.body).toHaveProperty('errors.body.email');
  });

  it('não deveria usar uma senha muito curta', async () => {
    const rest1 = await testServer.post('/entrar').send({ email: 'renan@gmail.com', senha: 1234 });

    expect(rest1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(rest1.body).toHaveProperty('errors.body.senha');
  });



  it('não deveria entrar sem um email', async () => {
    const rest1 = await testServer.post('/entrar').send({ senha: 123456 });

    expect(rest1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(rest1.body).toHaveProperty('errors.body.email');
  });

  it('não deveria entrar sem uma senha', async () => {
    const rest1 = await testServer.post('/entrar').send({ email: 'renan@gmail.com' });

    expect(rest1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(rest1.body).toHaveProperty('errors.body.senha');
  });





  it('não deveria entrar sem nenhuma propriedade', async () => {
    const rest1 = await testServer.post('/entrar').send({});

    expect(rest1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(rest1.body).toHaveProperty('errors.body.email');
    expect(rest1.body).toHaveProperty('errors.body.senha');
  });




});