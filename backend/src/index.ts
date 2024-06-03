import express from 'express';
import unidadeRoutes from './routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api/unidade', unidadeRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
