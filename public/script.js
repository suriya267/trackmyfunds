document.addEventListener("DOMContentLoaded", () => {
    const descriptionInput = document.getElementById('description');
    const amountInput = document.getElementById('amount');
    const addEntryButton = document.getElementById('add_entry');
    const canelButton = document.getElementById('cancel');
    const entryList = document.getElementById('entry_list');
    const totalIncome = document.getElementById('total_income');
    const totalExpense = document.getElementById('total_expense');
    const netBalance = document.getElementById('net_balance');
    const resetButton = document.getElementById('reset_fields');

    let entries = JSON.parse(sessionStorage.getItem('data')) || [];

    function saveEntries() {
        sessionStorage.setItem('data', JSON.stringify(entries));
    }

    function updateTotal() {
        const income = entries.filter(entry => entry.type === 'income').reduce((acc, entry) => acc + entry.amount, 0);
        const expense = entries.filter(entry => entry.type === 'expense').reduce((acc, entry) => acc + entry.amount, 0);
        totalIncome.textContent = `₹${income.toFixed(2)}`;
        totalExpense.textContent = `₹${expense.toFixed(2)}`;
        netBalance.textContent = `₹${(income - expense).toFixed(2)}`;
    }

    let editingData=null;

    function renderEntries() {
        
        if(editingData===null){            
            canelButton.setAttribute('style', 'display: none;')
        }else{
            canelButton.setAttribute('style', 'display: block;')
        }

        const list = document.getElementById('list');
        
        if(entries.length>0){
            list.style.display="block"
        }else{
            list.style.display="none"
        }

        entryList.innerHTML = '';
        const filter = document.querySelector('input[name="filter"]:checked').id;
        const filteredEntries = entries.filter(entry => filter === 'all' || entry.type === filter);        
        filteredEntries.forEach(entry => {
            const li = document.createElement('li');
            li.classList.add('flex', 'justify-between', 'items-center', 'p-4', 'bg-gray-200', 'rounded-lg', 'shadow-md', 'space-x-4');

            li.innerHTML = `
        <div class="flex-1">
            <strong class="text-lg">${entry.description}</strong>
            <div class="text-sm text-gray-500">${entry.type}</div>
        </div>
        <div class="flex items-center space-x-4">
            <span class="text-lg font-semibold">₹${entry.amount.toFixed(2)}</span>
           <button class="edit-button text-white px-4 py-2 rounded-lg edit-btn" data-id="${entry.id}">Edit</button>
            <button class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-400 delete-btn" data-id="${entry.id}">Delete</button>
        </div>
    `;
            entryList.appendChild(li);
        });

        updateTotal();
    }

    addEntryButton.addEventListener('click', () => {
        const description = descriptionInput.value.trim();
        const amount = parseFloat(amountInput.value.trim());
        const type = document.querySelector('input[name="entry-type"]:checked').id === 'income_entry' ? 'income' : 'expense';

        if (description && isNaN(amount)===false) {
            const newEntry = { id: Date.now(), description, amount, type };
            entries.push(newEntry);
            saveEntries();
            editingData=null;
            renderEntries();
            descriptionInput.value = '';
            amountInput.value = '';
            addEntryButton.innerText = 'Add Entry';

        }
    });

    canelButton.addEventListener('click', () => {
            descriptionInput.value = '';
            amountInput.value = '';
            console.log("in click");
            entries.push(editingData);
            saveEntries();
            editingData=null;
            renderEntries();
    });

    entryList.addEventListener('click', (event) => {
        const id = event.target.dataset.id;
        if (event.target.classList.contains('delete-btn')) {
            entries = entries.filter(entry => entry.id !== parseInt(id));
            saveEntries();
            renderEntries();
        } else if (event.target.classList.contains('edit-btn')) {
            const entry = entries.find(entry => entry.id === parseInt(id));
            editingData=entry;
            descriptionInput.value = entry.description;
            amountInput.value = entry.amount;
            document.querySelector(`input[id="${entry.type}_entry"]`).checked = true;
            entries = entries.filter(entry => entry.id !== parseInt(id));
            addEntryButton.innerText = 'Save';
            renderEntries();
        }
    });

    resetButton.addEventListener('click', () => {
        descriptionInput.value = '';
        amountInput.value = '';
        entries=[];
        sessionStorage.clear();
        editingData=null
        renderEntries();
    });

    document.querySelectorAll('input[name="filter"]').forEach(input => {
        input.addEventListener('change', renderEntries);
    });

    renderEntries();

});
