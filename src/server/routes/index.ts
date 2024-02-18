import { Router } from 'express';
//import { StatusCodes } from 'http-status-codes';
import { cidadesController } from '../controllers';

const router = Router();

router.get('/', (_, res) => {
  return res.send('Olá DEV!');
});

router.post('/cidades', cidadesController.createQueryValidation, cidadesController.createBodyValidation, cidadesController.create);


export { router };