import { Knex } from 'knex';

import { ETableNames } from '../ETableNames';


export const seed = async (knex: Knex) => {
  const [{ count }] = await knex(ETableNames.cidade).count<[{ count: number }]>('* as count');
  if (!Number.isInteger(count) || Number(count) > 0) return;

  const cidadesToInsert = cidadesDoEspiritoSanto.map(nomeDaCidade => ({ nome: nomeDaCidade }));
  await knex(ETableNames.cidade).insert(cidadesToInsert);

};



const cidadesDoEspiritoSanto = [
  'Afonso Cláudio',
  'Água Doce do Norte',
  'Águia Branca',
  'Alegre',
  'Alfredo Chaves',
  'Alto Rio Novo',
  'Anchieta',
  'Apiacá',
  'Aracruz',
  'Atilio Vivacqua',
  'Baixo Guandu',
  'Barra de São Francisco',
  'Boa Esperança',
  'Bom Jesus do Norte',
  'Brejetuba',
  'Cachoeiro de Itapemirim',
  'Cariacica',
  'Castelo',
  'Colatina',
  'Conceição da Barra',
  'Conceição do Castelo',
  'Divino de São Lourenço',
  'Domingos Martins',
  'Dores do Rio Preto',
  'Ecoporanga',
  'Fundão',
  'Governador Lindenberg',
  'Guaçuí',
  'Guarapari',
  'Ibatiba',
  'Ibiraçu',
  'Ibitirama',
  'Iconha',
  'Irupi',
  'Itaguaçu',
  'Itapemirim',
  'Itarana',
  'Iúna',
  'Jaguaré',
  'Jerônimo Monteiro',
  'João Neiva',
  'Laranja da Terra',
  'Linhares',
  'Mantenópolis',
  'Marataizes',
  'Marechal Floriano',
  'Marilândia',
  'Mimoso do Sul',
  'Montanha',
  'Mucurici',
  'Muniz Freire',
  'Muqui',
  'Nova Venécia',
  'Pancas',
  'Pedro Canário',
  'Pinheiros',
  'Piúma',
  'Ponto Belo',
  'Presidente Kennedy',
  'Rio Bananal',
  'Rio Novo do Sul',
  'Santa Leopoldina',
  'Santa Maria de Jetibá',
  'Santa Teresa',
  'São Domingos do Norte',
  'São Gabriel da Palha',
  'São José do Calçado',
  'São Mateus',
  'São Roque do Canaã',
  'Serra',
  'Sooretama',
  'Vargem Alta',
  'Venda Nova do Imigrante',
  'Viana',
  'Vila Pavão',
  'Vila Valério',
  'Vila Velha',
  'Vitória'
];


