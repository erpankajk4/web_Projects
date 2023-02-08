# Todo list app - https://erpankajk4.github.io/web-devlopment-projects/
A todo list app


### Steps followed while creating this project

- Thinking about the UI to make

# Functionality
	- Add a TODO Task by click on 'Add' Button or press Enter Key
	- Delete a TODO task by clicking on 'Delete' .svg image
	- check  or uncheck task
	- total Task count
	- total Task checked and total Task Unchecked

# Data
	- tasks - an array
	- task - {completed, title, id}
	- https://jsonplaceholder.typicode.com/todos - is used to take random tasks

# Functions (in code)
	-  IIFE function and Revealing module pattern is used

	- async function fetchTodos() - to fetch tasks

	- addTaskToDOM(task) - add task to DOM
	- renderList()
	- toggleTask(taskId) - mark Task As Complete
	- deleteTask(taskId)
	- addTask(task)
	- showNotification(title)
	- countcheckedTask() 

	- handleInputKeypress(e)
	- handleInputBtn()
	- handleClickListener(e)

	- initializeApp()