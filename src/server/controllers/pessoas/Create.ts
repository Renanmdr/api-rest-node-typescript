import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { IPessoa } from '../../database/models';
import { pessoasProvider } from '../../database/providers/pessoas';

interface IPropsBody extends Omit<IPessoa, 'id'> {


}

// interface IQuery {
//   page: number;

// }




export const createValidation = validation((getSchema) => ({
  body: getSchema<IPropsBody>(yup.object().shape({
    nomeCompleto: yup.string().required().min(3).max(150),
    email: yup.string().required().email(),
    cidadeId: yup.number().integer().required().moreThan(0)

  })),


}));




export const create = async (req: Request<{}, {}, IPropsBody>, res: Response) => {

  const result = await pessoasProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: { default: result.message } });
  }


  //result
  return res.status(StatusCodes.CREATED).json(result);
};