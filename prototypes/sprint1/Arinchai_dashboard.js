/**
 * DaybyDay - Life & Finance Dashboard Interactive Logic
 * File: Arinchai_dashboard.js
 * Supports Persona 1 (กิตติศักดิ์ ชัยวงศ์) and Persona 2 (อิศรา ศรีจำปา)
 * Fully connected with Thanapat_RecordExpenses and Salintip_AddTask via DayByDay data layer
 */

document.addEventListener('DOMContentLoaded', () => {
  // Check if DayByDay central data layer is loaded
  if (typeof DayByDay === 'undefined') {
    console.error('DayByDay data layer is missing!');
    return;
  }

  // --- State Variables ---
  let currentPersonaId = DayByDay.getCurrentPersona();

  // --- DOM Elements ---
  const btnPersona1 = document.getElementById('btn-persona-1');
  const btnPersona2 = document.getElementById('btn-persona-2');

  const heroAvatar = document.getElementById('hero-avatar');
  const heroRoleTag = document.getElementById('hero-role-tag');
  const heroName = document.getElementById('hero-name');
  const heroSub = document.getElementById('hero-sub');
  const heroRoutine = document.getElementById('hero-routine');
  const heroDate = document.getElementById('hero-date');
  const goalsSubtitle = document.getElementById('goals-subtitle');

  const healthMetricsContainer = document.getElementById('health-metrics');
  const taskListContainer = document.getElementById('task-list');
  const taskCounter = document.getElementById('task-counter');
  const goalsContainer = document.getElementById('goals-container');

  const metricBalance = document.getElementById('metric-balance');
  const metricIncome = document.getElementById('metric-income');
  const metricExpense = document.getElementById('metric-expense');

  // Quick Log Inputs
  const amountInput = document.getElementById('amount');
  const logNoteInput = document.getElementById('log-note');
  const transTypeInput = document.getElementById('trans-type');
  const addLogBtn = document.getElementById('add-log-btn');
  const typeChips = document.querySelectorAll('.category-grid .chip');

  // Set today's date formatted in Thai
  if (heroDate) {
    const daysTh = ['วันอาทิตย์', 'วันจันทร์', 'วันอังคาร', 'วันพุธ', 'วันพฤหัสบดี', 'วันศุกร์', 'วันเสาร์'];
    const monthsTh = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
    const now = new Date();
    heroDate.textContent = `${daysTh[now.getDay()]}ที่ ${now.getDate()} ${monthsTh[now.getMonth()]} ${now.getFullYear() + 543}`;
  }

  // --- Render Persona on UI ---
  const renderPersona = (personaId) => {
    const data = DayByDay.getPersonaDetails(personaId);
    if (!data) return;

    // Update buttons active state
    if (btnPersona1) btnPersona1.classList.toggle('active', personaId === 'persona1');
    if (btnPersona2) btnPersona2.classList.toggle('active', personaId === 'persona2');

    // Update Hero Card
    if (heroAvatar) {
      heroAvatar.src = decodeURIComponent(data.avatar);
      heroAvatar.alt = data.name;
    }
    if (heroRoleTag) heroRoleTag.textContent = data.role;
    if (heroName) heroName.textContent = `สวัสดี, ${data.name}`;
    if (heroSub) heroSub.textContent = data.quote;
    if (heroRoutine) heroRoutine.textContent = data.routine;
    if (goalsSubtitle) goalsSubtitle.textContent = data.routineSub;

    // Update Health Metrics
    if (healthMetricsContainer && data.health) {
      healthMetricsContainer.innerHTML = data.health.map(h => `
        <div class="metric">
          <span>${h.label}:</span>
          <span class="${h.tagClass}">
            ${h.value} <small style="color: var(--muted); font-weight: normal;">(${h.target})</small>
          </span>
        </div>
      `).join('');
    }

    // Update Daily Tasks
    renderTasks(personaId);

    // Update Goals Progress Bars
    if (goalsContainer && data.goals) {
      goalsContainer.innerHTML = data.goals.map(g => `
        <div class="goal-progress-item">
          <div class="goal-info">
            <span class="goal-title">${g.title}</span>
            <span class="goal-value">${g.current} / ${g.target} (${g.percent}%)</span>
          </div>
          <div class="progress-track">
            <div class="progress-fill ${g.fillClass}" style="width: ${Math.min(g.percent, 100)}%;"></div>
          </div>
        </div>
      `).join('');
    }

    // Update Financial Metrics from central data
    const fin = DayByDay.getFinance(personaId);
    if (metricBalance) metricBalance.textContent = DayByDay.formatCurrency(fin.balance);
    if (metricIncome) metricIncome.textContent = DayByDay.formatCurrency(fin.income);
    if (metricExpense) metricExpense.textContent = DayByDay.formatCurrency(fin.expense);

    // Update Weekly Chart
    updateWeeklyChart(personaId);
  };

  // --- Render Tasks with Interactivity ---
  const renderTasks = (personaId) => {
    if (!taskListContainer) return;
    const tasks = DayByDay.getTasks(personaId);

    const completedCount = tasks.filter(t => t.done).length;
    if (taskCounter) {
      taskCounter.textContent = `(${completedCount}/${tasks.length} เสร็จ)`;
    }

    if (tasks.length === 0) {
      taskListContainer.innerHTML = `
        <div style="text-align: center; color: var(--muted); padding: 14px 0; font-size: 0.85rem;">
          ยังไม่มีภารกิจ <a href="Salintip_AddTask_prototype.html" style="color: var(--accent); font-weight: 600;">+ เพิ่มภารกิจใหม่</a>
        </div>
      `;
      return;
    }

    taskListContainer.innerHTML = tasks.map(task => `
      <div class="task-label" data-task-id="${task.id}" style="display: flex; align-items: center; gap: 8px; justify-content: space-between;">
        <label style="display: flex; align-items: center; gap: 8px; flex: 1; cursor: pointer; min-width: 0;">
          <input type="checkbox" ${task.done ? 'checked' : ''} class="task-check" data-id="${task.id}">
          <span style="font-size: 0.78rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; ${task.done ? 'text-decoration: line-through; color: var(--muted);' : 'color: var(--text);'}">
            ${task.text}
          </span>
        </label>
        <div style="display: flex; align-items: center; gap: 6px; flex-shrink: 0;">
          <span class="task-badge">${task.category}</span>
          ${task.isCustom ? `<button class="delete-task-btn" data-id="${task.id}" title="ลบงาน" style="background: none; border: none; cursor: pointer; font-size: 0.75rem; color: #94a3b8; padding: 0 2px;">✕</button>` : ''}
        </div>
      </div>
    `).join('');

    // Attach checkbox listeners
    taskListContainer.querySelectorAll('.task-check').forEach(chk => {
      chk.addEventListener('change', (e) => {
        const taskId = e.target.dataset.id;
        const isDone = e.target.checked;
        DayByDay.toggleTask(taskId, currentPersonaId, isDone);
        renderTasks(currentPersonaId);
      });
    });

    // Attach delete button listeners
    taskListContainer.querySelectorAll('.delete-task-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const taskId = e.target.dataset.id;
        if (confirm('ต้องการลบภารกิจนี้หรือไม่?')) {
          DayByDay.deleteTask(taskId, currentPersonaId);
          renderTasks(currentPersonaId);
          DayByDay.showToast('ลบภารกิจเรียบร้อยแล้ว');
        }
      });
    });
  };

  // --- Dynamic Weekly Chart Calculation ---
  const updateWeeklyChart = (personaId) => {
    const chartBars = document.querySelectorAll('.chart-container .chart-bar');
    if (!chartBars || chartBars.length === 0) return;

    const txs = DayByDay.getTransactions(personaId);
    const dayTotals = [0, 0, 0, 0, 0, 0, 0]; // Sun=0, Mon=1, ... Sat=6

    // Preset base distribution so chart always has appealing shape
    const baseDistribution = personaId === 'persona1'
      ? [450, 680, 520, 950, 600, 1100, 400]
      : [120, 180, 240, 150, 320, 280, 200];

    // Add actual transaction amounts
    txs.forEach(tx => {
      if (tx.date) {
        const d = new Date(tx.date);
        const dayIdx = isNaN(d.getDay()) ? 3 : d.getDay();
        dayTotals[dayIdx] += tx.amount;
      }
    });

    // Thai week order in the prototype: จ. (1), อ. (2), พ. (3), พฤ. (4), ศ. (5), ส. (6), อา. (0)
    const weekIndices = [1, 2, 3, 4, 5, 6, 0];
    const orderedTotals = weekIndices.map((dayIdx, i) => dayTotals[dayIdx] + baseDistribution[i]);
    const maxVal = Math.max(...orderedTotals, 1000);

    chartBars.forEach((bar, idx) => {
      const amt = orderedTotals[idx] || 300;
      const heightPercent = Math.min(Math.max(Math.round((amt / maxVal) * 90), 20), 95);
      bar.style.height = `${heightPercent}%`;
      bar.title = `ยอดใช้จ่าย: ${DayByDay.formatCurrency(amt)}`;
    });
  };

  // --- Switch Persona Handler ---
  if (btnPersona1) {
    btnPersona1.addEventListener('click', () => {
      currentPersonaId = 'persona1';
      DayByDay.setCurrentPersona('persona1');
      renderPersona(currentPersonaId);
      DayByDay.showToast('สลับมุมมองผู้ใช้เป็น: คุณกิตติศักดิ์ (Project Manager)');
    });
  }

  if (btnPersona2) {
    btnPersona2.addEventListener('click', () => {
      currentPersonaId = 'persona2';
      DayByDay.setCurrentPersona('persona2');
      renderPersona(currentPersonaId);
      DayByDay.showToast('สลับมุมมองผู้ใช้เป็น: คุณอิศรา (นักศึกษา & บาริสต้า)');
    });
  }

  // --- Quick Financial Log Logic ---
  typeChips.forEach(chip => {
    chip.addEventListener('click', () => {
      typeChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      if (transTypeInput) {
        transTypeInput.value = chip.dataset.type;
      }
    });
  });

  if (addLogBtn) {
    addLogBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const amountVal = parseFloat(amountInput.value);
      const noteVal = logNoteInput ? logNoteInput.value.trim() : '';
      const type = transTypeInput ? transTypeInput.value : 'income';

      if (isNaN(amountVal) || amountVal <= 0) {
        DayByDay.showToast('กรุณากรอกจำนวนเงินที่มากกว่า 0!', false);
        amountInput.focus();
        return;
      }

      // Add transaction into central data layer
      const addedTx = DayByDay.addTransaction({
        persona: currentPersonaId,
        type: type,
        category: (type === 'income' ? 'รายรับทั่วไป' : (noteVal.includes('ข้าว') || noteVal.includes('อาหาร') ? 'อาหาร' : 'อื่นๆ')),
        amount: amountVal,
        note: noteVal,
        date: new Date().toISOString().split('T')[0]
      });

      if (addedTx) {
        // Reset inputs
        amountInput.value = '';
        if (logNoteInput) logNoteInput.value = '';

        // Re-render dashboard
        renderPersona(currentPersonaId);

        const typeLabel = type === 'income' ? 'รายรับ' : 'รายจ่าย';
        const pName = DayByDay.getPersonaDetails(currentPersonaId).name;
        DayByDay.showToast(`บันทึก${typeLabel} ${DayByDay.formatCurrency(amountVal)} สำหรับ ${pName} สำเร็จ!`);
      }
    });
  }

  // --- Global Sync Listeners ---
  window.addEventListener('daybyday:data-updated', () => {
    renderPersona(currentPersonaId);
  });

  window.addEventListener('daybyday:persona-changed', (e) => {
    if (e.detail && e.detail.persona) {
      currentPersonaId = e.detail.persona;
      renderPersona(currentPersonaId);
    }
  });

  window.addEventListener('storage', () => {
    currentPersonaId = DayByDay.getCurrentPersona();
    renderPersona(currentPersonaId);
  });

  // --- Initial Render ---
  renderPersona(currentPersonaId);
});