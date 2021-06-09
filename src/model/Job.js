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

    async update(updatedJob, jobId) {
        const db = await Database()

        await db.run(`UPDATE jobs SET
        name = "${updatedJob.name}",
        daily_hours = ${updatedJob["daily-hours"]},
        total_hours = ${updatedJob["total-hours"]},
        created_at = ${updatedJob.created_at},
        WHERE id = ${jobId}
        `) // Where aqui é muito importante e garante que somente o job com jobId seja updated.

        await db.close();
    },

    async delete(id) {
        const db = await Database()

        await db.run(`DELETE FROM jobs WHERE id = ${id}`) // Isso aqui apaga na tabela jobs, onde id for igual ao id passado.

        await db.close()
    },
    
    async create(newJob) {
        const db = await Database()

        await db.run(`INSERT INTO jobs (
            name,
            daily_hours,
            total_hours,
            created_at
        ) VALUES (
            "${newJob.name}",
            ${newJob["daily-hours"]},
            ${newJob["total-hours"]},
            ${newJob.created_at}
        )`)

        await db.close()
    }
}