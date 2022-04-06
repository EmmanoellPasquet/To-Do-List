const taskInput = document.querySelector('.newTask-input');
const btnAdd = document.querySelector('.btn-addTask');
const tasks = document.querySelector('.tasks');
const erase = document.querySelector('.delete');
const eraseAll = document.querySelector('.removeAll');
const taskList = document.querySelector('.taskList');
const counter = document.querySelector('.counter');
const deleteAll = document.querySelector('.deleteAll');
const globalSelector = document.querySelector('.globalSelector');
const checkButton = document.querySelector('.checkboxOuter');




btnAdd.addEventListener('click', () => {
    if (!taskInput.value) return;
    createTask(taskInput.value);
});

taskInput.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
        if (!taskInput.value) return;
        createTask(taskInput.value);
    }
});

taskList.addEventListener('click', (e) => {
    const el = e.target;
    if (el.classList.contains('delete')) {
        el.parentElement.remove();
        saveTasks();
    }
});

function clearInput() {
    taskInput.value = '';
    taskInput.focus();
}

function createList() {
    const list = document.createElement('li');
    list.setAttribute('class', 'listItems');

    return list;
}

function createCheckbox() {
    const checkbox = document.createElement('input')
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('class', 'checkbox');
    checkbox.setAttribute('title', 'Done!');

    checkbox.addEventListener('change', (e) => {
        const el = e.target;

        if (el.checked) {
            el.parentElement.classList.add('checked');
        } else {
            el.parentElement.classList.remove('checked');
        }
    });

    return checkbox;
}

function createTask(taskText) {
    const checkbox = createCheckbox();
    const list = createList();

    counter.classList.remove('hidden');
    list.innerHTML = taskText;

    tasks.appendChild(list);
    list.prepend(checkbox)

    clearInput();
    createDelButton(list);
    saveTasks();
}

function saveTasks() {
    const tasksToBeSaved = tasks.querySelectorAll('li');
    const listOfTasks = [];

    for (let i of tasksToBeSaved) {
        let textOfTask = i.innerText;
        listOfTasks.push(textOfTask);
    }

    listOfTasks.length > 0 ? counter.innerHTML = 'Current tasks: ' + listOfTasks.length : counter.innerHTML = '';

    if (listOfTasks.length === 2) {
        deleteAll.classList.remove('hidden');
        globalSelector.classList.remove('hidden');
        checkButton.classList.remove('hidden');
    }
    else if (listOfTasks.length <= 1) {
        deleteAll.classList.add('hidden');
        globalSelector.classList.add('hidden');
        checkButton.classList.add('hidden');


    }

    const tasksJSON = JSON.stringify(listOfTasks);
    localStorage.setItem('taskList', tasksJSON);

}

function createDelButton(list) {
    const delButton = document.createElement('button');
    delButton.setAttribute('title', 'Discard this task');
    delButton.setAttribute('class', 'delete');
    list.appendChild(delButton);
}

function savedTasks() {
    const taskList = localStorage.getItem('taskList');
    const taskList2 = taskList ? JSON.parse(taskList) : [];

    for (let i of taskList2) {
        createTask(i);
    }
}

function deleteTasks() {

    const deletedList = tasks.querySelectorAll('li');
    for (let i = 0; i < deletedList.length; i++) {
        deletedList[i].remove();
    }

    localStorage.removeItem('taskList');
    deleteAll.classList.add('hidden');
    globalSelector.classList.add('hidden');
    counter.classList.add('hidden');
    checkButton.classList.add('hidden');
}

function selectAll() {

    globalSelector.addEventListener('change', (e) => {
        const el = e.target;

        const allBoxes = document.querySelectorAll('.checkbox');
        const fullList = tasks.querySelectorAll('li')
        const arrayList = []

        el.target === checkButton ? allBoxes.checked : '';

        for (let i = 0; i < allBoxes.length; i++) {
            if (el.checked) {
                allBoxes[i].checked = true;
                arrayList.push(fullList[i]);
                arrayList[i].classList.add('checked');
            } else {
                allBoxes[i].checked = false;
                arrayList.push(fullList[i]);
                arrayList[i].classList.remove('checked');
            }
        }
    });
}

deleteAll.addEventListener('click', deleteTasks);
savedTasks();
selectAll();

