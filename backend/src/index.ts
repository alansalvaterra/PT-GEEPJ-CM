import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/api/data', (req, res) => {
    fs.readFile('api.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo JSON:', err);
            res.status(500).json({ error: 'Erro ao ler o arquivo JSON' });
            return;
        }
        try {
            const jsonData = JSON.parse(data);
            res.json(jsonData);
        } catch (err) {
            console.error('Erro ao fazer o parsing do JSON:', err);
            res.status(500).json({ error: 'Erro ao fazer o parsing do JSON' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
