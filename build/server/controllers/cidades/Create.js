"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const create = (req, res) => {
    const data = req.body;
    console.log(data);
    return res.send('Create');
};
exports.create = create;
