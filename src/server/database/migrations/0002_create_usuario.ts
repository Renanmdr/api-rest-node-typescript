import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(Knex: Knex) {
  return Knex.schema.createTable(ETableNames.usuario, (table) => {
    table.bigIncrements('id').primary().index().notNullable();
    table.string('nome').notNullable().checkLength('>=', 3);
    table.string('email').index().unique().notNullable().checkLength('>=', 5);
    table.string('senha').notNullable().checkLength('>=', 6);


    table.comment('Tabela usada para armazenar usuários do sistema.');
  }).then(() => {
    console.log(`# Created table ${ETableNames.usuario}`);
  });

}


export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.usuario).then(() => {
    console.log(`Droped table ${ETableNames.usuario}`);
  });
}