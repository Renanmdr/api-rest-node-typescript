import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IUsuario } from '../../models';


export const getByEmail = async (email: string): Promise<IUsuario | Error> => {
  try {
    const result = await Knex(ETableNames.usuario).select('*').where('email', '=', email).first();

    if (result) return result;

    return new Error('O resultado retornado não possui um ID válido.');
  } catch (error) {
    console.log(error);
    return new Error('O resultado retornado não possui um ID válido.');
  }
};