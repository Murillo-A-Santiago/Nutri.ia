document.addEventListener("DOMContentLoaded", function () {
    const foodForm = document.getElementById("food-form");
    const foodTableBody = document.querySelector("#food-table tbody");
    const ctx = document.getElementById("nutritionChart").getContext("2d");

    let foodData = [];

    // Inicializa o gráfico
    let nutritionChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: [],
            datasets: [{
                label: "Calorias Consumidas",
                backgroundColor: "#2ecc71",
                data: []
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    // Adiciona um novo alimento
    foodForm.addEventListener("submit", function (event) {
        event.preventDefault();

        let alimento = document.getElementById("alimento").value;
        let quantidade = document.getElementById("quantidade").value;
        let calorias = document.getElementById("calorias").value;

        // Adiciona ao array
        foodData.push({ alimento, quantidade, calorias });

        // Atualiza tabela
        updateTable();
        updateChart();

        // Limpa os campos
        foodForm.reset();
    });

    // Atualiza a tabela
    function updateTable() {
        foodTableBody.innerHTML = "";
        foodData.forEach((item, index) => {
            let row = foodTableBody.insertRow();
            row.innerHTML = `<td>${item.alimento}</td><td>${item.quantidade}</td><td>${item.calorias}</td>`;
        });
    }

    // Atualiza o gráfico
    function updateChart() {
        nutritionChart.data.labels = foodData.map(item => item.alimento);
        nutritionChart.data.datasets[0].data = foodData.map(item => item.calorias);
        nutritionChart.update();
    }
});
