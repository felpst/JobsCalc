const express = require('express'); // Express é uma bibliotéca para criar o servidor
const routes = express.Router() // Router serve para criar os caminhos

const views = __dirname + '/views/' //dirname da o endereço absoluto do server.js, e o + concatena com o endereço do views. Renomiei a variável de basePath para views, para conter a rota para a pasta views que será usada pelo engine do ejs.

const profile = {
    name: "Felps",
    avatar: "https://avatars.githubusercontent.com/u/61332644?v=4",
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-year": 4
}

// req, res. Toda vez que o server pegar (get) uma / ele vai executar a função que tem os parâmetros req (qual é o pedido do usuário) e reponse (qual a resposta dada pelo servidor).
routes.get('/', (req, res) => res.render(views + "index")) 
routes.get('/job', (req, res) => res.render(views + "job"))
routes.get('/job/edit', (req, res) => res.render(views + "job-edit"))
routes.get('/profile', (req, res) => res.render(views + "profile", { profile}))

module.exports = routes; // Isto aqui está exportando as rotas para fora deste arquivo.