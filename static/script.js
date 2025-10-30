function drawCharts(risk) {
  const pieCtx = document.getElementById('pieChart').getContext('2d');
  const barCtx = document.getElementById('barChart').getContext('2d');
  const safe = Math.max(0, 100 - risk);

  // keep previous color tones — pinkish red & blue
  const riskColor = '#e91e63'; // same as current pink/red
  const safeColor = '#2196f3'; // same as current blue

  if (pieChart) pieChart.destroy();
  pieChart = new Chart(pieCtx, {
    type: 'doughnut',
    data: {
      labels: ['Risk', 'Safe'],
      datasets: [{
        data: [risk, safe],
        backgroundColor: [riskColor, safeColor],
        borderColor: [riskColor, safeColor],
        hoverBackgroundColor: ['#c2185b', '#1976d2'] // slightly darker hover
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
        backgroundColor: [riskColor, safeColor],
        borderColor: [riskColor, safeColor],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true, max: 100, ticks: { color: '#000' } },
        x: { ticks: { color: '#000' } }
      },
      plugins: {
        legend: { labels: { color: '#000' } }
      }
    }
  });
}
