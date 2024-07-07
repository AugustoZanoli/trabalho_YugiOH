
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
        favoritos.push(addFav); // Adiciona nosso objeto no bd
        writeJSONFile(bdPath, favoritos);

        res.status(200).send('Favoritado com sucesso');
    } catch (error) {
        console.error('Erro ao favoritar:', error);
        res.status(500).send('Erro ao processar a requisição');
    }
}

// Rota favorite
app.post('/favoritar', favoritar);

// Rota para remover favoritos
app.delete('/favoritar/:id', (req, res) => {
    const { id } = req.params;

    const index = favoritos.findIndex(fav => fav.id === parseInt(id));
    if (index !== -1) {
        favoritos.splice(index, 1); // Remove o item do array
        writeJSONFile(bdPath, favoritos); // Atualiza o arquivo JSON
        res.status(200).send('Removido com sucesso');
    } else {
        res.status(404).send('Favorito não encontrado');
    }
});

function atualizarCarta(req, res) {
    try {
        const { id } = req.params;
        const { name, type, image, avaliacao } = req.body;

        const index = favoritos.findIndex(fav => fav.id === parseInt(id));
        if (index !== -1) {
            // Atualiza os campos do card, mantendo os valores atuais se não forem fornecidos novos valores
            favoritos[index] = { 
                id: parseInt(id), 
                name: name || favoritos[index].name, 
                type: type || favoritos[index].type, 
                image: image || favoritos[index].image, 
                avaliacao: avaliacao || favoritos[index].avaliacao 
            };
            writeJSONFile(bdPath, favoritos); // Atualiza o arquivo JSON
            res.status(200).send('Carta atualizada com sucesso');
        } else {
            res.status(404).send('Carta não encontrada');
        }
    } catch (error) {
        console.error('Erro ao atualizar a carta:', error);
        res.status(500).send('Erro ao processar a requisição');
    }
}

app.put('/favoritar/:id', atualizarCarta);

//importar rotas autenticacao
const authRoutes = require('./router/auth');

//rotas para os dois serviços
app.use('/auth', authRoutes);


app.listen(3000, () => {
    console.log('Servidor ligado!');
});
