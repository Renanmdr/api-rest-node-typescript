import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('pessoas - getById', () => {

  let cidadeId: number | undefined = undefined;
  beforeAll(async () => {
    const resCidade = await testServer
      .post('/cidades')
      .send({ nome: 'Teste' });

    cidadeId = resCidade.body;
  });

  it('Pegar registro por Id', async () => {
    const rest1 = await testServer.post('/pessoas').send({ nomeCompleto: 'Renan', email: 'renan@gmail.com', cidadeId });


    expect(rest1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer.get(`/pessoas/${rest1.body}`);

    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body).toHaveProperty('nomeCompleto');

  });

  it('Não deveria buscar um resgistro que não existe', async () => {
    const rest1 = await testServer.get('/pessoas/99999');


    expect(rest1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(rest1.body).toHaveProperty('errors.default');


  });


});