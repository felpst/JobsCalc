const express = require('express'); // Express é uma bibliotéca para criar o servidor
const routes = express.Router() // Router serve para criar os caminhos
const ProfileController = require('./controllers/ProfileController')
const JobController = require('./controllers/JobController')
const DashboardController = require('./controllers/DashboardController')

// const views = __dirname + '/views/' //dirname da o endereço absoluto do server.js, e o + concatena com o endereço do views. Renomiei a variável de basePath para views, para conter a rota para a pasta views que será usada pelo engine do ejs.

// req, res. Toda vez que o server pegar (get) uma / ele vai executar a função que tem os parâmetros req (qual é o pedido do usuário) e reponse (qual a resposta dada pelo servidor).
routes.get('/', DashboardController.index) 
routes.get('/job',JobController.create)
routes.post('/job', JobController.save)
routes.get('/job/:id', JobController.show) // De alguma forma eu to passando o id de um job desta forma. Como isto funciona?
routes.post('/job/:id', JobController.update)
routes.post('/job/delete/:id', JobController.delete)
routes.get('/profile', ProfileController.index) // Depois que eu pego a rota de uma file, eu posso passar para ela um objeto como segundo argumento.
routes.post('/profile', ProfileController.update)

module.exports = routes; // Isto aqui está exportando as rotas para fora deste arquivo.