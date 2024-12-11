import React from 'react';
import { Bar } from 'react-chartjs-2'; // Importa o componente Bar de react-chartjs-2
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Registrar os componentes do Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const GraficoBarra = ({ turmas, texto, desperdicio, jo_nome }) => {
    // Defina os dados para o gráfico
    const data = {
        labels: turmas, // requer: ['Turma 1', 'Turma 2', 'Turma 3', 'Turma 4', 'Turma 5']  Labels para as barras // NOME DAS TURMAS LISTADAS COM MAIS DESPERDICIO NO ANO INTEIRO, USO DE MAP
        datasets: [
            {
                label: 'Desperdício (em kg)', // Título da série de dados
                data: desperdicio, // requer:  [2.5, 3.2, 1.8, 2.1, 5.8] Dados dos desperdícios dos alunos // 
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Cor de fundo das barras
                borderColor: 'rgba(75, 192, 192, 1)', // Cor da borda das barras
                borderWidth: 1, // Largura da borda das barras
            },
        ],
    };

    // Opções de configuração do gráfico
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `Desperdiçados - ${jo_nome}`, // Título do gráfico
            },
        },
    };
    if (turmas.length < 0) {
        console.log(turmas)
        return <h1>Não há jogadores</h1>
    } else {
        return (

            <div>

                <Bar data={data} options={options} />
            </div>
        );
    }
};

export default GraficoBarra;
