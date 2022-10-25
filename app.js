const formAddTodo = document.querySelector('.form-add') 
const formSearch = document.querySelector('.form-search')
const todosContainer = document.querySelector('.todos-container')
const showTotalTodos = document.querySelector('.total-todos')
const deleteAllButton = document.querySelector('.reset-all')

const todos = Array.from(todosContainer.children)
showTotalTodos.innerHTML = todos.length

const changeColorQuantity = () => {
    if(todos.length === 0) {
        showTotalTodos.style.color = 'rgba(255, 0, 0, 1)'
        return
    }
    showTotalTodos.style.color = 'rgba(0, 255, 0, .8)'
}

const counterTodos = counter => {
    showTotalTodos.textContent = counter
    changeColorQuantity()
}

const removeAllTodos = lis => {
    lis.forEach(li => li.remove())
}

const setQuantityInfo = () => {
    todos.length = 0
    counterTodos(0)
}

const deleteAllEventListener = () => {
    const lis = document.querySelectorAll('li')
    
    removeAllTodos(lis)
    setQuantityInfo()
}

const addTodo = inputValue => {
    if(inputValue.length) {
        todosContainer.innerHTML += `
        <li class="flex-box" data-todo="${inputValue}">
            <span>${inputValue}</span>
            <i class="far fa-trash-alt" data-trash="${inputValue}"></i>
        </li>
        `
        counterTodos(++todos.length)
        event.target.reset()
    }    
}

const removeTodo = clickedElement => {
    const trashDataValue = clickedElement.dataset.trash
    const todo = document.querySelector(`[data-todo="${trashDataValue}"]`)
    
    if(trashDataValue) {
        counterTodos(--todos.length)
        todo.remove()
    }
}

const filterTodos = (todos, inputValue, returnMatchedTodos) => todos
    .filter(todo => {
        const matchedTodo = todo.textContent.toLowerCase().includes(inputValue)
        return returnMatchedTodos ? matchedTodo : !matchedTodo
    }
)

const manipulateClass = (todos, classToAdd, classToRemove) => todos
    .forEach(todo => {
        todo.classList.remove(classToRemove)
        todo.classList.add(classToAdd)
    }
)

const hideTodos = (todos, inputValue) => {
    const todoToHide = filterTodos(todos, inputValue, false)
    manipulateClass(todoToHide, 'hidden', 'flex-box')
}

const showTodos = (todos, inputValue) => {
    const todoToShow = filterTodos(todos, inputValue, true)
    manipulateClass(todoToShow, 'flex-box', 'hidden')
}

const addTodoEventListener = event => {
    event.preventDefault()
    const inputValue = event.target.add.value.trim()
    addTodo(inputValue)
}

const todosContainerEventListener = event => {
    const clickedElement = event.target
    removeTodo(clickedElement)
}

const formSearchEventListener = event => {
    const inputValue = event.target.value.trim().toLowerCase()
    const todos = Array.from(todosContainer.children)

    hideTodos(todos, inputValue)
    showTodos(todos, inputValue)
}

deleteAllButton.addEventListener('click', deleteAllEventListener)
formAddTodo.addEventListener('submit', addTodoEventListener)
todosContainer.addEventListener('click', todosContainerEventListener)
formSearch.addEventListener('input', formSearchEventListener)
