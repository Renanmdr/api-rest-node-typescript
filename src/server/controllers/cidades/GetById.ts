import { Response, Request } from 'express';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { validation } from '../../shared/middlewares';

interface IParamProps {
  id?: number;
}

export const getByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().required().integer().moreThan(0)
  }))
}));

export const getById = async (req: Request<IParamProps>, res: Response) => {
  console.log(req.params);

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('não implementado');

};
