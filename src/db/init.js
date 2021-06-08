// Aqui são as configurações para inicializar o banco de Dados (criar tabelas e etc, para ent poder usar). Os campos nos bancos de dados não podem ter nem espaço nem traço (-), somente underline (_).

const Database = require('./config') // Importando o config do arquivo config.js


// Todos os awaits precisam estar dentro de uma função async que basicamente diz para o JS que ele vai precisar aguardar (await) para as seguintes coisas acontecerem.
const initDb = { 
    async init() {

const db = await Database() // Aqui já inicia a conexão com o banco de dados. O await faz parte de um processo async / await, neste caso o await indica para o js aguardar de executar o database. Aqui eu estou guardando o resultado da execução do Database, e como eu vou usar futuramente, então eu estou guardando esse resultado em uma variável.

// Tudo que vai aqui dentro em maiúsculo é código sql. Tudo em minúsculo é o nome dos campos da tabela. O último item não precisa de uma virgula no final.
await db.exec(`CREATE TABLE profile (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    avatar TEXT,
    monthly_budget INT,
    days_per_week INT,
    hours_per_day INT,
    vacation_per_year INT,
    value_hour INT
)`); // Aqui eu passo o comando sql e ela executado dentro do banco da dados.
await db.exec(`CREATE TABLE jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    daily_hours INT,
    total_hours INT,
    created_at DATETIME
)`);

await db.run(`INSERT INTO profile (
    name,
    avatar,
    monthly_budget,
    days_per_week,
    hours_per_day,
    vacation_per_year,
    value_hour
) VALUES(
    "Felps",
    "https://www.github.com/felpst.png",
    25000,
    5,
    5,
    4,
    70
)`) // Coloque dentro da tabela profile. Inserir uma informaçao na tabela profile.
await db.run(`INSERT INTO jobs(
    name,
    daily_hours,
    total_hours,
    created_at
) VALUES (
    "Xuxu",
    2,
    1,
    1617714376018
)`)
await db.run(`INSERT INTO jobs(
    name,
    daily_hours,
    total_hours,
    created_at
) VALUES (
    "Batata",
    2,
    1,
    1617714376018
)`)

await db.close() // Aqui é onde estou fechando a conexão com o banco de dados.
    }
}

initDb.init();