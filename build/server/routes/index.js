"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
//import { StatusCodes } from 'http-status-codes';
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', (_, res) => {
    return res.send('Olá DEV!');
});
router.post('/cidades', controllers_1.cidadesController.createValidation, controllers_1.cidadesController.create);
router.get('/cidades', controllers_1.cidadesController.getAllValidation, controllers_1.cidadesController.getAll);
router.get('/cidades/:id', controllers_1.cidadesController.getByIdValidation, controllers_1.cidadesController.getById);
router.put('/cidades/:id', controllers_1.cidadesController.updateByIdValidation, controllers_1.cidadesController.updateById);
router.delete('/cidades/:id', controllers_1.cidadesController.deleteByIdValidation, controllers_1.cidadesController.deleteById);
