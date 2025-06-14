const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const tasksRoutes = require('./routes/tasksRoutes.js');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());

mongoose.connect('mongodb://localhost:27017/mytodolist', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado ao MongoDB!');
}).catch(err => {
    console.log('Erro ao conectar ao MongoDB:', err);
});

app.use('/api/task', tasksRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});