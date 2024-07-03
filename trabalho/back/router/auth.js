//importar libs externas
const express = require('express'); //npm i express

//O router permite separar nosso servidor em rotas
const router = express.Router();

//autenticacao e cryp
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//libs para banco de dados
const fs = require('fs');
const path = require('path');

//Conexao com banco de dados
const bdPath = path.join(__dirname,'..','db','banco-dados-usuario.json');
const usuariosCadastrados = JSON.parse(fs.readFileSync(bdPath, {encoding: 'utf-8'}));

//Importars modelo de usuário
const User = require('../models/user');

//dotenv
require('dotenv').config();

//requisição POST para autenticar usuário.
//rota pública
router.post('/login', async (req,res) => {

    //extraindo os dados do formulário para criacao do usuario
    const {email, password} = req.body; 

    //verifica se existe usuario com email       
    for (let user of usuariosCadastrados){
        if(user.email === email){
            //usuario existe.  Agora é verificar a senha
            const passwordValidado = await bcrypt.compare(password, user.password);
            if(passwordValidado===true){
                //Usuario foi autenticado.
                //Agora vamos retornar um token de acesso
                //para isso usamos jwt
                //O primeiro parametro é o que queremos serializar (o proprio user)
                //O segundo parametro é a chave secreta do token. Está no arquivo .env
                //La coloquei as instruções de como gerar
                const tokenAcesso = jwt.sign(user,process.env.TOKEN);
                return res.status(200).json(tokenAcesso);
            }
            else
                return res.status(422).send(`Usuario ou senhas incorretas.`);
        }   
    }
    //Nesse ponto não existe usuario com email informado.
    return res.status(409).send(`Usuario com email ${email} não existe. Considere criar uma conta!`);

})

//requisição POST para cadastrar usuário.
//rota pública
router.post('/create', async (req,res) => {
    //extraindo os dados do formulário para criacao do usuario
    const {username, email, password} = req.body; 
    //Para facilitar já estamos considerando as validações feitas no front
    //agora vamos verificar se já existe usuário com esse e-mail
    
    //verifica se já existe usuario com o email informado
    for (let users of usuariosCadastrados){
        if(users.email === email){
            //usuario já existe. Impossivel criar outro
            //Retornando o erro 409 para indicar conflito
            return res.status(409).send(`Usuario com email ${email} já existe.`);
        }   
    }
    //Deu certo. Vamos colocar o usuário no "banco"
    //Gerar um id incremental baseado na qt de users
    const id = usuariosCadastrados.length + 1;
    
    //gerar uma senha cryptografada
    const salt = await bcrypt.genSalt(10);
    const passwordCrypt = await bcrypt.hash(password,salt);

    //Criacao do user
    const user = new User(id, username, email, passwordCrypt);

    //Salva user no "banco"
    usuariosCadastrados.push(user);
    fs.writeFileSync(bdPath,JSON.stringify(usuariosCadastrados,null,2));
    res.send(`Tudo certo usuario criado com sucesso. id=${id}`);
});

module.exports = router;

//Gerando token de acesso secreto com node
//require('crypto').randomBytes(64).toString('hex');
//TOKEN
//importanto observar que, em um caso real, esse arquivo .env não é enviado para o repositório.
