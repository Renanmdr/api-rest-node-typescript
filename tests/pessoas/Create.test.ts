import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';
//email: string,
// cidadeId: number,
//   nomeCompleto
describe('pessoas - create', () => {
  let cidadeId: number | undefined = undefined;
  beforeAll(async () => {
    const resCidade = await testServer
      .post('/cidades')
      .send({ nome: 'Teste' });

    cidadeId = resCidade.body;
  });

  it('Cria registro', async () => {
    const res1 = await testServer.post('/pessoas').send({ nomeCompleto: 'Renan', email: 'renan@gmail.com', cidadeId });
    //  console.log('res1', res1);

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('number');
  });

  it('Cria registro 2', async () => {
    const res1 = await testServer.post('/pessoas').send({ nomeCompleto: 'Renan', email: 'renan2@gmail.com', cidadeId });
    //  console.log('res1', res1);

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('number');
  });

  it('Não deveria duplicar o email', async () => {
    const res1 = await testServer.post('/pessoas').send({ nomeCompleto: 'Renan', email: 'ren@gmail.com', cidadeId });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('number');

    const res2 = await testServer.post('/pessoas').send({ nomeCompleto: 'dublicado', email: 'ren@gmail.com', cidadeId });

    expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res2.body).toHaveProperty('errors.default');

  });

  it('não deveria criar um registro com o nome muito curto', async () => {
    const res1 = await testServer.post('/pessoas').send({ nomeCompleto: 'Br', email: 'renan@gmail.com', cidadeId });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.nomeCompleto');
  });

  it('não deveria criar um registro sem o nomeCompleto', async () => {
    const res1 = await testServer.post('/pessoas').send({ email: 'renan@gmail.com', cidadeId });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.nomeCompleto');
  });

  it('não deveria criar um registro sem o email', async () => {
    const res1 = await testServer.post('/pessoas').send({ nomeCompleto: 'Renan', cidadeId });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.email');
  });

  it('não deveria criar um registro sem o cidadeId', async () => {
    const res1 = await testServer.post('/pessoas').send({ nomeCompleto: 'Renan', email: 'renan@gmail.com' });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.cidadeId');
  });

  it('não deveria criar um registro com o cidadeId invalido', async () => {
    const res1 = await testServer.post('/pessoas').send({ nomeCompleto: 'Renan', email: 'renan@gmail.com', cidadeId: 'teste' });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.cidadeId');
  });

  it('não deveria criar um registro com o email invalido', async () => {
    const res1 = await testServer.post('/pessoas').send({ nomeCompleto: 'Renan', email: 'renan @ gmail com', cidadeId });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.email');
  });

  it('não deveria criar um registro sem nenhuma propriedade', async () => {
    const res1 = await testServer.post('/pessoas').send({});

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.email');
    expect(res1.body).toHaveProperty('errors.body.cidadeId');
    expect(res1.body).toHaveProperty('errors.body.nomeCompleto');
  });





});