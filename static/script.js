const voiceBtn = document.getElementById('voiceBtn');
const submitBtn = document.getElementById('submitBtn');
const usertext = document.getElementById('usertext');
const langSel = document.getElementById('lang');
const resultsSection = document.getElementById('results');
const diseaseLabel = document.getElementById('diseaseLabel');
const riskBadge = document.getElementById('riskBadge');
const basicSymptoms = document.getElementById('basicSymptoms');
const analysisSummary = document.getElementById('analysisSummary');
const foodRec = document.getElementById('foodRec');
const doctorSection = document.getElementById('doctorSection');
const riskExplanation = document.getElementById('riskExplanation');

let pieChart, barChart;

// Voice input using Web Speech API
voiceBtn.addEventListener('click', () => {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    alert('Voice input not supported in this browser.');
    return;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const rec = new SpeechRecognition();
  rec.lang = langSel.value || 'en-US';
  rec.interimResults = false;
  rec.maxAlternatives = 1;

  rec.start();
  voiceBtn.textContent = 'Listening...';

  rec.onresult = (e) => {
    const text = e.results[0][0].transcript;
    usertext.value = text;
  };

  rec.onerror = (e) => {
    console.log(e);
    alert('Voice error: ' + e.error);
  };

  rec.onend = () => {
    voiceBtn.textContent = '🎤 Voice Input';
  };
});

submitBtn.addEventListener('click', async () => {
  const text = usertext.value.trim();
  if (!text) {
    alert('Please enter symptoms or use voice input.');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Analyzing...';

  try {
    const resp = await fetch('/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, lang: langSel.value })
    });

    const data = await resp.json();
    showResults(data);
  } catch (e) {
    alert('Analysis error: ' + e.message);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Analyze Health';
  }
});

function showResults(data) {
  resultsSection.style.display = 'block';
  diseaseLabel.textContent = data.disease_local || data.disease;
  riskBadge.textContent = `Risk: ${data.risk}%`;

  // Basic Symptoms
  basicSymptoms.innerHTML = '';
  if (data.factors && data.factors.length) {
    data.factors.forEach(f => {
      const li = document.createElement('li');
      li.textContent = f;
      basicSymptoms.appendChild(li);
    });
  } else {
    basicSymptoms.innerHTML = '<li>No specific symptoms found from input.</li>';
  }

  // Analysis Summary
  analysisSummary.innerHTML = '';
  (data.summary_local || data.summary).forEach(s => {
    const li = document.createElement('li');
    li.textContent = s;
    analysisSummary.appendChild(li);
  });

  // Food Recommendations
  foodRec.innerHTML = '';
  (data.food_local || data.food).forEach(f => {
    const li = document.createElement('li');
    li.textContent = f;
    foodRec.appendChild(li);
  });

  // Doctor Section
  if (data.doctor && data.doctor.recommend) {
    doctorSection.innerHTML = `
      <div class="card">
        <strong>Doctor Consultation Recommended</strong>
        <p>Specialist: ${data.doctor.specialist}</p>
        <p>${data.doctor.note}</p>
      </div>
    `;
  } else {
    doctorSection.innerHTML = `
      <div class="card">
        <strong>No immediate specialist recommended. Visit GP if needed.</strong>
      </div>
    `;
  }

  // Charts
  drawCharts(data.risk);

  // Risk Explanation
  riskExplanation.innerHTML = `
    <p>Risk Explanation: Based on keywords & symptoms detected. This is educational only.</p>
  `;

  // Voice Summary
  playSummary(data.summary_local || data.summary);
}

// ✅ only this function modified to add colors
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
        backgroundColor: ['#FF0000', '#00FF00'] // 🔴 Risk = Red, 🟢 Safe = Green
      }]
    },
    options: { responsive: true }
  });

  if (barChart) barChart.destroy();
  barChart = new Chart(barCtx, {
    type: 'bar',
    data: {
      labels: ['Risk', 'Safe'],
      datasets: [{
        label: 'Health Status',
        data: [risk, safe],
        backgroundColor: ['#FF0000', '#00FF00'] // same color logic
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
