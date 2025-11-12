import { Router } from "express";
const endpoints = Router();

import * as db from '../repository/relatarRepository.js';

endpoints.post('/relatar/', async (req, resp) => {
    try {
        let relatar = req.body;
        let id = await db.inserirRelatar(relatar);

        resp.send({
            novoId: id
        });
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

endpoints.get('/relatar/', async (req, resp) => {
    try {
        let relatar = await db.listarRelatar();
        resp.send(relatar);
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

endpoints.get('/relatar/agregados/', async (req, resp) => {
    try {
        let dados = await db.obterDadosAgregados();
        resp.send(dados);
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

endpoints.delete('/relatar/:id', async (req, resp) => {
    try {
        let id = req.params.id;
        let linhasAfetadas = await db.deletarRelatar(id);

        if (linhasAfetadas >= 1) {
            resp.send();
        }
        else {
            resp.status(404).send({ erro: 'Nenhum registro encontrado' });
        }
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

export default endpoints;
