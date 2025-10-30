function drawCharts(risk) {
  const pieCtx = document.getElementById('pieChart').getContext('2d');
  const barCtx = document.getElementById('barChart').getContext('2d');

  const safe = Math.max(0, 100 - risk);

  // destroy old charts if already exist
  if (pieChart) pieChart.destroy();
  if (barChart) barChart.destroy();

  // PIE / DOUGHNUT CHART
  pieChart = new Chart(pieCtx, {
    type: 'doughnut',
    data: {
      labels: ['Risk', 'Safe'],
      datasets: [{
        data: [risk, safe],
        backgroundColor: ['#ff3b3b', '#00cc66'], // red for risk, green for safe
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });

  // BAR CHART
  barChart = new Chart(barCtx, {
    type: 'bar',
    data: {
      labels: ['Risk Level'],
      datasets: [{
        label: 'Risk %',
        data: [risk],
        backgroundColor: risk >= 70 ? '#ff3b3b' : (risk >= 30 ? '#ffcc00' : '#00cc66'), // dynamic color
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
