const express = require("express")
const server = express()
const routes = require("./routes") // Isto está pegando as rotas que estão no arquvio routes.js
const path = require("path")

// Usando template engine (ou view engine)
server.set('view engine', 'ejs') // Isto daqui é o motor que fará a leitura do código html. Estou usando o padrão de interpretação ejs, que me possibilita colocar código JS dentro do HTML

// Mudar a localização da pasta views
server.set('views', path.join(__dirname, 'views')) // estou configurando o path para a pasta views através do join __dirname com 'views' 

server.use(express.static("public")) // O use serve para você criar configurações no seu servidor. Neste caso ele está sendo usado para ditar como o servidor deve fazer as rotas (usando os arquivos do diretório público). Este use crie um Midware (O que é isso?)

// Usar o req.body
server.use(express.urlencoded({ extended: true }))

// Routes
server.use(routes) // Aqui o servidor está usando as rodas pegas acima do arquivo routes.js

server.listen(3000, () => console.log('rodando')) 