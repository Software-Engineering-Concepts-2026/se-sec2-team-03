/**
 * DaybyDay - Central Data Management Layer (Prototype Sprint 1)
 * Shared across:
 *  - Arinchai_dashboard_prototype.html (Dashboard)
 *  - Thanapat_RecordExpenses_prototype.html (Expense Tracker)
 *  - Salintip_AddTask_prototype.html (Add Task)
 *
 * Ensures all transactions, tasks, financial balances, and persona switching
 * are fully synchronized across pages using LocalStorage.
 */

const DayByDay = (() => {
  const STORAGE_KEY_PERSONA = 'daybyday_current_persona';
  const STORAGE_PREFIX_FINANCE = 'daybyday_finance_';
  const STORAGE_PREFIX_TRANSACTIONS = 'daybyday_transactions_';
  const STORAGE_PREFIX_TASKS = 'daybyday_tasks_';

  // --- Initial Default Data per Persona ---
  const DEFAULT_CONFIGS = {
    persona1: {
      id: 'persona1',
      name: 'กิตติศักดิ์ ชัยวงศ์ (กิต)',
      age: 32,
      role: '👔 พนักงานออฟฟิศระดับกลาง (Project Manager)',
      avatar: 'img/Image (1).jpg',
      quote: '“ถ้าฉันรู้ว่าตัวเลขบอกอะไร ฉันก็จะตัดสินใจทำสิ่งต่าง ๆ ได้ดีกว่า”',
      routine: '🌅 เช็คสุขภาพ & การเงิน 15 นาทีก่อนเริ่มงาน',
      routineSub: '🌙 ตรวจสอบ Progress Bars ก่อนปิดแล็ปท็อปตอนเย็น',
      finance: {
        balance: 45200.00,
        income: 65000.00,
        expense: 19800.00
      },
      categoryBase: {
        'อาหาร': 7200,
        'เดินทาง': 3600,
        'ช้อปปิ้ง': 2800,
        'บ้าน': 3500,
        'บันเทิง': 1700,
        'อื่นๆ': 1000
      },
      transactions: [
        {
          id: 'p1-tx-1',
          persona: 'persona1',
          type: 'expense',
          category: 'อาหาร',
          amount: 85.00,
          date: new Date().toISOString().split('T')[0],
          displayDate: 'วันนี้',
          note: 'ค่าข้าวเที่ยงข้าวมันไก่พิเศษ',
          timestamp: Date.now() - 3600000
        },
        {
          id: 'p1-tx-2',
          persona: 'persona1',
          type: 'expense',
          category: 'เดินทาง',
          amount: 45.00,
          date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
          displayDate: 'เมื่อวาน',
          note: 'ค่าโดยสารรถไฟฟ้า BTS ไปทำงาน',
          timestamp: Date.now() - 86400000
        },
        {
          id: 'p1-tx-3',
          persona: 'persona1',
          type: 'expense',
          category: 'ช้อปปิ้ง',
          amount: 320.00,
          date: new Date(Date.now() - 172800000).toISOString().split('T')[0],
          displayDate: '2 วันก่อน',
          note: 'ซื้ออุปกรณ์สมุดจดสำหรับประชุม',
          timestamp: Date.now() - 172800000
        },
        {
          id: 'p1-tx-4',
          persona: 'persona1',
          type: 'expense',
          category: 'บ้าน',
          amount: 1500.00,
          date: new Date(Date.now() - 345600000).toISOString().split('T')[0],
          displayDate: '4 วันก่อน',
          note: 'ค่าบำรุงรักษาส่วนกลางคอนโด',
          timestamp: Date.now() - 345600000
        }
      ],
      tasks: [
        { id: 'p1-t1', text: 'ตรวจเช็ค Sprint Review ของทีม Dev', category: 'งานโปรเจกต์', importance: 'high', done: true, persona: 'persona1' },
        { id: 'p1-t2', text: 'ประชุมสรุปแผนงานลดเวลา OT รายสัปดาห์', category: 'งานโปรเจกต์', importance: 'medium', done: false, persona: 'persona1' },
        { id: 'p1-t3', text: 'พาภรรยาและลูกสาวไปซื้อของเข้าบ้าน', category: 'ครอบครัว', importance: 'low', done: false, persona: 'persona1' },
        { id: 'p1-t4', text: 'วิ่งเบิร์นแคลอรี่ 30 นาที (เป้าลดน้ำหนัก)', category: 'สุขภาพ', importance: 'medium', done: false, persona: 'persona1' }
      ],
      health: [
        { label: '🏃 ก้าวเดินวันนี้ (Apple Watch)', value: '8,432 ก้าว', target: 'เป้า 10,000 ก้าว', tagClass: 'text-accent' },
        { label: '⚖️ น้ำหนักปัจจุบัน (เป้าหมายลด 5 kg)', value: '62.4 kg', target: 'เป้า 58.0 kg', tagClass: 'text-amber' },
        { label: '🌙 เวลานอนเมื่อคืน', value: '6.8 ชม.', target: 'เป้า 7 ชม.', tagClass: 'text-accent' },
        { label: '⏱️ ชม. ทำงานล่วงเวลา (OT สัปดาห์นี้)', value: '1.2 ชม.', target: 'เกณฑ์ ≤ 2 ชม./สัปดาห์', tagClass: 'text-green' }
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
      categoryBase: {
        'อาหาร': 1600,
        'เดินทาง': 650,
        'ช้อปปิ้ง': 450,
        'บ้าน': 0,
        'บันเทิง': 300,
        'อื่นๆ': 200
      },
      transactions: [
        {
          id: 'p2-tx-1',
          persona: 'persona2',
          type: 'expense',
          category: 'อาหาร',
          amount: 65.00,
          date: new Date().toISOString().split('T')[0],
          displayDate: 'วันนี้',
          note: 'ข้าวไข่เจียว & กาแฟโบราณ',
          timestamp: Date.now() - 3600000
        },
        {
          id: 'p2-tx-2',
          persona: 'persona2',
          type: 'expense',
          category: 'เดินทาง',
          amount: 30.00,
          date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
          displayDate: 'เมื่อวาน',
          note: 'ค่าวินมอเตอร์ไซค์ไป มอฯ',
          timestamp: Date.now() - 86400000
        },
        {
          id: 'p2-tx-3',
          persona: 'persona2',
          type: 'expense',
          category: 'ช้อปปิ้ง',
          amount: 140.00,
          date: new Date(Date.now() - 259200000).toISOString().split('T')[0],
          displayDate: '3 วันก่อน',
          note: 'สมุดจดเลคเชอร์ & ปากกาเน้นข้อความ',
          timestamp: Date.now() - 259200000
        }
      ],
      tasks: [
        { id: 'p2-t1', text: 'ทบทวนคอร์ส Data Analytics และทำสรุป', category: 'การเรียน', importance: 'high', done: true, persona: 'persona2' },
        { id: 'p2-t2', text: 'อ่านเอกสารวิจัยเตรียมส่งตีพิมพ์ 15 หน้า', category: 'การเรียน', importance: 'high', done: false, persona: 'persona2' },
        { id: 'p2-t3', text: 'เข้ากะบาริสต้าที่ร้านกาแฟใน มอฯ', category: 'งานพิเศษ', importance: 'medium', done: false, persona: 'persona2' },
        { id: 'p2-t4', text: 'ทำ Reflection บันทึกเป้าหมายก่อนนอน 30 นาที', category: 'ส่วนตัว', importance: 'low', done: false, persona: 'persona2' }
      ],
      health: [
        { label: '📖 จำนวนหน้าที่อ่านวันนี้ (Kindle/ตำรา)', value: '28 หน้า', target: 'เป้า 30 หน้า/วัน', tagClass: 'text-accent' },
        { label: '🌙 เวลาการนอนพักผ่อน', value: '7.2 ชม.', target: 'เป้า ≥ 7 ชม./คืน', tagClass: 'text-green' },
        { label: '🏃 ก้าวเดินเช้าและระหว่างวัน', value: '6,120 ก้าว', target: 'Google Fit', tagClass: 'text-accent' },
        { label: '☕ กะงานบาริสต้าที่ร้านกาแฟ', value: '4 ชม.', target: '14:00 - 18:00 น.', tagClass: 'text-amber' }
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

  // --- Persona Management ---
  const getCurrentPersona = () => {
    let p = localStorage.getItem(STORAGE_KEY_PERSONA);
    if (!p || !DEFAULT_CONFIGS[p]) {
      p = 'persona1';
      localStorage.setItem(STORAGE_KEY_PERSONA, p);
    }
    return p;
  };

  const setCurrentPersona = (pId) => {
    if (DEFAULT_CONFIGS[pId]) {
      localStorage.setItem(STORAGE_KEY_PERSONA, pId);
      window.dispatchEvent(new CustomEvent('daybyday:persona-changed', { detail: { persona: pId } }));
    }
  };

  const getPersonaDetails = (pId) => {
    const id = pId || getCurrentPersona();
    return DEFAULT_CONFIGS[id] || DEFAULT_CONFIGS.persona1;
  };

  // --- Finance Management ---
  const getFinance = (pId) => {
    const id = pId || getCurrentPersona();
    const key = STORAGE_PREFIX_FINANCE + id;
    const raw = localStorage.getItem(key);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (e) {
        console.warn('DayByDay: Error parsing finance data', e);
      }
    }
    // Return default copy and persist
    const initial = { ...DEFAULT_CONFIGS[id].finance };
    localStorage.setItem(key, JSON.stringify(initial));
    return initial;
  };

  const saveFinance = (pId, finObj) => {
    const id = pId || getCurrentPersona();
    localStorage.setItem(STORAGE_PREFIX_FINANCE + id, JSON.stringify(finObj));
  };

  // --- Transactions Management ---
  const getTransactions = (pId) => {
    const id = pId || getCurrentPersona();
    const key = STORAGE_PREFIX_TRANSACTIONS + id;
    const raw = localStorage.getItem(key);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (e) {
        console.warn('DayByDay: Error parsing transactions', e);
      }
    }
    // Initialize defaults
    const initial = [...DEFAULT_CONFIGS[id].transactions];
    localStorage.setItem(key, JSON.stringify(initial));
    return initial;
  };

  const saveTransactions = (pId, list) => {
    const id = pId || getCurrentPersona();
    localStorage.setItem(STORAGE_PREFIX_TRANSACTIONS + id, JSON.stringify(list));
  };

  const addTransaction = ({ persona, type = 'expense', category = 'อื่นๆ', amount, note = '', date }) => {
    const pId = persona || getCurrentPersona();
    const parsedAmount = Math.abs(parseFloat(amount) || 0);
    if (parsedAmount <= 0) return null;

    const todayStr = new Date().toISOString().split('T')[0];
    const txDate = date || todayStr;
    const displayDate = (txDate === todayStr) ? 'วันนี้' : txDate;

    const newTx = {
      id: 'tx-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      persona: pId,
      type: type, // 'expense' or 'income'
      category: category,
      amount: parsedAmount,
      date: txDate,
      displayDate: displayDate,
      note: note.trim() || (type === 'income' ? 'รายรับทั่วไป' : `ค่า${category}`),
      timestamp: Date.now()
    };

    // 1. Add to transactions list
    const currentList = getTransactions(pId);
    currentList.unshift(newTx);
    saveTransactions(pId, currentList);

    // 2. Update Finance Balance & Totals
    const fin = getFinance(pId);
    if (type === 'income') {
      fin.income += parsedAmount;
      fin.balance += parsedAmount;
    } else {
      fin.expense += parsedAmount;
      fin.balance -= parsedAmount;
    }
    saveFinance(pId, fin);

    // 3. Dispatch global sync event
    window.dispatchEvent(new CustomEvent('daybyday:data-updated', {
      detail: { type: 'transaction-added', transaction: newTx, persona: pId }
    }));

    return newTx;
  };

  const deleteTransaction = (txId, pId) => {
    const personaId = pId || getCurrentPersona();
    const list = getTransactions(personaId);
    const index = list.findIndex(tx => tx.id === txId);
    if (index === -1) return false;

    const tx = list[index];
    list.splice(index, 1);
    saveTransactions(personaId, list);

    // Reverse finance impact
    const fin = getFinance(personaId);
    if (tx.type === 'income') {
      fin.income = Math.max(0, fin.income - tx.amount);
      fin.balance -= tx.amount;
    } else {
      fin.expense = Math.max(0, fin.expense - tx.amount);
      fin.balance += tx.amount;
    }
    saveFinance(personaId, fin);

    window.dispatchEvent(new CustomEvent('daybyday:data-updated', {
      detail: { type: 'transaction-deleted', txId, persona: personaId }
    }));

    return true;
  };

  // Calculate category totals for a persona based on default base + all added transactions
  const getCategoryTotals = (pId) => {
    const id = pId || getCurrentPersona();
    const base = { ...DEFAULT_CONFIGS[id].categoryBase };
    const transactions = getTransactions(id);

    // Reset base or start fresh from transactions + baseline
    const totals = {
      'อาหาร': 0,
      'เดินทาง': 0,
      'ช้อปปิ้ง': 0,
      'บ้าน': 0,
      'บันเทิง': 0,
      'อื่นๆ': 0
    };

    // Add baseline
    Object.keys(base).forEach(k => {
      if (totals[k] !== undefined) totals[k] = base[k];
    });

    // Add recent expense transactions
    transactions.forEach(tx => {
      if (tx.type === 'expense') {
        const cat = tx.category;
        if (totals[cat] !== undefined) {
          totals[cat] += tx.amount;
        } else {
          totals['อื่นๆ'] = (totals['อื่นๆ'] || 0) + tx.amount;
        }
      }
    });

    return totals;
  };

  // --- Tasks Management ---
  const getTasks = (pId) => {
    const id = pId || getCurrentPersona();
    const key = STORAGE_PREFIX_TASKS + id;
    const raw = localStorage.getItem(key);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (e) {
        console.warn('DayByDay: Error parsing tasks', e);
      }
    }
    // Fallback: check legacy daybyday_tasks
    const legacy = localStorage.getItem('daybyday_tasks');
    let combined = [...DEFAULT_CONFIGS[id].tasks];
    if (legacy) {
      try {
        const legacyList = JSON.parse(legacy);
        const userCustom = legacyList.filter(t => !t.persona || t.persona === id);
        combined = [...combined, ...userCustom];
      } catch (e) {}
    }
    localStorage.setItem(key, JSON.stringify(combined));
    return combined;
  };

  const saveTasks = (pId, list) => {
    const id = pId || getCurrentPersona();
    localStorage.setItem(STORAGE_PREFIX_TASKS + id, JSON.stringify(list));
    // Also sync to legacy for any older references
    localStorage.setItem('daybyday_tasks', JSON.stringify(list));
  };

  const addTask = ({ persona, text, description = '', category = 'งานโปรเจกต์', importance = 'medium', date, time }) => {
    const pId = persona || getCurrentPersona();
    if (!text || !text.trim()) return null;

    const newTask = {
      id: 'task-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      persona: pId,
      text: text.trim(),
      description: description.trim(),
      category: category,
      importance: importance,
      date: date || new Date().toISOString().split('T')[0],
      time: time || '',
      done: false,
      isCustom: true
    };

    const currentTasks = getTasks(pId);
    currentTasks.unshift(newTask);
    saveTasks(pId, currentTasks);

    window.dispatchEvent(new CustomEvent('daybyday:data-updated', {
      detail: { type: 'task-added', task: newTask, persona: pId }
    }));

    return newTask;
  };

  const toggleTask = (taskId, pId, isDone) => {
    const id = pId || getCurrentPersona();
    const list = getTasks(id);
    const item = list.find(t => t.id === taskId);
    if (item) {
      item.done = (typeof isDone === 'boolean') ? isDone : !item.done;
      saveTasks(id, list);

      window.dispatchEvent(new CustomEvent('daybyday:data-updated', {
        detail: { type: 'task-toggled', taskId, done: item.done, persona: id }
      }));
      return item;
    }
    return null;
  };

  const deleteTask = (taskId, pId) => {
    const id = pId || getCurrentPersona();
    const list = getTasks(id);
    const filtered = list.filter(t => t.id !== taskId);
    saveTasks(id, filtered);

    window.dispatchEvent(new CustomEvent('daybyday:data-updated', {
      detail: { type: 'task-deleted', taskId, persona: id }
    }));
    return true;
  };

  // --- Helper: Format Currency ---
  const formatCurrency = (num, includeSymbol = true) => {
    const formatted = Number(num || 0).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    return includeSymbol ? `฿${formatted}` : formatted;
  };

  // --- Helper: Universal Toast Notification ---
  const showToast = (message, isSuccess = true) => {
    let toast = document.getElementById('daybyday-global-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'daybyday-global-toast';
      toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        color: #ffffff;
        padding: 12px 22px;
        border-radius: 14px;
        font-weight: 600;
        font-size: 0.92rem;
        box-shadow: 0 10px 28px rgba(0,0,0,0.22);
        z-index: 99999;
        transition: opacity 0.3s ease, transform 0.3s ease;
        opacity: 0;
        transform: translateY(12px);
        font-family: inherit;
        display: flex;
        align-items: center;
        gap: 8px;
        pointer-events: none;
      `;
      document.body.appendChild(toast);
    }

    toast.style.background = isSuccess ? '#10b981' : '#ef4444';
    toast.innerHTML = (isSuccess ? '✓ ' : '⚠️ ') + message;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';

    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(12px)';
    }, 2800);
  };

  // --- Return Public API ---
  return {
    getCurrentPersona,
    setCurrentPersona,
    getPersonaDetails,
    getFinance,
    saveFinance,
    getTransactions,
    addTransaction,
    deleteTransaction,
    getCategoryTotals,
    getTasks,
    addTask,
    toggleTask,
    deleteTask,
    formatCurrency,
    showToast,
    DEFAULT_CONFIGS
  };
})();

// Export globally if in browser window
if (typeof window !== 'undefined') {
  window.DayByDay = DayByDay;
}
