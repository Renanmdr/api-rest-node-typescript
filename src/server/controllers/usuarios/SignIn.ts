import { Request, Response } from 'express';
import { validation } from '../../shared/middlewares';
import * as yup from 'yup';
import { usuariosProvider } from '../../database/providers/usuarios';
import { IUsuario } from '../../database/models';
import { StatusCodes } from 'http-status-codes';



interface IParamsProps extends Omit<IUsuario, 'id' | 'nome'> {

}

export const signInValidation = validation((getSchema) => ({

  body: getSchema<IParamsProps>(yup.object().shape({
    email: yup.string().required().email().min(5),
    senha: yup.string().required().min(6)

  }))
}));

export const signIn = async (req: Request<{}, {}, IParamsProps>, res: Response) => {
  const { email, senha } = req.body;
  const result = await usuariosProvider.getByEmail(email);

  if (result instanceof Error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ errors: { default: 'Email ou senha são inválidos' } });
  }

  if (senha !== result.senha) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ errors: { default: 'Email ou senha são inválidos' } });
  } else {
    return res.status(StatusCodes.OK).json({ accessToken: 'teste.teste.teste' });

  }

};