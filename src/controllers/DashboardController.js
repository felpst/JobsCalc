const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
    index(req, res) {
        const jobs = Job.get(); // O jobs e a porifle são variaveis que eu estou criando aqui, não importando, e por isso elas começam com uma letra minúscula.
        const profile = Profile.get();

        let statusCounter = {
            progress: 0,
            done: 0,
            total: jobs.length,
        }

        // Total de horas por dia de cada Job em progresso.
        let jobTotalHours = 0;
    
        const updatedJobs = jobs.map((job) =>{
            // ajustes no jobs
            const remaining = JobUtils.remainingDays(job)
            const status = remaining <= 0 ? "done" : "progress";

            // Somando a quantidade de status (status vai ser usado como a chave por referência)
            statusCounter[status] += 1;

            jobTotalHours = status == 'progress' ? jobTotalHours += Number(job['daily-hours']) : jobTotalHours;
    
            return {
                ...job, // Isso aqui é o espalhamento, estou pegando tudo dentro do job e colocando aqui dentro (spread)
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile["value-hour"])
            }
        }) // Isso funciona como o forEach (vai loopar dentro de todos os job dentro de jobs), só que vai retornar (consegue dar o return enquanto o forEach não) uma nova array no final do processo

        // qtd de horas que quero trabalhar dia (profile)
        // Menos
        // quantidade de horas/dia de cada job em progress
        const freeHours = profile["hours-per-day"] - jobTotalHours;
        
        return res.render("index", { jobs: updatedJobs, profile: profile, status: statusCounter, freeHours: freeHours })
    },
};
