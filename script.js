'use strict';

class Todo {
  constructor(form, input, todoList, todoCompleted) {
    this.form = document.querySelector(form);
    this.input = document.querySelector(input);
    this.todoList = document.querySelector(todoList);
    this.todoCompleted = document.querySelector(todoCompleted);
    this.todoData = new Map(JSON.parse(localStorage.getItem('todoList')));
    this.todoСontainer = document.querySelector('.todo-container');
    this.currentKey;
  }



  addToStorage() {
    localStorage.setItem('todoList', JSON.stringify([...this.todoData]))

  }

  render() {
    this.todoList.textContent = '';
    this.todoCompleted.textContent = '';
    this.todoData.forEach(this.createItem); //или сюда this.createItem,this
    this.addToStorage();
  }

  createItem = (todo) => { //или тут сделать стрелочную
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.key = todo.key;
    li.insertAdjacentHTML('beforeend', `
    <span class="text-todo">${todo.value}</span>
				<div class="todo-buttons">
					<button class="todo-remove"></button>
					<button class="todo-complete"></button>
        </div>`);
    if (todo.completed) {
      this.todoCompleted.append(li);
    } else {
      this.todoList.append(li);
    }
  }

  addTodo(e) {
    e.preventDefault();

    if (this.input.value.trim()) {
      const newTodo = {
        value: this.input.value,
        completed: false,
        key: this.generateKey(),
      };
      this.todoData.set(newTodo.key, newTodo);
      this.render();

    }

  }

  generateKey() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  completedItem(currentKey) {
    //завершает. через ворич перебрать все элементы this.todoData, найтти элемент которому соответствует ключ
    //и поменять значение completed: false, => true  и наоборот
    this.todoData.forEach(elem => {
      if (this.todoItem.key = currentKey) {
        this.todoItem.completed = true
      }
    });
    console.log('комплитю', currentKey);



  }

  deleteItem(currentKey) {
    //удаяляет.найти по ключу, удалить из newMap, сделать рендер
    console.log('удаляю', currentKey);
  }

  handler() {
    this.todoItem = document.querySelectorAll('.todo-item');
    // console.log('this.todoItem: ', this.todoItem[2].key);

    //метод будет определять на какую из кнопок тыкнули, делегирование
    this.todoСontainer.addEventListener('click', (event) => {
      let foo = event.target.closest('.todo-item');
      this.currentKey = foo.key;
      if (event.target.matches('.todo-remove')) {
        this.deleteItem(this.currentKey);
      }
      if (event.target.matches('.todo-complete')) {
        this.completedItem(this.currentKey);
      }
    })


  }

  // slider.addEventListener('mouseout', (event) => { //mouseleave не подойдёт
  //   if (event.target.matches('.portfolio-btn') ||
  //     event.target.matches('.dot')) {
  //     startSlides();
  //   }
  // });


  init() {
    this.form.addEventListener('submit', this.addTodo.bind(this));
    this.render()
    this.todoData.forEach((value, key) => {
      // console.log(value);
    })
    this.handler();
    // console.log(this.todoList);
    // console.log(this.todoItem);

  }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');
todo.init();