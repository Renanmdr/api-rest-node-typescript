import { validation } from '../../shared/middlewares';
import * as yup from 'yup';
import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';

interface IParamProps {
  id?: number
}

interface IBodyProps {
  name: string
}

export const updateByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    name: yup.string().required().min(3)
  })),
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().required().integer().moreThan(0)
  })),

}));

export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {
  console.log(req.params);
  console.log(req.body);

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Não implementado');
};