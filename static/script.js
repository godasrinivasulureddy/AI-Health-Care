function drawCharts(risk) {
  const pieCtx = document.getElementById('pieChart').getContext('2d');
  const barCtx = document.getElementById('barChart').getContext('2d');
  const safe = Math.max(0, 100 - risk);

  if (pieChart) pieChart.destroy();
  pieChart = new Chart(pieCtx, {
    type: 'doughnut',
    data: {
      labels: ['Risk', 'Safe'],
      datasets: [{
        data: [risk, safe],
        backgroundColor: ['#FF0000', '#00FF00'], // red & green
        borderColor: ['#FF0000', '#00FF00'],
        hoverBackgroundColor: ['#CC0000', '#009900'] // darker on hover
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { labels: { color: '#000' } }
      }
    }
  });

  if (barChart) barChart.destroy();
  barChart = new Chart(barCtx, {
    type: 'bar',
    data: {
      labels: ['Risk', 'Safe'],
      datasets: [{
        label: 'Health Risk Analysis',
        data: [risk, safe],
        backgroundColor: ['#FF0000', '#00FF00'], // red & green
        borderColor: ['#FF0000', '#00FF00'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: { color: '#000' }
        },
        x: {
          ticks: { color: '#000' }
        }
      },
      plugins: {
        legend: { labels: { color: '#000' } }
      }
    }
  });
}
