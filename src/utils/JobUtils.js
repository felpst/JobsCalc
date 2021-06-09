module.exports = {
    remainingDays(job) {
        // calculo de tempo restante
        const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()
    
        const createdDate = new Date(job.created_at)
        const dueDay = createdDate.getDate() + Number(remainingDays) // getDate retorna o dia do mês, enquanto getDay retorna o dia da semana.
        const dueDateInMs = createdDate.setDate(dueDay) // setDate é uma funçao que pega uma data.
    
        const timeDiffInMs = dueDateInMs - Date.now()
        // transformar ms em dias
        const dayInMs = 1000 * 60 * 60 * 24
        const dayDiff = Math.ceil(timeDiffInMs / dayInMs) // Arredondando para baixo
    
        return dayDiff
    },
    calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
}