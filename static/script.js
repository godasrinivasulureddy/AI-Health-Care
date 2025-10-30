function drawCharts(risk) {
  const pieCtx = document.getElementById('pieChart').getContext('2d');
  const barCtx = document.getElementById('barChart').getContext('2d');

  const safe = Math.max(0, 100 - risk);

  // PIE CHART (Red for risk, Green for safe)
  if (pieChart) pieChart.destroy();
  pieChart = new Chart(pieCtx, {
    type: 'doughnut',
    data: {
      labels: ['Risk', 'Safe'],
      datasets: [{
        data: [risk, safe],
        backgroundColor: ['#FF0000', '#00FF00'], // red & green
        borderColor: ['#FF0000', '#00FF00'],
        borderWidth: 1
      }]
    },
    options: { responsive: true }
  });

  // BAR CHART (Red for risk, Green for safe)
  if (barChart) barChart.destroy();
  barChart = new Chart(barCtx, {
    type: 'bar',
    data: {
      labels: ['Risk', 'Safe'],
      datasets: [{
        label: 'Health Risk Analysis (%)',
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
          max: 100
        }
      }
    }
  });
}
