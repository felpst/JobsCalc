const sqlite3 = require('sqlite3')
const { open } = require('sqlite') // Como eu só vou usar a funcionalidade open do sqlite (que não é o memo que o sqlite 3) eu posso indiciar para o JS que eu só quero a funcionalidade open do sqlite, usando { nomedafuncao }

module.exports = () => // O open precisa estar dentro de uma estrutura de funçao, e nao de objeto, por isso estou usando uma arrow function. Quando eu tenho só um item na arrow function eu não preciso encapsular em chaves ({}).
    open({
        filename: './database.sqlite', // nome do arquivo que está sendo usado para salvar as informações do banco de dados.
        driver: sqlite3.Database // O driver é quem trabalha com os dados (escreve e le) da file database.sqlite.
    }); // O open serve para eu abrir um conexão com o meu banco de dados.
