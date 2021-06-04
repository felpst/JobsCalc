let data = { // Antigamente aqui era uma const, mas como implementei a função de update, tive que mudar para um let para permitir alteração na variável.
    name: "Felps",
    avatar: "https://www.github.com/felpst.png",
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-year": 4,
    "value-hour": 75
};

module.exports = { // Isso aqui foi feito para possibilitar uma melhro organização do projeto futuramente.
    get() {
        return data;
    },
    update(newData) {
        data = newData;
    }
}