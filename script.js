document.addEventListener("DOMContentLoaded", function () {
    const foodForm = document.getElementById("food-form");
    const foodTableBody = document.querySelector("#food-table tbody");
    const totalCaloriesElement = document.getElementById("total-calories");
    const logoutButton = document.getElementById("logout-button");
    const ctx = document.getElementById("nutritionChart").getContext("2d");

    // Carregar dados do localStorage ou inicializar array vazio
    let foodData = JSON.parse(localStorage.getItem('foodData')) || [];
    
    // Inicializa o gráfico
    let nutritionChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: [],
            datasets: [{
                label: "Calorias Consumidas",
                backgroundColor: "#2c9c69",
                data: []
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { 
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Calorias'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Alimentos'
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    titleFont: {
                        size: 14
                    },
                    bodyFont: {
                        size: 13
                    }
                }
            }
        }
    });

    // Atualiza a tabela e o gráfico com os dados carregados
    updateTable();
    updateChart();
    updateTotalCalories();

    // Adiciona um novo alimento
    foodForm.addEventListener("submit", function (event) {
        event.preventDefault();

        let alimento = document.getElementById("alimento").value.trim();
        let quantidade = parseInt(document.getElementById("quantidade").value);
        let calorias = parseInt(document.getElementById("calorias").value);

        if (!alimento || isNaN(quantidade) || isNaN(calorias)) {
            alert("Por favor, preencha todos os campos corretamente");
            return;
        }

        // Adiciona ao array
        foodData.push({ 
            id: Date.now(), // ID único baseado no timestamp
            alimento, 
            quantidade, 
            calorias 
        });

        // Salva no localStorage
        localStorage.setItem('foodData', JSON.stringify(foodData));

        // Atualiza visualizações
        updateTable();
        updateChart();
        updateTotalCalories();

        // Limpa os campos
        foodForm.reset();
    });

    // Atualiza a tabela
    function updateTable() {
        foodTableBody.innerHTML = "";
        
        if (foodData.length === 0) {
            let row = foodTableBody.insertRow();
            row.innerHTML = `<td colspan="4" style="text-align: center;">Nenhum alimento registrado</td>`;
            return;
        }
        
        foodData.forEach((item) => {
            let row = foodTableBody.insertRow();
            row.innerHTML = `
                <td>${item.alimento}</td>
                <td>${item.quantidade}</td>
                <td>${item.calorias}</td>
                <td><button class="delete-btn" data-id="${item.id}">X</button></td>
            `;
        });
        
        // Adiciona event listeners para os botões de exclusão
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                deleteItem(id);
            });
        });
    }

    // Função para excluir um item
    function deleteItem(id) {
        foodData = foodData.filter(item => item.id !== id);
        localStorage.setItem('foodData', JSON.stringify(foodData));
        updateTable();
        updateChart();
        updateTotalCalories();
    }

    // Atualiza o gráfico
    function updateChart() {
        nutritionChart.data.labels = foodData.map(item => item.alimento);
        nutritionChart.data.datasets[0].data = foodData.map(item => item.calorias);
        nutritionChart.update();
    }
    
    // Atualiza o total de calorias
    function updateTotalCalories() {
        const total = foodData.reduce((sum, item) => sum + item.calorias, 0);
        totalCaloriesElement.textContent = total;
    }
    
    // Botão de logout
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }
});
