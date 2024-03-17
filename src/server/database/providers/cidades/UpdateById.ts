import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ICidade } from '../../models';


export const updateById = async (id: number, cidade: Omit<ICidade, 'id'>): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.cidade).where('id', '=', id).update(cidade);

    if (result > 0) return;

    return new Error('O resultado retornado não possui um ID válido.');
  } catch (error) {
    return new Error('Erro ao atualizar o registro');
  }
};