import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IPessoa } from '../../models';


export const updateById = async (id: number, pessoa: Omit<IPessoa, 'id'>): Promise<void | Error> => {
  try {

    const [{ count }] = await Knex(ETableNames.cidade).where('id', '=', pessoa.cidadeId).count<[{ count: number }]>('* as count');

    if (count == 0) {
      return new Error('A cidade usada no cadastro não foi encontrada');
    }

    const result = await Knex(ETableNames.pessoa).where('id', '=', id).update(pessoa);

    if (result > 0) return;

    return new Error('O resultado retornado não possui um ID válido.');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao atualizar o registro');
  }
};