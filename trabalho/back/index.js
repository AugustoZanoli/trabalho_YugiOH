const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

// Funções auxiliares
const readJSONFile = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf8'));
const writeJSONFile = (filePath, data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

// Conexão com banco de dados
const bdPath = path.join(__dirname, 'db', 'favoritos.json');
let favoritos;

try {
    favoritos = readJSONFile(bdPath);
} catch (error) {
    console.error('Erro ao ler o arquivo favoritos.json:', error);
    favoritos = [];
}

// Ligar o servidor
const app = express();

// Middleware para parsear o corpo da requisição
app.use(express.json());

// Liberar rota cors
app.use(cors());

// Rota para buscar os favoritos
app.get('/favoritos', (req, res) => {
    res.status(200).json(favoritos);
});

// Função de rota para favoritar
function favoritar(req, res) {
    try {
        const { name, type, image } = req.body;
        
        const addFav = { id: favoritos.length + 1, name, type, image };
        favoritos.push(addFav);
        writeJSONFile(bdPath, favoritos);

        res.status(200).send('Favoritado com sucesso');
    } catch (error) {
        console.error('Erro ao favoritar:', error);
        res.status(500).send('Erro ao processar a requisição');
    }
}

// Rota favorite
app.post('/favoritar', favoritar);

app.listen(3000, () => {
    console.log('Servidor ligado!');
});
