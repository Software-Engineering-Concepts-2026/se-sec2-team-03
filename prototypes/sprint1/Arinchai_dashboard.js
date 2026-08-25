

document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Element References ---
  const amountInput = document.getElementById('amount');
  const transTypeInput = document.getElementById('trans-type');
  const addLogBtn = document.getElementById('add-log-btn');
  const typeChips = document.querySelectorAll('.category-grid .chip');
  const navItems = document.querySelectorAll('.nav-links .nav-item');

  // Dashboard Metrics Elements
  const balanceEl = document.querySelector('.metric strong.text-accent');
  const incomeEl = document.querySelector('.metric .text-green');
  const expenseEl = document.querySelector('.metric .text-red');

  // --- Initial State & Storage Keys ---
  const STORAGE_KEY_FINANCE = 'arinchai_finance_data';

  let financeData = {
    balance: 21432.00,
    income: 1200.00,
    expense: 350.00
  };

  // --- Helper Functions ---
  const formatCurrency = (num) => {
    return '฿' + Number(num).toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    });
  };

  // อัปเดต UI หน้าจอตามค่าปัจจุบัน
  const updateDashboardUI = () => {
    if (balanceEl) balanceEl.textContent = formatCurrency(financeData.balance);
    if (incomeEl) incomeEl.textContent = formatCurrency(financeData.income);
    if (expenseEl) expenseEl.textContent = formatCurrency(financeData.expense);
  };

  // --- Type Chip Selection Handling ---
  typeChips.forEach((chip) => {
    chip.addEventListener('click', (e) => {
      e.preventDefault();
      typeChips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');

      const isIncome = chip.textContent.includes('Income');
      if (transTypeInput) {
        transTypeInput.value = isIncome ? 'income' : 'expense';
      }
    });
  });

  // --- Navigation Active Toggle ---
  navItems.forEach((nav) => {
    nav.addEventListener('click', (e) => {
      e.preventDefault();
      navItems.forEach((item) => item.classList.remove('active'));
      nav.classList.add('active');
    });
  });

  // --- Toast Feedback Notification ---
  const showFeedback = (message, isSuccess = true) => {
    let toast = document.getElementById('dashboard-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'dashboard-toast';
      toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        color: #ffffff;
        padding: 12px 20px;
        border-radius: 12px;
        font-weight: 600;
        box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        z-index: 9999;
        transition: opacity 0.3s ease, transform 0.3s ease;
        opacity: 0;
        transform: translateY(10px);
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
    }, 2500);
  };

  // --- Save Transaction Handler ---
  const handleAddLog = (e) => {
    if (e) e.preventDefault();

    const rawAmount = parseFloat(amountInput.value);
    const type = transTypeInput ? transTypeInput.value : 'income';

    if (isNaN(rawAmount) || rawAmount <= 0) {
      showFeedback('กรุณากรอกจำนวนเงินที่ถูกต้อง!', false);
      if (amountInput) amountInput.focus();
      return;
    }

    // คำนวณยอดเงินใหม่
    if (type === 'income') {
      financeData.income += rawAmount;
      financeData.balance += rawAmount;
    } else {
      financeData.expense += rawAmount;
      financeData.balance -= rawAmount;
    }

    // อัปเดต UI และ บันทึก LocalStorage
    updateDashboardUI();
    saveStateToStorage();

    // รีเซ็ต Input
    amountInput.value = '';

    // แสดงการแจ้งเตือน
    const typeText = type === 'income' ? 'รายรับ' : 'รายจ่าย';
    showFeedback(`✓ บันทึก${typeText} ฿${rawAmount.toLocaleString()} สำเร็จ!`);
  };

  // --- LocalStorage Helpers ---
  const saveStateToStorage = () => {
    try {
      localStorage.setItem(STORAGE_KEY_FINANCE, JSON.stringify(financeData));
    } catch (err) {
      console.warn('LocalStorage save error:', err);
    }
  };

  const loadStateFromStorage = () => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY_FINANCE);
      if (savedData) {
        financeData = JSON.parse(savedData);
      }
    } catch (err) {
      console.warn('LocalStorage load error:', err);
    }
    updateDashboardUI();
  };

  // --- Event Listeners Attachment ---
  if (addLogBtn) {
    addLogBtn.addEventListener('click', handleAddLog);
  }

  // เริ่มทำงานระบบ
  loadStateFromStorage();
});