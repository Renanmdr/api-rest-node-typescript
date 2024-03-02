import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('cidades - getById', () => {
  it('Pegar registro por Id', async () => {
    const rest1 = await testServer.post('/cidades').send({ nome: 'Bragança' });


    expect(rest1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer.get(`/cidades/${rest1.body}`);

    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body).toHaveProperty('nome');

  });

  it('Não deveria buscar um resgistro que não existe', async () => {
    const rest1 = await testServer.get('/cidades/99999');


    expect(rest1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(rest1.body).toHaveProperty('errors.default');


  });


});