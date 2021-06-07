// Aqui são as configurações para inicializar o banco de Dados (criar tabelas e etc, para ent poder usar). Os campos nos bancos de dados não podem ter nem espaço nem traço (-), somente underline (_).

const Database = require('config') // Importando o config do arquivo config.js

Database() // Aqui já inicia a conexão com o banco de dados.

// Tudo que vai aqui dentro em maiúsculo é código sql. Tudo em minúsculo é o nome dos campos da tabela.
Database.exec(`CREATE TABLE profile(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    avatar TEXT,
    monthly_budget INT,
    days_per_week INT,
    hours_per_day INT,
    vacation_per_year INT,
    value-vour INT
)`); // Aqui eu passo o comando sql e ela executado dentro do banco da dados.
Database.exec(`CREATE TABLE jobs(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    daily_hours INT,
    total_hours INT,
    created_at DATETIME,
)`);

Database.run(`INSERT INTO profile(
    name,
    avatar,
    monthly_budget,
    days_per_week,
    hours_per_day,
    vacation_per_year,
) VALUES(
    "Felps",
    "https://www.github.com/felpst.png",
    25000,
    5,
    5,
    4,
)`) // Coloque dentro da tabela profile. Inserir uma informaçao na tabela profile.
Database.run(`INSERT INTO jobs(
    name,
    daily_hours,
    
)`)

Database.close() // Aqui é onde estou fechando a conexão com o banco de dados.