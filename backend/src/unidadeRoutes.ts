import express, { Request, Response } from 'express';
import fs from 'fs';

const router = express.Router();

//Todas as unidades
router.get('/', (req: Request, res: Response) => {
    fs.readFile('./data-source/unidades.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao ler o arquivo.' });
            return;
        }
        res.json(JSON.parse(data));
    });
});

//Unidade por código
router.get('/:codigo_unidade', (req: Request, res: Response) => {
    const codigo_unidade = req.params.codigo_unidade;
    fs.readFile('./data-source/unidades.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao ler o arquivo.' });
            return;
        }
        const apiData = JSON.parse(data);
        const unidade = apiData.rows.find((u: any) => u.unidade === parseInt(codigo_unidade));
        if (unidade) {
            res.json(unidade);
        } else {
            res.status(404).json({ error: 'Unidade não encontrada.' });
        }
    });
});

//Unidades por código IBGE do município
router.get('/ibge/:codigo_ibge_municipio', (req: Request, res: Response) => {
    const codigo_ibge_municipio = req.params.codigo_ibge_municipio;
    fs.readFile('./data-source/unidades.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao ler o arquivo.' });
            return;
        }
        const apiData = JSON.parse(data);
        const unidades = apiData.rows.filter((u: any) => u.ibge === parseInt(codigo_ibge_municipio));
        if (unidades.length > 0) {
            res.json(unidades);
        } else {
            res.status(404).json({ error: 'Unidades não encontradas para o IBGE especificado.' });
        }
    });
});

//Unidades por por região
router.get('/regiao/:regiao', (req: Request, res: Response) => {
    const regiao = req.params.regiao;
    fs.readFile('./data-source/unidades.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao ler o arquivo.' });
            return;
        }
        const apiData = JSON.parse(data);
        const unidades = apiData.rows.filter((u: any) => u.regiao === regiao);
        if (unidades.length > 0) {
            res.json(unidades);
        } else {
            res.status(404).json({ error: 'Unidades não encontradas para a região especificada.' });
        }
    });
});

//Unidades por UF
router.get('/uf/:uf', (req: Request, res: Response) => {
    const uf = req.params.uf;
    fs.readFile('./data-source/unidades.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao ler o arquivo.' });
            return;
        }
        const apiData = JSON.parse(data);
        const unidades = apiData.rows.filter((u: any) => u.uf === uf);
        if (unidades.length > 0) {
            res.json(unidades);
        } else {
            res.status(404).json({ error: 'Unidades não encontradas para a UF especificada.' });
        }
    });
});

//Unidades por SR
router.get('/sr/:sr', (req: Request, res: Response) => {
    const sr = req.params.sr;
    fs.readFile('./data-source/unidades.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao ler o arquivo.' });
            return;
        }
        const apiData = JSON.parse(data);
        const unidades = apiData.rows.filter((u: any) => u.sr === parseInt(sr));
        if (unidades.length > 0) {
            res.json(unidades);
        } else {
            res.status(404).json({ error: 'Unidades não encontradas para a SR especificada.' });
        }
    });
});

export default router;
