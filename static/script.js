function drawCharts(risk) {
  const pieCtx = document.getElementById('pieChart').getContext('2d');
  const barCtx = document.getElementById('barChart').getContext('2d');

  const safe = Math.max(0, 100 - risk);

  // Destroy old charts if they exist
  if (pieChart) pieChart.destroy();
  if (barChart) barChart.destroy();

  // PIE CHART (red = risk, green = safe)
  pieChart = new Chart(pieCtx, {
    type: 'doughnut',
    data: {
      labels: ['Risk', 'Safe'],
      datasets: [{
        data: [risk, safe],
        backgroundColor: ['#FF0000', '#00FF00'],
        borderColor: ['#FF0000', '#00FF00'],
        borderWidth: 1
      }]
    },
    options: { responsive: true }
  });

  // BAR CHART (red = risk, green = safe)
  barChart = new Chart(barCtx, {
    type: 'bar',
    data: {
      labels: ['Risk', 'Safe'],
      datasets: [{
        label: 'Health Risk Analysis (%)',
        data: [risk, safe],
        backgroundColor: ['#FF0000', '#00FF00'],
        borderColor: ['#FF0000', '#00FF00'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true, max: 100 }
      }
    }
  });
}
