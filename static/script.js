  });
}

function drawCharts(risk) {
  const pieCtx = document.getElementById('pieChart').getContext('2d');
  const barCtx = document.getElementById('barChart').getContext('2d');

  const safe = Math.max(0, 100 - risk);

  if (pieChart) pieChart.destroy();
  if (barChart) barChart.destroy();

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

function playSummary(lines) {
  if (!lines || !lines.length) return;
  const utter = new SpeechSynthesisUtterance(lines.join('. '));
  const lang = document.getElementById('lang').value || 'en';
  utter.lang = lang === 'hi' ? 'hi-IN' : (lang === 'te' ? 'te-IN' : 'en-US');
  speechSynthesis.speak(utter);
}
