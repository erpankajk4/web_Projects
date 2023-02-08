
var TodoListApp = (function () {  // IIFE function used so that multiple JS file variables and functions don't conflict to each other

    let tasks = []; // list of task will be added in array form , must use let, otherwise delete operation will not work
    const tasksList = document.getElementById('list');          //  <ul id="list">  <ul>
    const addTaskInput = document.getElementById('add');        // <input placeholder="Add a task" class="add-task" id="add" data-helloWord="asdasdas"/>
    const tasksCounter = document.getElementById('tasks-counter');  // count no. of task entered
    const addBtn = document.querySelector('button'); // must use querySelector not tagName
    // console.log('Working');
    const CompletedTask = document.getElementById('Completed-task');
    const UncompleteTask = document.getElementById('Uncomplete-task');


    async function fetchTodos() { // don't use async we only fectch use
        /*  
         // Get request
           fetch('https://jsonplaceholder.typicode.com/todos') // this fetch returns a promise
           .then(function (response){
               // console.log(response);
               return response.json(); // this again returns a promise
           }).then(function (data){
               // console.log(data);
               tasks = data.slice(0, 10);
               renderList();
           })
           .catch(function (error){
               // console.log('error',error);
           })    
                         */
        //  or by async function with await function
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos');
            const data = await response.json();
            tasks = data.slice(0, 10);
            renderList();
        } catch (error) {
            console.log('error', error);
        }
    }

    // addTaskToDOM function used by renderList() function
    function addTaskToDOM(task) {
        const li = document.createElement('li');

        li.innerHTML =
            ` <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''}
          class="custom-checkbox">
          <label for="${task.id}">${task.title}</label>
          <img src="bin.svg" class="delete" data-id="${task.id}" />
          `;
        tasksList.append(li);    //The Element.append() method inserts a set of Node objects or string objects after the last child of the Element .  
    }

    // Function to rendering the list of tasks in DOM 
    function renderList() {
        tasksList.innerHTML = '';

        for (let i = 0; i < tasks.length; i++) {
            addTaskToDOM(tasks[i]);
        }
        tasksCounter.innerHTML = tasks.length;
        countcheckedTask();
    }

    // count checked and unchecked tasks
    function countcheckedTask() {
        let count_c = 0;
        let count_c1 = 0
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].completed === true) {
                count_c++;
            }
            else count_c1++;
        }
        CompletedTask.innerHTML = count_c;
        UncompleteTask.innerHTML = count_c1;

    }

    function toggleTask(taskId) { // markTaskAsComplete
        const task = tasks.filter(function (task) { // filter only that task that matches to taskId
            return task.id === taskId || task.id === Number(taskId); // in fectching API, id name is in number form we Number() used
        });

        if (task.length > 0) {
            const currentTask = task[0];

            currentTask.completed = !currentTask.completed; // it toggle the completed key value in array element object
            renderList();

            countcheckedTask();
            showNotification('Task toggles successfully');
            return;
        }
        showNotification('Task Could not be Toggle');
    }
    // Deleting the task
    function deleteTask(taskId) {
        const newTasks = tasks.filter(function (task) { // filter used to search and return those tasks which is not equal to taskId
            return task.id !== Number(taskId) && task.id !== (taskId)  ;  // in fectching API, id name is not in number form. so, we used Number() 
            // return ;
        });
        tasks = newTasks;
        renderList();
        showNotification('Task deleted successfully');
    }

    //adding the task
    function addTask(task) {
        if (task) {
            /*
                    // Get request
                    fetch('https://jsonplaceholder.typicode.com/todos', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(task),
                    }).then(function (response) {
                        // console.log(response);
                        return response.json(); // this again returns a promise
                    }).then(function (data) {
                        // console.log(data);
                        tasks.push(task);
                        renderList();
                        showNotification("Task has been added successfully");
                    })
                    .catch(function (error) {
                            // console.log('error',error);
                        })
            */
            tasks.push(task);
            renderList();
            showNotification("Task has been added successfully");
            return;
        }
        showNotification("Task cannot be added"); // return use so else does not required
    }

    // alert Notification Function
    function showNotification(title) {
        alert(title);
    }

    // handle task initiallisation by pressing Enter
    function handleInputKeypress(e) {
        if (e.key === 'Enter') {
            const title = e.target.value; // variable assign to input title
            // console.log('title', title);

            if (!title) {   // title is input text
                showNotification('Task title can not be empty');
                return;
            }
            // assign task an ID
            const task = {
                title: title,
                id: Date.now().toString(), // assigning input text a ID
                completed: false
            }
            // After that empty the input title and add task in array
            e.target.value = '';
            // assign task object in addTask Function
            addTask(task);
        }
    }
    // handle task initiallisation by add Button
    function handleInputBtn() {
        let task1 = addTaskInput.value;
        if (!task1) {   // title is input text
            showNotification('Task title can not be empty');
            return;
        }
        // assign task an ID
        const task = {
            title: task1,
            id: Date.now().toString(), // assigning input text a ID
            completed: false
        }
        // After that empty the input title and add task in array
        addTaskInput.value = '';
        addTask(task);
    }


    // handle click event on delete and checked button
    function handleClickListener(e) {
        const target = e.target;
        // console.log(target);

        if (target.className === 'delete') {
            const taskId = target.dataset.id; // datasset used as we use data-id
            deleteTask(taskId);
            return;
        } else if (target.className === 'custom-checkbox') {
            const taskId = target.id;
            toggleTask(taskId);
            return;
        }
    }

    function initializeApp() {
        fetchTodos();
        addTaskInput.addEventListener('keyup', handleInputKeypress);
        addBtn.addEventListener('click', handleInputBtn);
        document.addEventListener('click', handleClickListener);
    }

    return {
        initialize: initializeApp   // key : value
    }

})();

// Revealing module pattern means use some functions and varible in other js files


