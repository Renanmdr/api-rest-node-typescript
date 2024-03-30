import { Router } from 'express';
//import { StatusCodes } from 'http-status-codes';
import { cidadesController, pessoasController } from '../controllers';

const router = Router();

router.get('/', (_, res) => {
  return res.send('Olá DEV!');
});

router.post('/cidades', cidadesController.createValidation, cidadesController.create);
router.get('/cidades', cidadesController.getAllValidation, cidadesController.getAll);
router.get('/cidades/:id', cidadesController.getByIdValidation, cidadesController.getById);
router.put('/cidades/:id', cidadesController.updateByIdValidation, cidadesController.updateById);
router.delete('/cidades/:id', cidadesController.deleteByIdValidation, cidadesController.deleteById);


router.post('/pessoas', pessoasController.createValidation, pessoasController.create);
router.get('/pessoas', pessoasController.getAllValidation, pessoasController.getAll);
router.get('/pessoas/:id', pessoasController.getByIdValidation, pessoasController.getById);
router.put('/pessoas/:id', pessoasController.updateByIdValidation, pessoasController.updateById);
router.delete('/pessoas/:id', pessoasController.deleteByIdValidation, pessoasController.deleteById);


export { router };