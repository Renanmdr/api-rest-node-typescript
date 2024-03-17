import { validation } from '../../shared/middlewares';
import * as yup from 'yup';
import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ICidade } from '../../database/models';
import { cidadesProvider } from '../../database/providers/cidades';

interface IParamProps {
  id?: number
}

interface IBodyProps extends Omit<ICidade, 'id'> {
  nome: string
}

export const updateByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    nome: yup.string().required().min(3)
  })),
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().required().integer().moreThan(0)
  })),

}));

export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {
  // if (Number(req.params.id) === 99999) {
  //   return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
  //     errors: {
  //       default: 'Registro não encontrado'
  //     }
  //   });
  // }
  // console.log(req.params);
  // console.log(req.body);
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: { default: 'O parâmetro "id" precisa ser informado.' } });
  }

  const result = await cidadesProvider.updateById(req.params.id, req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: { default: result.message } });
  }

  return res.status(StatusCodes.NO_CONTENT).json();
};