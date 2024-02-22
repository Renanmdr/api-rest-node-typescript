import { validation } from '../../shared/middlewares';
import * as yup from 'yup';
import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';

interface IParamProps {
  id?: number
}



export const deleteByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().required().integer().moreThan(0)
  })),

}));

export const deleteById = async (req: Request<IParamProps>, res: Response) => {
  console.log(req.params);

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Não implementado');
};