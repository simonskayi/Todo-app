const inputBox = document.getElementById("input-box");
const form = document.querySelector("form");

form.addEventListener('submit',(event)=>{
   event.preventDefault()
   
    if(inputBox.value ===""){
      alert("Opppps!!! You Didn't Type");
     }

     else{
      createNewTodo()
      filterTodos()
     }
     
})


/* Retrive Stored Todos*/
let todos_Stored = JSON.parse(localStorage.getItem("todos"));
if(todos_Stored){
   todos_Stored.forEach(element =>{
         
      createNewTodo(element)
     
   })
   
}


function createNewTodo(dataFrom_Storage){
   const listContainer = document.getElementById("all-todo");
   const todoListTemplate = document.createElement("div");
    todoListTemplate.classList.add("todo-li")
   let todoText = inputBox.value;

   if(dataFrom_Storage){
      todoText = dataFrom_Storage.text
   }


 if(todoText){

   todoListTemplate.innerHTML= `
   <div class="list-element" >
   <div class="check ${dataFrom_Storage && dataFrom_Storage.complete?"check-active":"" }"><img src="images/icon-check.svg" alt=""></div>
   <p class="ptag ${dataFrom_Storage && dataFrom_Storage.complete?"todo-is-complete":""}">${todoText}</p>
  <div class="erase-todo"><img src="images/icon-cross.svg" alt=""></div>
   </div>
   `
  
   listContainer.appendChild(todoListTemplate);
   saveToStorage()
   activeItemsLeft() 
   }

   inputBox.value = ""


      /*Handling Deletion*/
   let delete_Todo = todoListTemplate.querySelector(".erase-todo");
   delete_Todo.addEventListener("click", ()=>{
   todoListTemplate.remove();
   saveToStorage()
   activeItemsLeft()
   })
   
   
   
   /* -Tick todo as completed*/
   let check = todoListTemplate.querySelector(".check");
   check.addEventListener("click", ()=>{
      check.classList.toggle("check-active")
      todoListTemplate.children[0].children[1].classList.toggle("todo-is-complete")
      saveToStorage() 
      activeItemsLeft()
   })  
      
};



function saveToStorage(){
   let array = [];
   let pTag = document.querySelectorAll(".ptag");
   
   pTag.forEach(element =>{
      array.push({
         text:element.innerText,
         complete:element.classList.contains("todo-is-complete")
      })
      
   });
   
   localStorage.setItem("todos",JSON.stringify(array)); 
   
};
const filterButtons = document.querySelectorAll(".element-on-middle button, .mobile-menu button");
filterButtons.forEach(button => {
  button.addEventListener("click", function () {
    filterTodos();
  });
});


function filterTodos() {
  const selectedOption = document.querySelector(".element-on-middle button.active, .mobile-menu button.active").innerText;
  const allTodos = document.querySelectorAll(".todo-li");

  allTodos.forEach(todo => {
    const todoIsComplete = todo.querySelector(".ptag").classList.contains("todo-is-complete");

    if (selectedOption === "Active") {
      todo.style.display = todoIsComplete ? "none" : "block";
    } else if (selectedOption === "Completed") {
      todo.style.display = todoIsComplete ? "block" : "none";
    } else {
      todo.style.display = "block";
    }
  });

  // update the items left 
  activeItemsLeft();
}


function activeItemsLeft() {
  let itemsLeft = document.getElementById("items-left");
  let activeTodo = document.querySelectorAll(".list-element .check-active");
  let selectedOption = document.querySelector(".element-on-middle button.active, .mobile-menu button.active").innerText;

  // If the "Completed" filter is selected, show the number of completed items left
  if (selectedOption === "Completed") {
    let completedItemsCount = activeTodo.length;
    itemsLeft.innerText = `${completedItemsCount} item${completedItemsCount === 1 ? "" : "s"} left`;
  } else {
    // Otherwise, show the number of active items left
    let todol = document.querySelectorAll(".todo-li");
    let result = todol.length - activeTodo.length;
    itemsLeft.innerText = `${result} item${result === 1 ? "" : "s"} left`;
  }
}


function menuEventListerner() {
   const todo_menu_bar = document.querySelectorAll(".element-on-middle button, .mobile-menu button");
   todo_menu_bar.forEach(element => {
     element.addEventListener("click", () => {
       todo_menu_bar.forEach(item => {
         item.classList.remove("active");
       });

       element.classList.add("active");
       filterTodos(); // Call the filtering function when the menu is clicked
     });
   });
 }

 menuEventListerner();
         
        

 function clearCompletedTodo() {
   const clearComplete = document.getElementById("delete-completed");
   clearComplete.addEventListener("click", () => {
     const allTodos = document.querySelectorAll(".todo-li");
 
     allTodos.forEach(list => {
       if (list.querySelector(".ptag").classList.contains("todo-is-complete")) {
         list.remove();
       }
     });
 
     saveToStorage();
     filterTodos();  
     activeItemsLeft(); 
   });
 }
 
 clearCompletedTodo();

      
   /* Dark & Light Theme*/
   const themeIcon = document.getElementById("theme");
   const header_img = document.getElementById("header-img");
   const savedTheme = JSON.parse(localStorage.getItem("theme"));
      
   function toggleTheme() {
      document.body.classList.toggle("dark-mode");
      
      if (document.body.classList.contains("dark-mode")) {
            themeIcon.src = "images/icon-sun.svg";
            header_img.src = "images/bg-desktop-dark.jpg";
            localStorage.setItem("theme", JSON.stringify("dark-mode"));
         } else {
            themeIcon.src = "images/icon-moon.svg";
            header_img.src = "images/bg-desktop-light.jpg";
            localStorage.setItem("theme", JSON.stringify(""));
         }
      }
      
      themeIcon.addEventListener("click", toggleTheme);
      
      if (savedTheme === "dark-mode") {
         document.body.classList.add("dark-mode");
         themeIcon.src = "images/icon-sun.svg";
         header_img.src = "images/bg-desktop-dark.jpg";
      }
      else {
         themeIcon.src = "images/icon-moon.svg";
         header_img.src = "images/bg-desktop-light.jpg";
      }


   /* Drag and drop to reorder */
   function dragSort() {
      const dragarea = document.querySelector(".drag-area");
      new Sortable(dragarea, {
         animation: 340,
         onEnd: function (event) { 
            const newOrder = Array.from(event.from.children).map(item => item.id);
            saveSorted(newOrder);
         },
      });
      }
      
      function saveSorted(newOrder) {
      saveToStorage()
      }
      
      dragSort();