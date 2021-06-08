const Database = require('../db/config')

let data = [
    {
        id: 1,
        name: "Batata",
        "daily-hours": 2,
        "total-hours": 60,
        created_at: Date.now(),
    },
    {
        id: 2,
        name: "Xuxu",
        "daily-hours": 3,
        "total-hours": 47,
        created_at: Date.now(), 
    },
];

module.exports = {
    async get() {
        const db = await Database()

        const jobs = await db.all(`SELECT * FROM jobs`) // .all é parecido com o .get, mas ao invés de retornar somente um elemento, ele vai retornar todos os elementos que se encaixarem com os parametros do pedido

        await db.close()

        return jobs.map(job => ({ //Como esta arrow function só tem o comando para return, eu posso retirar a palavra return e colocar todo o comando encapsulado pelas cochetes ({}) dentro de parenteses.
            id: job.id,
            name: job.name,
            "daily-hours": job.daily_hours,
            "total-hours": job.total_hours,
            created_at: job.created_at
            
        }));
    },

    update(newJob) {
        data = newJob;
    },

    delete(id) {
        data = data.filter(job => Number(job.id) !== Number(id));
    },
    
    create(newJob) {
        data.push(newJob);
    }
}