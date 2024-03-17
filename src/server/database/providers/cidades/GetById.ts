import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ICidade } from '../../models';

export const getById = async (id: number): Promise<ICidade | Error> => {
  try {
    const result = await Knex(ETableNames.cidade).select('*').where('id', '=', id).first();

    if (result) return result;

    return new Error('O resultado retornado não possui um ID válido.');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    return new Error(`Erro ao cadastrar o registro: ${error.message}`);
  }
};
