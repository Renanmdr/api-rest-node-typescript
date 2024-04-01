import { Request, Response } from 'express';
import { IUsuario } from '../../database/models';
import { validation } from '../../shared/middlewares';
import * as yup from 'yup';
import { usuariosProvider } from '../../database/providers/usuarios';
import { StatusCodes } from 'http-status-codes';



interface IPropsBody extends Omit<IUsuario, 'id'> { }


export const signUpValidation = validation((getSchema) => ({
  body: getSchema<IPropsBody>(yup.object().shape({
    nome: yup.string().required().min(3).max(150),
    email: yup.string().required().email().min(5).max(150),
    senha: yup.string().required().min(6)
  }))
}));


export const signUp = async (req: Request<{}, {}, IPropsBody>, res: Response) => {

  const result = await usuariosProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: { default: result.message } });
  }

  return res.status(StatusCodes.CREATED).json(result);
};