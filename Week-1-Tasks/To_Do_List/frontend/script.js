'use strict';



// import axios from "axios";

let newTask = document.querySelector('#new-task');
let addTaskBtn = document.querySelector('#addTask');

let toDoUl = document.querySelector('.todo-list ul');
let editTaskBtn = document.querySelector('.edit-btn');
let labelText = document.querySelector('#todotask');



let taskList = [];
let editIndex = 0;

window.onload = loadTask;
//load Task
function loadTask() {
  
  axios.get("http://localhost:3000/tasks")
  .then((response)=>{
    
    taskList=response.data;
    console.log(taskList);
    displayTaskList();
  })
}

//Add task
addTaskBtn.addEventListener('click', function (e) {
  e.preventDefault;
  if (newTask.value === '') {
    alert('Task cannot be blank');
  } else {
    let taskValue = newTask.value;

    axios.post("http://localhost:3000/addtask",{
      task: taskValue
    });
    newTask.value = '';
    location.reload();
  }
});

//edit Task click event
editTaskBtn.addEventListener('click', function () {
  
  axios.put(`http://localhost:3000/update/${editIndex}`,{
    task: newTask.value
  }).then((response)=>{
    console.log(response);
  })

  editTaskBtn.style.display = 'none';
  addTaskBtn.style.display = 'block';
  labelText.innerHTML = 'Add New Task here:';
  labelText.style.fontWeight = 'bold';
  location.reload();
  newTask.value = '';
});

//display Task
function displayTaskList() {
  let htmlCode = '';
  taskList.map((list) => {
    htmlCode += `<li><label>${list.task}</lable><button class="update" onclick=editTask(${list.taskid})><i
    class='fa fa-pen-to-square'></i></button>
    <button class="delete" onclick=deleteItem(${list.taskid})><i class="fa fa-trash"></i></button></li>`;
  });
  toDoUl.innerHTML = htmlCode;
}

//edit task
function editTask(idx) {
  editIndex = idx;
  let obj = taskList.find(o => o.taskid === idx);
  newTask.value = obj.task;
  editTaskBtn.style.display = 'block';
  addTaskBtn.style.display = 'none';
  labelText.innerHTML = 'Update Task:';
  labelText.style.fontWeight = 'bold';
}

//delete task
function deleteItem(taskid) {
  axios.delete(`http://localhost:3000/deletetask/${taskid}`);
    location.reload();
}






