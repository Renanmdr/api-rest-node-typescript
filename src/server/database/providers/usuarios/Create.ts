import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IUsuario } from '../../models';
import { PasswordCrypto } from '../../../shared/services';

export const create = async (usuario: Omit<IUsuario, 'id'>): Promise<number | Error> => {
  try {
    const hashedPassword = await PasswordCrypto.hashPassword(usuario.senha);
    const [result] = await Knex(ETableNames.usuario).insert({ ...usuario, senha: hashedPassword }).returning('id');

    if (typeof result === 'object') {
      return result.id;
    } else if (result === 'number') {
      return result;
    }

    return new Error('O resultado retornado não possui um ID válido.');
  } catch (error) {
    console.log(error);
    return new Error('O resultado retornado não possui um ID válido.');
  }
}; 