const Profile = require('../model/Profile')

module.exports = { // O exports faz que tudo dentro seja exportável.
    index(req, res) {
        return res.render("profile", { profile: Profile.get()}) // Antes aqui estava com Profile.data. Essa mundanca foi feita pensando na organização e aplicação futura.
    },
    update(req, res) {
        // re.body para pegar os dados da requisição
        const data = req.body

        // definir quantas semanas tem em um ano: 52
        const weeksPerYear = 52

        // remover as semanas de férias do ano, para pegar quantas semanas tem em um mês
        const weeksWorkingPerMonth = (weeksPerYear - data["vacation-per-year"])/12

        // quantas horas por semana estou trabalhando
        const hoursWorkingPerWeek = data["hours-per-day"] * data["days-per-week"]

        // total de horas trabalhadas no mês
        const monthlyWorkedHours = hoursWorkingPerWeek * weeksWorkingPerMonth

        // Qual será o valor da minha hora
        const valueHour = data["value-hour"] = data["monthly-budget"] / monthlyWorkedHours

        Profile.update({ // Aqui antes ficava Profile.data
            ...Profile.get(), // Spread (...), aqui antes era Profile.data
            ...req.body,
            "value-hour": valueHour
        })

        return res.redirect('/profile')
    }
}