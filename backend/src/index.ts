import express from 'express';
import unidadeRoutes from './unidadeRoutes';
import regiaoRoutes from './regiaoRoutes';
import municipioRoutes from './municipioRoutes';
import srRoutes from './srRoutes';
import ufRoutes from './ufRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para habilitar CORS - Cross-Origin Resource Sharing
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use('/api/unidade', unidadeRoutes);
app.use('/api/regiao', regiaoRoutes);
app.use('/api/municipio', municipioRoutes);
app.use('/api/sr', srRoutes);
app.use('/api/uf', ufRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
