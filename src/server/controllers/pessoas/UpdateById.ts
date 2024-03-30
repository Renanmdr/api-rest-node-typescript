import { validation } from '../../shared/middlewares';
import * as yup from 'yup';
import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IPessoa } from '../../database/models';
import { pessoasProvider } from '../../database/providers/pessoas';

interface IParamProps {
  id?: number
}

interface IBodyProps extends Omit<IPessoa, 'id'> {

}

export const updateByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    nomeCompleto: yup.string().required().min(3),
    email: yup.string().required().email(),
    cidadeId: yup.number().integer().required().moreThan(0)
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

  const result = await pessoasProvider.updateById(req.params.id, req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: { default: result.message } });
  }

  return res.status(StatusCodes.NO_CONTENT).json();
};