import express, { Request, Response } from 'express';
import fs from 'fs';

const router = express.Router();

//Todas as UF
router.get('/', (req: Request, res: Response) => {
    fs.readFile('./data-source/uf.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao ler o arquivo.' });
            return;
        }
        res.json(JSON.parse(data));
    });
});

export default router;
