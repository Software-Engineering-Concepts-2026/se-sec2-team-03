/**
 * Expense Tracker Dashboard - Interactive Logic
 * File: Thanapat_RecordExpenses.js
 * Connects with Thanapat_RecordExpenses_prototype.html and Thanapat_RecordExpenses_style.css
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Element References ---
  const amountInput = document.getElementById('amountInput');
  const dateInput = document.querySelector('input[type="date"]');
  const noteInput = document.querySelector('textarea');
  const saveBtn = document.querySelector('.primary-btn');
  const cancelBtn = document.querySelector('.ghost-btn');
  const totalExpenseEl = document.getElementById('totalExpense');
  const historyBody = document.getElementById('historyBody');
  const categoryChips = document.querySelectorAll('.chip');
  const keypadButtons = document.querySelectorAll('.keypad-btn');
  const navItems = document.querySelectorAll('.nav-item');

  // Category mapping to CSS class and default weights
  const categoryMap = {
    'อาหาร': { class: 'food', icon: '🍽️', baseAmt: 4500 },
    'เดินทาง': { class: 'travel', icon: '🚇', baseAmt: 2200 },
    'ช้อปปิ้ง': { class: 'shopping', icon: '🛍️', baseAmt: 3100 },
    'บ้าน': { class: 'home', icon: '🏠', baseAmt: 1500 },
    'บันเทิง': { class: 'fun', icon: '🎬', baseAmt: 2000 },
    'อื่นๆ': { class: 'other', icon: '📦', baseAmt: 800 }
  };

  // --- Initial State Management ---
  const STORAGE_KEY_TRANSACTIONS = 'expense_tracker_transactions';
  const STORAGE_KEY_TOTAL = 'expense_tracker_total';
  const STORAGE_KEY_CATEGORIES = 'expense_tracker_category_totals';

  let currentCategoryTotals = {};
  let totalExpense = 12500.00;

  // Initialize Date Input to Today (YYYY-MM-DD)
  const setTodayDate = () => {
    if (dateInput) {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      dateInput.value = `${yyyy}-${mm}-${dd}`;
    }
  };

  // Format currency helper
  const formatCurrency = (num) => {
    return '฿ ' + Number(num).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  // Extract category clean name from chip text (removes emoji)
  const getSelectedCategoryName = () => {
    const activeChip = document.querySelector('.chip.active');
    if (!activeChip) return 'อาหาร';
    return activeChip.textContent.replace(/^[^\s]+\s*/, '').trim();
  };

  // --- Category Chips Selection ---
  categoryChips.forEach((chip) => {
    chip.addEventListener('click', (e) => {
      e.preventDefault();
      categoryChips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
    });
  });

  // --- Navigation Links Active Toggle ---
  navItems.forEach((nav) => {
    nav.addEventListener('click', (e) => {
      e.preventDefault();
      navItems.forEach((item) => item.classList.remove('active'));
      nav.classList.add('active');
    });
  });

  // --- Keypad and Amount Input Handling ---
  keypadButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const action = btn.dataset.action;
      const value = btn.dataset.value;

      let currentVal = amountInput.value.trim();

      if (action === 'backspace') {
        if (currentVal.length <= 1 || currentVal === '0.00') {
          amountInput.value = '0.00';
        } else {
          amountInput.value = currentVal.slice(0, -1);
        }
        return;
      }

      if (value) {
        if (currentVal === '0.00' || currentVal === '0') {
          if (value === '.') {
            amountInput.value = '0.';
          } else {
            amountInput.value = value;
          }
        } else {
          if (value === '.' && currentVal.includes('.')) {
            return; // Prevent duplicate decimal points
          }
          // Limit to two decimal places
          if (currentVal.includes('.')) {
            const parts = currentVal.split('.');
            if (parts[1] && parts[1].length >= 2) {
              return;
            }
          }
          amountInput.value = currentVal + value;
        }
      }
    });
  });

  // Format amount input on blur
  if (amountInput) {
    amountInput.addEventListener('focus', () => {
      if (amountInput.value === '0.00') {
        amountInput.value = '';
      }
    });

    amountInput.addEventListener('blur', () => {
      const parsed = parseFloat(amountInput.value);
      if (isNaN(parsed) || parsed <= 0) {
        amountInput.value = '0.00';
      } else {
        amountInput.value = parsed.toFixed(2);
      }
    });
  }

  // --- Chart Update Function ---
  const updateBarChart = () => {
    const values = Object.values(currentCategoryTotals);
    const maxVal = Math.max(...values, 5000);

    Object.keys(categoryMap).forEach((catName) => {
      const config = categoryMap[catName];
      const bar = document.querySelector(`.bar.${config.class}`);
      if (bar) {
        const catAmount = currentCategoryTotals[catName] || 0;
        const percentage = Math.min(Math.max(Math.round((catAmount / maxVal) * 100), 18), 100);
        bar.style.height = `${percentage}%`;
        bar.title = `${catName}: ${formatCurrency(catAmount)}`;
      }
    });
  };

  // --- Reset Form Helper ---
  const resetForm = () => {
    if (amountInput) amountInput.value = '0.00';
    if (noteInput) noteInput.value = '';
    setTodayDate();
    categoryChips.forEach((c, idx) => {
      if (idx === 0) c.classList.add('active');
      else c.classList.remove('active');
    });
  };

  // --- Add Transaction to DOM Table ---
  const prependTransactionRow = (dateText, noteText, categoryText, amountVal) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${dateText}</td>
      <td>${noteText}</td>
      <td>${categoryText}</td>
      <td class="amount negative">-${formatCurrency(amountVal)}</td>
    `;
    historyBody.prepend(tr);
  };

  // --- Save Transaction Handler ---
  const handleSave = (e) => {
    if (e) e.preventDefault();

    const rawAmount = parseFloat(amountInput.value);
    const note = noteInput ? noteInput.value.trim() : '';
    const dateVal = dateInput ? dateInput.value : '';
    const category = getSelectedCategoryName();

    if (isNaN(rawAmount) || rawAmount <= 0) {
      alert('กรุณาระบุจำนวนเงินที่มากกว่า 0');
      amountInput.focus();
      return;
    }

    if (!note) {
      alert('กรุณากรอกรายละเอียดบันทึกรายการ');
      if (noteInput) noteInput.focus();
      return;
    }

    if (!dateVal) {
      alert('กรุณาเลือกวันที่');
      return;
    }

    // Format date display (e.g. วันนี้, or formatted date)
    const todayStr = new Date().toISOString().split('T')[0];
    let dateDisplay = dateVal;
    if (dateVal === todayStr) {
      dateDisplay = 'วันนี้';
    }

    // Prepend row
    prependTransactionRow(dateDisplay, note, category, rawAmount);

    // Update totals
    totalExpense += rawAmount;
    if (totalExpenseEl) {
      totalExpenseEl.textContent = formatCurrency(totalExpense);
    }

    // Update category breakdown
    currentCategoryTotals[category] = (currentCategoryTotals[category] || 0) + rawAmount;
    updateBarChart();

    // Persist to LocalStorage
    saveStateToStorage();

    // Reset input fields
    resetForm();

    // Visual feedback
    showFeedback('✓ บันทึกรายจ่ายสำเร็จ!');
  };

  // --- Feedback Toast Notification ---
  const showFeedback = (message) => {
    let toast = document.getElementById('expense-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'expense-toast';
      toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: #10b981;
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

    toast.textContent = message;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
    }, 2000);
  };

  // --- LocalStorage Helpers ---
  const saveStateToStorage = () => {
    try {
      localStorage.setItem(STORAGE_KEY_TOTAL, totalExpense.toString());
      localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(currentCategoryTotals));
      if (historyBody) {
        localStorage.setItem(STORAGE_KEY_TRANSACTIONS, historyBody.innerHTML);
      }
    } catch (err) {
      console.warn('LocalStorage save error:', err);
    }
  };

  const loadStateFromStorage = () => {
    try {
      const savedTotal = localStorage.getItem(STORAGE_KEY_TOTAL);
      if (savedTotal !== null) {
        totalExpense = parseFloat(savedTotal);
        if (totalExpenseEl) {
          totalExpenseEl.textContent = formatCurrency(totalExpense);
        }
      }

      const savedCategories = localStorage.getItem(STORAGE_KEY_CATEGORIES);
      if (savedCategories) {
        currentCategoryTotals = JSON.parse(savedCategories);
      } else {
        // Initial mock breakdown
        Object.keys(categoryMap).forEach((key) => {
          currentCategoryTotals[key] = categoryMap[key].baseAmt;
        });
      }

      const savedRows = localStorage.getItem(STORAGE_KEY_TRANSACTIONS);
      if (savedRows && historyBody) {
        historyBody.innerHTML = savedRows;
      }
    } catch (err) {
      console.warn('LocalStorage load error:', err);
      // Fallback
      Object.keys(categoryMap).forEach((key) => {
        currentCategoryTotals[key] = categoryMap[key].baseAmt;
      });
    }

    updateBarChart();
  };

  // --- Event Listeners Attachment ---
  if (saveBtn) {
    saveBtn.addEventListener('click', handleSave);
  }

  if (cancelBtn) {
    cancelBtn.addEventListener('click', (e) => {
      e.preventDefault();
      resetForm();
    });
  }

  // Initialize application
  setTodayDate();
  loadStateFromStorage();
});
