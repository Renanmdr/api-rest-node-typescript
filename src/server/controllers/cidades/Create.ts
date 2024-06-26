import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { ICidade } from '../../database/models';
import { cidadesProvider } from '../../database/providers/cidades';

interface IPropsBody extends Omit<ICidade, 'id'> {


}

// interface IQuery {
//   page: number;

// }




export const createValidation = validation((getSchema) => ({
  body: getSchema<IPropsBody>(yup.object().shape({
    nome: yup.string().required().min(3).max(150),

  })),


}));




export const create = async (req: Request<{}, {}, IPropsBody>, res: Response) => {

  const result = await cidadesProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: { default: result.message } });
  }



  return res.status(StatusCodes.CREATED).json(result);
};