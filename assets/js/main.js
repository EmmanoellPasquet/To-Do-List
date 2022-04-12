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
const popup = document.querySelector('.pop-up');
const popClose = document.querySelector('.popClose');
const background = document.querySelector('.background');

popClose.addEventListener('click', () => {
    popup.classList.add('no-show')
    background.classList.add('hidden')
});

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

function createCheckbox(checked = false) {

    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('class', 'checkbox');
    checkbox.setAttribute('title', 'Done!');

    checkbox.checked = checked;

    checkbox.addEventListener('change', (e) => {
        const el = e.target;

        el.checked ? el.parentElement.classList.add('checked') : el.parentElement.classList.remove('checked');

        moveTasks();
        taskCounter();
        saveTasks();
    });

    return checkbox;
}

function createTask(taskName, taskValue = false) {

    const list = createList();
    const checkbox = createCheckbox(taskValue);

    taskValue === true ? list.classList.add('checked') : null;

    counter.classList.remove('hidden');
    list.innerHTML = taskName;

    tasks.prepend(list);
    list.prepend(checkbox);

    clearInput();
    createDelButton(list);
    saveTasks();
}

let scrollHeight = Math.max(
    document.body.offsetHeight, document.documentElement.offsetHeight
);

function saveTasks() {
    const tasksToBeSaved = tasks.querySelectorAll('li');
    const checkBoxes = tasks.querySelectorAll('input[type=checkbox]')
    const listOfTasks = [];
    const statusOfTask = [];

    for (let i = 0; i < tasksToBeSaved.length; i++) {
        listOfTasks.push({
            label: tasksToBeSaved[i].innerText,
            value: (checkBoxes[i].checked) ? true : false
        });
    }

    const tasksJSON = JSON.stringify(listOfTasks);
    localStorage.setItem('taskList', tasksJSON);

    taskCounter();
}


function savedTasks() {
    const taskList = localStorage.getItem('taskList');
    const taskList2 = JSON.parse(taskList);

    if (taskList2) {
        for (let task of taskList2) {
            createTask(task.label, task.value)
            if (task.value) {
                task.value === taskList2.length - 1;
            }
        }
    }
    moveTasks()
}

function createDelButton(list) {
    const delButton = document.createElement('button');
    delButton.setAttribute('title', 'Discard this task');
    delButton.setAttribute('class', 'delete');
    list.appendChild(delButton);
}


function taskCounter() {

    const allTasks = document.querySelector('.totalTasks');
    const partialTasks = document.querySelector('.partialTasks');
    const finishedTasks = document.querySelector('.finishedTasks');
    const tasksToBeSaved = tasks.querySelectorAll('li');
    let result = tasksToBeSaved.length;
    let completed = 0;

    tasksToBeSaved.forEach((i) => {
        if (i.classList.contains('checked')) {
            completed++;
        }
    });

    tasksToBeSaved.length > 0 ? allTasks.innerHTML = 'Tasks: ' + tasksToBeSaved.length : tasksToBeSaved.innerHTML = '';
    partialTasks.innerHTML = 'Done: ' + completed;
    finishedTasks.innerHTML = 'To do: ' + (result - completed);

    if (result === 2) {
        deleteAll.classList.remove('hidden');
        globalSelector.classList.remove('hidden');
        checkButton.classList.remove('hidden');
    }
    else if (result <= 1) {
        deleteAll.classList.add('hidden');
        globalSelector.classList.add('hidden');
        checkButton.classList.add('hidden');
    }

    result < 1 ? counter.classList.add('opacity') : counter.classList.remove('opacity');

    if (result === completed && completed != 0) {
        popup.classList.remove('no-show');
        background.classList.remove('hidden');

    } else {
        popup.classList.add('no-show');
        background.classList.add('hidden');

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
    checkButton.classList.add('hidden');
}

function selectAll() {

    globalSelector.addEventListener('change', (e) => {
        const el = e.target;

        const allBoxes = document.querySelectorAll('.checkbox');
        const fullList = tasks.querySelectorAll('li')
        const arrayList = [];

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
        taskCounter();
        moveTasks();
        saveTasks();
    });
}

deleteAll.addEventListener('click', () => {
    deleteTasks();
    taskCounter();
});

function moveTasks() {

    const arr = Array.from(tasks.querySelectorAll('li'));

    for (let i = 0; i < arr.length; i++) {
        if (!arr[i].classList.contains('checked')) {
            arr[i].parentNode.insertBefore(arr[i], arr[i].parentNode.firstChild);
        } else {
            arr[i].parentNode.insertBefore(arr[i], arr[i].parentNode.lastChild);
        }
    }
}

function footerAnimate() {
    const text1 = document.querySelector('.gitText');
    const text2 = document.querySelector('.linkedinText');
    const iconGit = document.querySelector('.iconGit');
    const iconLinkedin = document.querySelector('.iconLinkedin');
    const winSize = window.innerWidth;

    text1.innerHTML = text1.textContent.replace(/\S/g, "<span>$&</span>");
    text2.innerHTML = text2.textContent.replace(/\S/g, "<span>$&</span>");

    const element = document.querySelectorAll('span');

    for (let i = 0; i < element.length; i++) {
        element[i].style.transform = "rotate(" + i * 18 + "deg)"
    }

    const show = function showIcon(e) {
        const el = e.type;
        const test = this.children;

        if (el === 'mouseover' || el === 'mouseout') {
            for (let i = 0; i < test.length; i++) {
                test[i].classList.contains('hidden') ? test[i].classList.remove('hidden') : test[i].classList.add('hidden');
            }
        }
    }

    winSize < 600 ? text1.classList.remove('hidden') + text2.classList.remove('hidden') : '';

    iconGit.addEventListener('mouseover', show, false);
    iconLinkedin.addEventListener('mouseover', show, false);
    iconGit.addEventListener('mouseout', show, false);
    iconLinkedin.addEventListener('mouseout', show, false);
}

footerAnimate();
savedTasks();
selectAll();


