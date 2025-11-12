import { Router } from "express";
const endpoints = Router();

import * as db from '../repository/localRepository.js';

endpoints.post('/local/', async (req, resp) => {
    try {
        let local = req.body;
        let id = await db.inserirLocal(local);

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

endpoints.get('/local/pendentes/', async (req, resp) => {
    try {
        let locais = await db.listarLocaisPendentes();
        resp.send(locais);
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

endpoints.get('/local/aprovados/', async (req, resp) => {
    try {
        let locais = await db.listarLocaisAprovados();
        resp.send(locais);
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

endpoints.put('/local/aprovar/:id', async (req, resp) => {
    try {
        let id = req.params.id;
        let sucesso = await db.aprovarLocal(id);

        if (sucesso) {
            resp.send({ mensagem: "Local aprovado com sucesso" });
        } else {
            resp.status(404).send({ erro: "Local não encontrado" });
        }
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

endpoints.delete('/local/:id', async (req, resp) => {
    try {
        let id = req.params.id;
        let sucesso = await db.deletarLocal(id);

        if (sucesso) {
            resp.send({ mensagem: "Local deletado com sucesso" });
        } else {
            resp.status(404).send({ erro: "Local não encontrado" });
        }
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

export default endpoints;
