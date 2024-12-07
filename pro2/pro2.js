// Select Elements
const expenseName = document.getElementById('expense-name');
const expenseAmount = document.getElementById('expense-amount');
const expenseDate = document.getElementById('expense-date');
const addButton = document.getElementById('add-button');
const expenseList = document.getElementById('expenses');
const totalExpense = document.getElementById('total-expense');

// Expenses Array
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Add Expense
addButton.addEventListener('click', () => {
  if (expenseName.value && expenseAmount.value && expenseDate.value) {
    const expense = {
      name: expenseName.value,
      amount: parseFloat(expenseAmount.value),
      date: expenseDate.value
    };
    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpenses();
    clearInputs();
  }
});

// Render Expenses
function renderExpenses() {
  expenseList.innerHTML = '';
  let total = 0;

  expenses.forEach((expense, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${expense.name} - ₹${expense.amount} (${expense.date})
      <button class="delete" data-index="${index}">Delete</button>
    `;
    expenseList.appendChild(li);
    total += expense.amount;
  });

  totalExpense.textContent = total.toFixed(2);

  // Add Delete Functionality
  document.querySelectorAll('.delete').forEach(button => {
    button.addEventListener('click', (e) => {
      const index = e.target.dataset.index;
      expenses.splice(index, 1);
      localStorage.setItem('expenses', JSON.stringify(expenses));
      renderExpenses();
    });
  });
}

// Clear Input Fields
function clearInputs() {
  expenseName.value = '';
  expenseAmount.value = '';
  expenseDate.value = '';
}

// Initial Render
renderExpenses();