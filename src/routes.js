const express = require('express'); // Express é uma bibliotéca para criar o servidor
const routes = express.Router() // Router serve para criar os caminhos
const ProfileController = require('./controllers/ProfileController')
const Profile = require('./model/Profile')

// const views = __dirname + '/views/' //dirname da o endereço absoluto do server.js, e o + concatena com o endereço do views. Renomiei a variável de basePath para views, para conter a rota para a pasta views que será usada pelo engine do ejs.

// Parei no 52:26

const Job = { // Isto aqui é um Object Literal do Jobs
    data: [
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
    ],
    controllers: {
        index(req, res) {
            const updatedJobs = Job.data.map((job) =>{
                // ajustes no jobs
                const remaining = Job.services.remainingDays(job)
                const status = remaining <= 0 ? 'done' : 'progress'
        
                return {
                    ...job, // Isso aqui é o espalhamento, estou pegando tudo dentro do job e colocando aqui dentro
                    remaining,
                    status,
                    budget: Job.services.calculateBudget(job, Profile.get()["value-hour"])
                }
            }) // Isso funciona como o forEach (vai loopar dentro de todos os job dentro de jobs), só que vai retornar (consegue dar o return enquanto o forEach não) uma nova array no final do processo
        
            return res.render("index", { jobs: updatedJobs })
        },
        create(req, res) {
            return res.render("job")
        },
        save(req, res) {
            // req.body = {name: 'something', 'daily-hours': '3.1', 'total-hours': '3'}
            const lastId = Job.data[Job.data.length - 1]?.id || 0; // Caso ache a primeira parte, então pegar o id, mas se não achar então devolver 0.

            Job.data.push({
                id: lastId + 1, // id deste elemente é a id do anteiror a este + 1.
                name: req.body.name,
                "daily-hours": req.body["daily-hours"],
                "total-hours": req.body["total-hours"],
                created_at: Date.now() // Atribuindo a data de hoje
            })
            return res.redirect('/') // Estou redirecionando para o / que é o index
        },
        show(req, res) {
            
            const jobId = req.params.id // aqui eu estou pegando os parametros que eu estou mandando. Como?

            const job = Job.data.find(job => Number(job.id) === Number(jobId)) // Vai loopar por todos os jobs e quando achar um que faça função que está sendo passada retornar verdadeiro, então ele vai atribuir a variável job o objeto que achou.
            if(!job) {
                return res.render('Job not found!')
            }

            job.budget = Job.services.calculateBudget(job, Profile.get()["value-hour"])

            return res.render("job-edit", { job })
        },
        update(req, res) {
            const jobId = req.params.id // aqui eu estou pegando os parametros que eu estou mandando. Como?

            const job = Job.data.find(job => Number(job.id) === Number(jobId)) // Vai loopar por todos os jobs e quando achar um que faça função que está sendo passada retornar verdadeiro, então ele vai atribuir a variável job o objeto que achou.
            if(!job) {
                return res.render('Job not found!')
            }
            
            const updatedJob = {
                ...job,
                name: req.body.name,
                "total-hours": req.body["total-hours"],
                "daily-hours": req.body["daily-hours"],
            }

            Job.data = Job.data.map(job => {
                if (Number(job.id) === Number(jobId)) {
                    job = updatedJob
                }

                return job
            })

            res.redirect('/job/' + jobId)
        },
        delete(req, res) {
            const jobId = req.params.id

            Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId)) // Vai loopar por todos os elementos dentro da array,e vai retornar tudo que manter a função verdadeira, deixando os elementos que não manterem de fora. 

            return res.redirect('/')
        }
    },
    services: {
        remainingDays(job) {
            // calculo de tempo restante
            const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()
        
            const createdDate = new Date(job.created_at)
            const dueDay = createdDate.getDate() + Number(remainingDays) // getDate retorna o dia do mês, enquanto getDay retorna o dia da semana.
            const dueDateInMs = createdDate.setDate(dueDay) // setDate é uma funçao que pega uma data.
        
            const timeDiffInMs = dueDateInMs - Date.now()
            // transformar ms em dias
            const dayInMs = 1000 * 60 * 60 * 24
            const dayDiff = Math.floor(timeDiffInMs / dayInMs) // Arredondando para baixo
        
            return dayDiff
        },
        calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
    }
}


// req, res. Toda vez que o server pegar (get) uma / ele vai executar a função que tem os parâmetros req (qual é o pedido do usuário) e reponse (qual a resposta dada pelo servidor).
routes.get('/', Job.controllers.index) 
routes.get('/job',Job.controllers.create)
routes.post('/job', Job.controllers.save)
routes.get('/job/:id', Job.controllers.show) // De alguma forma eu to passando o id de um job desta forma. Como isto funciona?
routes.post('/job/:id', Job.controllers.update)
routes.post('/job/delete/:id', Job.controllers.delete)
routes.get('/profile', ProfileController.index) // Depois que eu pego a rota de uma file, eu posso passar para ela um objeto como segundo argumento.
routes.post('/profile', ProfileController.update)

module.exports = routes; // Isto aqui está exportando as rotas para fora deste arquivo.