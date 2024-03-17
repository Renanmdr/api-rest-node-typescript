import { validation } from '../../shared/middlewares';
import * as yup from 'yup';
import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { cidadesProvider } from '../../database/providers/cidades';

interface IParamProps {
  id?: number
}



export const deleteByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().required().integer().moreThan(0)
  })),

}));

export const deleteById = async (req: Request<IParamProps>, res: Response) => {

  // if (Number(req.params.id) === 99999) {
  //   return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: { default: 'Registro não encontrado' } });
  // }


  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O parâmetro "id" precisa ser informado.'
      }
    });
  }

  const result = await cidadesProvider.deleteById(req.params.id);
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }


  return res.status(StatusCodes.NO_CONTENT).json();
};