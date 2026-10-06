/**
 * DaybyDay - Life & Finance Dashboard Interactive Logic
 * File: Arinchai_dashboard.js
 * Supports Persona 1 (กิตติศักดิ์ ชัยวงศ์) and Persona 2 (อิศรา ศรีจำปา)
 * Connects with Thanapat_RecordExpenses and Salintip_AddTask
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Storage Keys ---
  const STORAGE_KEY_PERSONA = 'daybyday_current_persona';
  const STORAGE_KEY_FINANCE = 'daybyday_finance_data_';
  const STORAGE_KEY_TASKS = 'daybyday_tasks';

  // --- Persona Configurations based on pesona1.md and pesona2.md ---
  const personas = {
    persona1: {
      id: 'persona1',
      name: 'กิตติศักดิ์ ชัยวงศ์ (กิต)',
      age: 32,
      role: '👔 พนักงานออฟฟิศระดับกลาง (Project Manager)',
      avatar: 'img/Image%20(1).jpg',
      quote: '“ถ้าฉันรู้ว่าตัวเลขบอกอะไร ฉันก็จะตัดสินใจทำสิ่งต่าง ๆ ได้ดีกว่า”',
      routine: '🌅 เช็คสุขภาพ & การเงิน 15 นาทีก่อนเริ่มงาน',
      routineSub: '🌙 ตรวจสอบ Progress Bars ก่อนปิดแล็ปท็อปตอนเย็น',
      finance: {
        balance: 45200.00,
        income: 65000.00,
        expense: 19800.00
      },
      health: [
        { label: '🏃 ก้าวเดินวันนี้ (Apple Watch)', value: '8,432 ก้าว', target: 'เป้า 10,000 ก้าว', tagClass: 'text-accent' },
        { label: '⚖️ น้ำหนักปัจจุบัน (เป้าหมายลด 5 kg)', value: '62.4 kg', target: 'เป้า 58.0 kg', tagClass: 'text-amber' },
        { label: '🌙 เวลานอนเมื่อคืน', value: '6.8 ชม.', target: 'เป้า 7 ชม.', tagClass: 'text-accent' },
        { label: '⏱️ ชม. ทำงานล่วงเวลา (OT สัปดาห์นี้)', value: '1.2 ชม.', target: 'เกณฑ์ ≤ 2 ชม./สัปดาห์', tagClass: 'text-green' }
      ],
      tasks: [
        { id: 'p1-t1', text: 'ตรวจเช็ค Sprint Review ของทีม Dev', category: 'งานโปรเจกต์', done: true },
        { id: 'p1-t2', text: 'ประชุมสรุปแผนงานลดเวลา OT รายสัปดาห์', category: 'งานโปรเจกต์', done: false },
        { id: 'p1-t3', text: 'พาภรรยาและลูกสาวไปซื้อของเข้าบ้าน', category: 'ครอบครัว', done: false },
        { id: 'p1-t4', text: 'วิ่งเบิร์นแคลอรี่ 30 นาที (เป้าลดน้ำหนัก)', category: 'สุขภาพ', done: false }
      ],
      goals: [
        {
          title: '💰 กองทุนฉุกเฉิน 3 เดือนของค่าใช้จ่ายพื้นฐาน',
          current: '฿90,000',
          target: '฿100,000',
          percent: 90,
          fillClass: 'fill-green'
        },
        {
          title: '⚖️ ลดน้ำหนัก 5 kg ภายใน 6 เดือน (รักษา 55-60 kg)',
          current: 'ลดได้แล้ว 3.2 kg',
          target: 'เป้า 5.0 kg',
          percent: 64,
          fillClass: 'fill-accent'
        },
        {
          title: '🚀 ส่งมอบโครงการตรงกำหนด (เป้าหมาย ≥ 90%)',
          current: 'สำเร็จแล้ว 92%',
          target: 'เป้า 90%',
          percent: 92,
          fillClass: 'fill-green'
        }
      ]
    },
    persona2: {
      id: 'persona2',
      name: 'อิศรา ศรีจำปา (อิ๋ม)',
      age: 21,
      role: '🎓 นักศึกษาปี 4 เศรษฐศาสตร์อีคอมเมิร์ซ & บาริสต้า',
      avatar: 'img/Image.jpg',
      quote: '“อยากให้ชีวิตมีข้อมูลเป็นพยานว่า ฉันทำได้ตามที่ตั้งเป้า”',
      routine: '🌅 Morning Dashboard: เช็คยอดใช้จ่าย & หน้าที่อ่าน',
      routineSub: '🌙 Reflection 30 นาทีก่อนนอนใน Notion',
      finance: {
        balance: 18450.00,
        income: 8500.00,
        expense: 3200.00
      },
      health: [
        { label: '📖 จำนวนหน้าที่อ่านวันนี้ (Kindle/ตำรา)', value: '28 หน้า', target: 'เป้า 30 หน้า/วัน', tagClass: 'text-accent' },
        { label: '🌙 เวลาการนอนพักผ่อน', value: '7.2 ชม.', target: 'เป้า ≥ 7 ชม./คืน', tagClass: 'text-green' },
        { label: '🏃 ก้าวเดินเช้าและระหว่างวัน', value: '6,120 ก้าว', target: 'Google Fit', tagClass: 'text-accent' },
        { label: '☕ กะงานบาริสต้าที่ร้านกาแฟ', value: '4 ชม.', target: '14:00 - 18:00 น.', tagClass: 'text-amber' }
      ],
      tasks: [
        { id: 'p2-t1', text: 'ทบทวนคอร์ส Data Analytics และทำสรุป', category: 'การเรียน', done: true },
        { id: 'p2-t2', text: 'อ่านเอกสารวิจัยเตรียมส่งตีพิมพ์ 15 หน้า', category: 'งานวิจัย', done: false },
        { id: 'p2-t3', text: 'เข้ากะบาริสต้าที่ร้านกาแฟใน มอฯ', category: 'งานพิเศษ', done: false },
        { id: 'p2-t4', text: 'ทำ Reflection บันทึกเป้าหมายก่อนนอน 30 นาที', category: 'ส่วนตัว', done: false }
      ],
      goals: [
        {
          title: '🇦🇺 สะสมเงินออมเรียนต่อออสเตรเลีย (เป้า 300,000 บาท ใน 2 ปี)',
          current: '฿124,500',
          target: '฿300,000',
          percent: 41.5,
          fillClass: 'fill-accent'
        },
        {
          title: '📚 อ่านหนังสืออย่างน้อย 30 หน้า/วัน (สะสมเดือนนี้)',
          current: '820 หน้า',
          target: 'เป้า 900 หน้า',
          percent: 91,
          fillClass: 'fill-green'
        },
        {
          title: '🎓 รักษาระดับผลการเรียน (เป้าหมาย GPA ≥ 3.5)',
          current: 'GPA 3.65',
          target: 'เป้า 3.50',
          percent: 95,
          fillClass: 'fill-green'
        }
      ]
    }
  };

  // --- State Variables ---
  let currentPersonaId = localStorage.getItem(STORAGE_KEY_PERSONA) || 'persona1';
  if (!personas[currentPersonaId]) currentPersonaId = 'persona1';

  // --- DOM Elements ---
  const btnPersona1 = document.getElementById('btn-persona-1');
  const btnPersona2 = document.getElementById('btn-persona-2');

  const heroAvatar = document.getElementById('hero-avatar');
  const heroRoleTag = document.getElementById('hero-role-tag');
  const heroName = document.getElementById('hero-name');
  const heroSub = document.getElementById('hero-sub');
  const heroRoutine = document.getElementById('hero-routine');
  const goalsSubtitle = document.getElementById('goals-subtitle');

  const healthMetricsContainer = document.getElementById('health-metrics');
  const taskListContainer = document.getElementById('task-list');
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

  // --- Helper: Format Currency ---
  const formatCurrency = (num) => {
    return '฿' + Number(num).toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    });
  };

  // --- Load and Save Finance Data per Persona ---
  const getFinanceData = (personaId) => {
    const saved = localStorage.getItem(STORAGE_KEY_FINANCE + personaId);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.warn('Failed to parse saved finance data:', e);
      }
    }
    return { ...personas[personaId].finance };
  };

  const saveFinanceData = (personaId, data) => {
    localStorage.setItem(STORAGE_KEY_FINANCE + personaId, JSON.stringify(data));
  };

  // --- Load Custom Tasks from Salintip_AddTask ---
  const getStoredTasks = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_TASKS);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  };

  // --- Render Persona on UI ---
  const renderPersona = (personaId) => {
    const data = personas[personaId];
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
    if (healthMetricsContainer) {
      healthMetricsContainer.innerHTML = data.health.map(h => `
        <div class="metric">
          <span>${h.label}:</span>
          <span class="${h.tagClass}">
            ${h.value} <small style="color: var(--muted); font-weight: normal;">(${h.target})</small>
          </span>
        </div>
      `).join('');
    }

    // Update Daily Tasks (Combine preset tasks + custom tasks added from Salintip_AddTask)
    if (taskListContainer) {
      const customTasks = getStoredTasks().filter(t => !t.persona || t.persona === personaId);
      const allTasks = [...data.tasks, ...customTasks];

      taskListContainer.innerHTML = allTasks.map(task => `
        <label class="task-label" data-task-id="${task.id || ''}">
          <input type="checkbox" ${task.done ? 'checked' : ''} class="task-check" data-id="${task.id || ''}">
          <span style="${task.done ? 'text-decoration: line-through; color: var(--muted);' : ''}">${task.text}</span>
          <span class="task-badge">${task.category}</span>
        </label>
      `).join('');

      // Attach checkbox listeners
      taskListContainer.querySelectorAll('.task-check').forEach(chk => {
        chk.addEventListener('change', (e) => {
          const span = e.target.parentElement.querySelector('span');
          if (span) {
            span.style.textDecoration = e.target.checked ? 'line-through' : 'none';
            span.style.color = e.target.checked ? 'var(--muted)' : 'inherit';
          }
        });
      });
    }

    // Update Goals Progress Bars
    if (goalsContainer) {
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

    // Update Financial Metrics
    const fin = getFinanceData(personaId);
    if (metricBalance) metricBalance.textContent = formatCurrency(fin.balance);
    if (metricIncome) metricIncome.textContent = formatCurrency(fin.income);
    if (metricExpense) metricExpense.textContent = formatCurrency(fin.expense);

    // Save active persona selection
    localStorage.setItem(STORAGE_KEY_PERSONA, personaId);
  };

  // --- Switch Persona Handler ---
  if (btnPersona1) {
    btnPersona1.addEventListener('click', () => {
      currentPersonaId = 'persona1';
      renderPersona(currentPersonaId);
      showToast('สลับมุมมองผู้ใช้เป็น: คุณกิตติศักดิ์ (Project Manager)');
    });
  }

  if (btnPersona2) {
    btnPersona2.addEventListener('click', () => {
      currentPersonaId = 'persona2';
      renderPersona(currentPersonaId);
      showToast('สลับมุมมองผู้ใช้เป็น: คุณอิศรา (นักศึกษา & บาริสต้า)');
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
        showToast('กรุณากรอกจำนวนเงินที่ถูกต้อง!', false);
        amountInput.focus();
        return;
      }

      const fin = getFinanceData(currentPersonaId);
      if (type === 'income') {
        fin.income += amountVal;
        fin.balance += amountVal;
      } else {
        fin.expense += amountVal;
        fin.balance -= amountVal;
      }

      saveFinanceData(currentPersonaId, fin);

      if (metricBalance) metricBalance.textContent = formatCurrency(fin.balance);
      if (metricIncome) metricIncome.textContent = formatCurrency(fin.income);
      if (metricExpense) metricExpense.textContent = formatCurrency(fin.expense);

      amountInput.value = '';
      if (logNoteInput) logNoteInput.value = '';

      const typeLabel = type === 'income' ? 'รายรับ' : 'รายจ่าย';
      showToast(`✓ บันทึก${typeLabel} ฿${amountVal.toLocaleString()} สำหรับ ${personas[currentPersonaId].name} สำเร็จ!`);
    });
  }

  // --- Toast Notification ---
  const showToast = (message, isSuccess = true) => {
    let toast = document.getElementById('dashboard-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'dashboard-toast';
      toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        color: #ffffff;
        padding: 12px 22px;
        border-radius: 12px;
        font-weight: 600;
        box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        z-index: 9999;
        transition: opacity 0.3s ease, transform 0.3s ease;
        opacity: 0;
        transform: translateY(10px);
        font-family: inherit;
      `;
      document.body.appendChild(toast);
    }

    toast.style.background = isSuccess ? '#10b981' : '#ef4444';
    toast.textContent = message;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
    }, 2800);
  };

  // --- Initial Render ---
  renderPersona(currentPersonaId);
});