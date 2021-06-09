const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
    create(req, res) {
        return res.render("job")
    },

    async save(req, res) {
        //const jobs = await Job.get()
        // req.body = {name: 'something', 'daily-hours': '3.1', 'total-hours': '3'}
        //const lastId = jobs[jobs.length - 1]?.id || 0; // Caso ache a primeira parte, então pegar o id, mas se não achar então devolver 0.
        // Tirei a criaçao da ID pois ela é criada automaticamente pelo DB

        await Job.create({
            //id: lastId + 1, // id deste elemente é a id do anteiror a este + 1.
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"],
            created_at: Date.now() // Atribuindo a data de hoje
        });
        
        return res.redirect('/') // Estou redirecionando para o / que é o index
    },

    async show(req, res) {
        const jobs = await Job.get()
        const profile = await Profile.get()

        const jobId = req.params.id // aqui eu estou pegando os parametros que eu estou mandando.

        const job = jobs.find(job => Number(job.id) === Number(jobId)) // Vai loopar por todos os jobs e quando achar um que faça função que está sendo passada retornar verdadeiro, então ele vai atribuir a variável job o objeto que achou.
        if(!job) {
            return res.render('Job not found!')
        }

        job.budget = JobUtils.calculateBudget(job, profile["value-hour"])

        return res.render("job-edit", { job })
    },

    async update(req, res) {
        //jobs = await Job.get()

        const jobId = req.params.id // aqui eu estou pegando os parametros que eu estou mandando. Como?

        //const job = jobs.find(job => Number(job.id) === Number(jobId)) // Vai loopar por todos os jobs e quando achar um que faça função que está sendo passada retornar verdadeiro, então ele vai atribuir a variável job o objeto que achou.
        //if(!job) {
        //    return res.render('Job not found!')
        //}
        
        const updatedJob = {
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"],
        }

        //const newJobs = jobs.map(job => {
        //    if (Number(job.id) === Number(jobId)) {
        //        job = updatedJob
        //    }

        //    return job
        //})

        await Job.update(updatedJob, jobId) // Updating a data do job através da função update.

        res.redirect('/job/' + jobId)
    },
    
    async delete(req, res) {
        const jobId = req.params.id

        await Job.delete(jobId)

        return res.redirect('/')
    }
};