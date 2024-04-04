import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('usuario - SignUp', () => {
  it('Cadastra usuario', async () => {
    const rest1 = await testServer.post('/cadastrar').send({ nome: 'Renan', email: 'renan@gmail.com', senha: '123456' });
    //  console.log('res1', rest1);

    expect(rest1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof rest1.body).toEqual('number');
  });

  it('Cadastra usuário 2', async () => {
    const res1 = await testServer
      .post('/cadastrar')
      .send({
        senha: '123456',
        nome: 'Lucas da Rosa',
        email: 'lucas@gmail.com',
      });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('number');
  });

  it('não deveria criar um usuario com o nome muito curto', async () => {
    const rest1 = await testServer.post('/cadastrar').send({ nome: 'Re', email: 'renan@gmail.com', senha: 123456 });

    expect(rest1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(rest1.body).toHaveProperty('errors.body.nome');
  });

  it('não deveria criar um usuario com o email muito curto', async () => {
    const rest1 = await testServer.post('/cadastrar').send({ nome: 'Renan', email: 'r@.c', senha: 123456 });

    expect(rest1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(rest1.body).toHaveProperty('errors.body.email');
  });

  it('não deveria criar um usuario com uma senha muito curta', async () => {
    const rest1 = await testServer.post('/cadastrar').send({ nome: 'Renan', email: 'renan@gmail.com', senha: 12345 });

    expect(rest1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(rest1.body).toHaveProperty('errors.body.senha');
  });

  it('não deveria criar um usuario sem um nome', async () => {
    const rest1 = await testServer.post('/cadastrar').send({ email: 'renan@gmail.com', senha: 123456 });

    expect(rest1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(rest1.body).toHaveProperty('errors.body.nome');
  });

  it('não deveria criar um usuario sem um email', async () => {
    const rest1 = await testServer.post('/cadastrar').send({ nome: 'Renan', senha: 123456 });

    expect(rest1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(rest1.body).toHaveProperty('errors.body.email');
  });

  it('não deveria criar um usuario sem uma senha', async () => {
    const rest1 = await testServer.post('/cadastrar').send({ nome: 'Renan', email: 'renan@gmail.com' });

    expect(rest1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(rest1.body).toHaveProperty('errors.body.senha');
  });

  it('não deveria criar um usuario com um email duplicado', async () => {

    const res1 = await testServer
      .post('/cadastrar')
      .send({
        senha: '123456',
        nome: 'Lucas da Rosa',
        email: 'lucasduplicado@gmail.com',
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('number');

    const rest1 = await testServer.post('/cadastrar').send({ nome: 'Renan', email: 'lucasduplicado@gmail.com', senha: 123456 });

    expect(rest1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(rest1.body).toHaveProperty('errors.default');
  });

  it('não deveria criar um usuario com um email invalido', async () => {
    const rest1 = await testServer.post('/cadastrar').send({ nome: 'Renan', email: 'renan3 @ gmail .com', senha: 123456 });

    expect(rest1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(rest1.body).toHaveProperty('errors.body.email');
  });

  it('não deveria criar um usuario sem nenhuma propriedade', async () => {
    const rest1 = await testServer.post('/cadastrar').send({});

    expect(rest1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(rest1.body).toHaveProperty('errors.body.nome');
    expect(rest1.body).toHaveProperty('errors.body.email');
    expect(rest1.body).toHaveProperty('errors.body.senha');
  });


});


