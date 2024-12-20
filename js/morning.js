let routineOptions = JSON.parse(localStorage.getItem('routineOptions')) || [];

function addOption() {
    const newOption = document.getElementById('new-option').value.trim();
    if (newOption && !routineOptions.includes(newOption)) {
        routineOptions.push(newOption);
        localStorage.setItem('routineOptions', JSON.stringify(routineOptions));
        updateOptionList();
        updateRoutineSelects();
        document.getElementById('new-option').value = '';
    }
}

function clearAllOptions() {
    routineOptions = [];
    localStorage.removeItem('routineOptions');
    updateOptionList();
    updateRoutineSelects();
}

function updateOptionList() {
    const optionList = document.getElementById('option-list');
    optionList.innerHTML = '';
    routineOptions.forEach(option => {
        const li = document.createElement('li');
        li.textContent = option;
        optionList.appendChild(li);
    });
}

function updateRoutineSelects() {
    const selects = document.querySelectorAll('.routine-tracker select');
    
    selects.forEach(select => {
        const currentValue = select.value;
        select.innerHTML = '<option value="">Select a routine</option>';
        routineOptions.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.textContent = option;
            select.appendChild(optionElement);
        });
        select.value = currentValue;
    });
}

function saveRoutine(timeOfDay, routineNumber) {
    const routineSelect = document.getElementById(`${timeOfDay}-routine-select-${routineNumber}`);
    const selectedRoutine = routineSelect.value;
    
    if (selectedRoutine) {
        localStorage.setItem(`${timeOfDay}-routine-${routineNumber}`, selectedRoutine);
        displaySavedRoutines();
    }
}

function displaySavedRoutines() {
    const morningRoutinesDiv = document.getElementById('saved-morning-routines');
    
    morningRoutinesDiv.innerHTML = '';
    
    for (let i = 1; i <= 3; i++) {
        const morningRoutine = localStorage.getItem(`morning-routine-${i}`);
        
        if (morningRoutine) {
            const li = document.createElement('li');
            li.textContent = `Routine ${i}: ${morningRoutine}`;
            morningRoutinesDiv.appendChild(li);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateOptionList();
    updateRoutineSelects();
    displaySavedRoutines();

    for (let i = 1; i <= 3; i++) {
        const morningRoutine = localStorage.getItem(`morning-routine-${i}`);
        if (morningRoutine) document.getElementById(`morning-routine-select-${i}`).value = morningRoutine;
    }
});
