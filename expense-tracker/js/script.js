document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('expense-form');
    const titleInput = document.getElementById('title');
    const amountInput = document.getElementById('amount');
    const categoryInput = document.getElementById('category');
    const expenseList = document.getElementById('expense-list');
    const totalAmount = document.getElementById('total-amount');

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    function updateLocalStorage() {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    function calculateTotal() {
        const total = expenses.reduce((acc, item) => acc + item.amount, 0);
        totalAmount.innerText = `Rs. ${total.toFixed(2)}`;
    }

    function renderExpenses() {
        expenseList.innerHTML = '';
        expenses.forEach((expense, index) => {
            const li = document.createElement('li');
            li.classList.add('expense-item');
            li.innerHTML = `
                <div class="expense-info">
                    <span class="expense-title">${expense.title}</span>
                    <span class="expense-category">${expense.category}</span>
                </div>
                <div>
                    <span class="expense-amount">- Rs. ${expense.amount.toFixed(2)}</span>
                    <button class="delete-btn" onclick="deleteExpense(${index})"><i class="fas fa-trash"></i></button>
                </div>
            `;
            expenseList.appendChild(li);
        });
        calculateTotal();
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const newExpense = {
            title: titleInput.value,
            amount: parseFloat(amountInput.value),
            category: categoryInput.value
        };

        expenses.push(newExpense);
        updateLocalStorage();
        renderExpenses();

        titleInput.value = '';
        amountInput.value = '';
        categoryInput.value = 'Food';
    });

    window.deleteExpense = (index) => {
        expenses.splice(index, 1);
        updateLocalStorage();
        renderExpenses();
    };

    renderExpenses();
});
