/**
 * Expense Tracker Dashboard - Interactive Logic
 * File: Thanapat_RecordExpenses.js
 * Connects with Thanapat_RecordExpenses_prototype.html and DayByDay central data layer
 */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof DayByDay === 'undefined') {
    console.error('DayByDay data layer is missing!');
    return;
  }

  // --- DOM Element References ---
  const amountInput = document.getElementById('amountInput');
  const dateInput = document.getElementById('dateInput') || document.querySelector('input[type="date"]');
  const noteInput = document.getElementById('noteInput') || document.querySelector('textarea');
  const saveBtn = document.getElementById('saveExpenseBtn') || document.querySelector('.primary-btn');
  const cancelBtn = document.getElementById('cancelExpenseBtn') || document.querySelector('.ghost-btn');
  const totalExpenseEl = document.getElementById('totalExpense');
  const historyBody = document.getElementById('historyBody');
  const categoryChips = document.querySelectorAll('.chip');
  const keypadButtons = document.querySelectorAll('.keypad-btn');
  const navItems = document.querySelectorAll('.nav-item');

  const btnP1 = document.getElementById('btn-expense-persona-1');
  const btnP2 = document.getElementById('btn-expense-persona-2');
  const avatarEl = document.getElementById('expense-avatar');
  const nameEl = document.getElementById('expense-persona-name');
  const roleEl = document.getElementById('expense-persona-role');

  // Category mapping to chart CSS classes
  const categoryMap = {
    'อาหาร': { class: 'food', icon: '🍽️' },
    'เดินทาง': { class: 'travel', icon: '🚇' },
    'ช้อปปิ้ง': { class: 'shopping', icon: '🛍️' },
    'บ้าน': { class: 'home', icon: '🏠' },
    'บันเทิง': { class: 'fun', icon: '🎬' },
    'อื่นๆ': { class: 'other', icon: '📦' }
  };

  let currentPersona = DayByDay.getCurrentPersona();

  // Initialize Date Input to Today
  const setTodayDate = () => {
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.value = today;
    }
  };

  // Get selected category name (removes emoji)
  const getSelectedCategoryName = () => {
    const activeChip = document.querySelector('.chip.active');
    if (!activeChip) return 'อาหาร';
    return activeChip.textContent.replace(/^[^\s]+\s*/, '').trim();
  };

  // --- Render Persona Profile & Overview ---
  const renderPage = (personaId) => {
    currentPersona = personaId;
    const meta = DayByDay.getPersonaDetails(personaId);

    // Update left sidebar buttons
    if (btnP1) btnP1.classList.toggle('active', personaId === 'persona1');
    if (btnP2) btnP2.classList.toggle('active', personaId === 'persona2');

    // Update hero banner
    if (avatarEl) {
      avatarEl.src = decodeURIComponent(meta.avatar);
      avatarEl.alt = meta.name;
    }
    if (nameEl) nameEl.textContent = `บันทึกรายจ่าย: ${meta.name}`;
    if (roleEl) roleEl.textContent = meta.role;

    // Update Total Expense Card
    const fin = DayByDay.getFinance(personaId);
    if (totalExpenseEl) {
      totalExpenseEl.textContent = DayByDay.formatCurrency(fin.expense);
    }

    // Update Chart
    updateCategoryChart(personaId);

    // Update Transactions Table
    renderTransactionsTable(personaId);
  };

  // --- Update Category Bar Chart ---
  const updateCategoryChart = (personaId) => {
    const totals = DayByDay.getCategoryTotals(personaId);
    const values = Object.values(totals);
    const maxVal = Math.max(...values, 2000);

    Object.keys(categoryMap).forEach((catName) => {
      const config = categoryMap[catName];
      const bar = document.querySelector(`.bar.${config.class}`);
      if (bar) {
        const catAmount = totals[catName] || 0;
        const percentage = Math.min(Math.max(Math.round((catAmount / maxVal) * 100), 16), 100);
        bar.style.height = `${percentage}%`;
        bar.title = `${catName}: ${DayByDay.formatCurrency(catAmount)}`;
      }
    });
  };

  // --- Render Transactions History Table ---
  const renderTransactionsTable = (personaId) => {
    if (!historyBody) return;
    const txs = DayByDay.getTransactions(personaId);

    if (txs.length === 0) {
      historyBody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align: center; color: var(--muted); padding: 24px;">
            ยังไม่มีรายการบันทึก กรอกข้อมูลด้านขวาเพื่อบันทึกรายการแรก
          </td>
        </tr>
      `;
      return;
    }

    historyBody.innerHTML = txs.map(tx => {
      const isExpense = tx.type !== 'income';
      const amountClass = isExpense ? 'amount negative' : 'amount';
      const prefix = isExpense ? '-' : '+';
      const amountStyle = isExpense ? 'color: var(--danger); font-weight: 700;' : 'color: #10b981; font-weight: 700;';

      return `
        <tr data-id="${tx.id}">
          <td>${tx.displayDate || tx.date}</td>
          <td style="font-weight: 500;">${tx.note}</td>
          <td><span style="font-size: 0.85rem; padding: 2px 8px; border-radius: 6px; background: #f3f4f6;">${tx.category}</span></td>
          <td class="${amountClass}" style="${amountStyle}">${prefix}${DayByDay.formatCurrency(tx.amount)}</td>
          <td style="text-align: center;">
            <button class="delete-tx-btn" data-id="${tx.id}" title="ลบรายการนี้" style="background: none; border: none; cursor: pointer; color: #94a3b8; font-size: 0.95rem; padding: 4px; border-radius: 4px; transition: color 0.15s ease;">
              🗑️
            </button>
          </td>
        </tr>
      `;
    }).join('');

    // Attach delete handlers
    historyBody.querySelectorAll('.delete-tx-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const txId = e.currentTarget.dataset.id;
        if (confirm('คุณต้องการลบรายการนี้ใช่หรือไม่? ยอดเงินจะถูกคำนวณคืนอัตโนมัติ')) {
          DayByDay.deleteTransaction(txId, currentPersona);
          renderPage(currentPersona);
          DayByDay.showToast('ลบรายการและปรับปรุงยอดเงินเรียบร้อยแล้ว');
        }
      });
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

  // --- Category Chips Selection ---
  categoryChips.forEach((chip) => {
    chip.addEventListener('click', (e) => {
      e.preventDefault();
      categoryChips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
    });
  });

  // --- Persona Switch Handlers ---
  if (btnP1) {
    btnP1.addEventListener('click', () => {
      currentPersona = 'persona1';
      DayByDay.setCurrentPersona('persona1');
      renderPage(currentPersona);
      DayByDay.showToast('สลับมุมมองผู้ใช้เป็น: คุณกิตติศักดิ์ (Project Manager)');
    });
  }

  if (btnP2) {
    btnP2.addEventListener('click', () => {
      currentPersona = 'persona2';
      DayByDay.setCurrentPersona('persona2');
      renderPage(currentPersona);
      DayByDay.showToast('สลับมุมมองผู้ใช้เป็น: คุณอิศรา (นักศึกษา & บาริสต้า)');
    });
  }

  // --- Keypad and Amount Input Handling ---
  keypadButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const action = btn.dataset.action;
      const value = btn.dataset.value;

      let currentVal = amountInput.value.trim();

      if (action === 'backspace') {
        if (currentVal.length <= 1 || currentVal === '0.00' || currentVal === '0') {
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
            return;
          }
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

  // Format amount input on focus and blur
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

  // --- Save Transaction Handler ---
  const handleSave = (e) => {
    if (e) e.preventDefault();

    const rawAmount = parseFloat(amountInput.value);
    const note = noteInput ? noteInput.value.trim() : '';
    const dateVal = dateInput ? dateInput.value : '';
    const category = getSelectedCategoryName();

    if (isNaN(rawAmount) || rawAmount <= 0) {
      DayByDay.showToast('กรุณาระบุจำนวนเงินที่มากกว่า 0', false);
      amountInput.focus();
      return;
    }

    // Default note gracefully if left empty
    const finalNote = note || `ค่า${category}`;

    // Add to central DayByDay layer
    const newTx = DayByDay.addTransaction({
      persona: currentPersona,
      type: 'expense',
      category: category,
      amount: rawAmount,
      note: finalNote,
      date: dateVal || new Date().toISOString().split('T')[0]
    });

    if (newTx) {
      resetForm();
      renderPage(currentPersona);
      DayByDay.showToast(`บันทึกรายจ่าย ${DayByDay.formatCurrency(rawAmount)} หมวด "${category}" สำเร็จ!`);
    }
  };

  // --- Event Listeners Attachment ---
  if (saveBtn) {
    saveBtn.addEventListener('click', handleSave);
  }

  if (cancelBtn) {
    cancelBtn.addEventListener('click', (e) => {
      e.preventDefault();
      resetForm();
      DayByDay.showToast('ยกเลิกรายการแล้ว');
    });
  }

  // --- Global Event Sync Listeners ---
  window.addEventListener('daybyday:data-updated', () => {
    renderPage(currentPersona);
  });

  window.addEventListener('daybyday:persona-changed', (e) => {
    if (e.detail && e.detail.persona) {
      currentPersona = e.detail.persona;
      renderPage(currentPersona);
    }
  });

  window.addEventListener('storage', () => {
    currentPersona = DayByDay.getCurrentPersona();
    renderPage(currentPersona);
  });

  // Initialize
  setTodayDate();
  renderPage(currentPersona);
});
