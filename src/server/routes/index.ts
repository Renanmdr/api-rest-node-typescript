import { Router } from 'express';
//import { StatusCodes } from 'http-status-codes';
import { cidadesController, pessoasController, usuariosController } from '../controllers';
import { ensureAuthenticated } from '../shared/middlewares';

const router = Router();

router.get('/', (_, res) => {
  return res.send('Olá DEV!');
});

router.post('/cidades', ensureAuthenticated, cidadesController.createValidation, cidadesController.create);
router.get('/cidades', ensureAuthenticated, cidadesController.getAllValidation, cidadesController.getAll);
router.get('/cidades/:id', ensureAuthenticated, cidadesController.getByIdValidation, cidadesController.getById);
router.put('/cidades/:id', ensureAuthenticated, cidadesController.updateByIdValidation, cidadesController.updateById);
router.delete('/cidades/:id', ensureAuthenticated, cidadesController.deleteByIdValidation, cidadesController.deleteById);


router.post('/pessoas', ensureAuthenticated, pessoasController.createValidation, pessoasController.create);
router.get('/pessoas', ensureAuthenticated, pessoasController.getAllValidation, pessoasController.getAll);
router.get('/pessoas/:id', ensureAuthenticated, pessoasController.getByIdValidation, pessoasController.getById);
router.put('/pessoas/:id', ensureAuthenticated, pessoasController.updateByIdValidation, pessoasController.updateById);
router.delete('/pessoas/:id', ensureAuthenticated, pessoasController.deleteByIdValidation, pessoasController.deleteById);

router.post('/entrar', usuariosController.signInValidation, usuariosController.signIn);
router.post('/cadastrar', usuariosController.signUpValidation, usuariosController.signUp);

export { router };