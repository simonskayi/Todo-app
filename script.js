const inputBox = document.getElementById("input-box");
const form = document.querySelector("form");



form.addEventListener('submit',(event)=>{
   event.preventDefault()
   
    if(inputBox.value ===""){
      alert("Opppps!!! You Didn't Type");
     }

     else{
      createNewTodo()
      refreshTodos()
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
   
   }

   inputBox.value = ""


      /*Handling Deletion*/
   let delete_Todo = todoListTemplate.querySelector(".erase-todo");
   delete_Todo.addEventListener("click", ()=>{
   todoListTemplate.remove();
   saveToStorage()
  refreshTodos()
   })
   
   
   
   /* -Tick todo as completed*/
   let check = todoListTemplate.querySelector(".check");
   check.addEventListener("click", ()=>{
      check.classList.toggle("check-active")
      todoListTemplate.children[0].children[1].classList.toggle("todo-is-complete")

      saveToStorage()
   })  
   todoListTemplate.classList.add("todo-li")   

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

menuEventListerner()
const todoli = document.querySelectorAll(".todo-li");


   function menuEventListerner (){
         const todo_menu_bar = document.querySelectorAll(".element-on-middle p, .mobile-menu p")
            todo_menu_bar.forEach(element =>{
               element.addEventListener("click",()=>{
                  todo_menu_bar.forEach(item =>{
                     item.classList.remove("active");
                  });
         
                  element.classList.add("active")
                  if (element.innerText=="Active"){
                     todoli.forEach(item =>{
                        if(!item.children[0].children[1].classList.contains("todo-is-complete")){item.style.display ="block"}
                        else{item.style.display="none"}
                     })
                  }
                  else if (element.innerText=="Completed"){ 
                     todoli.forEach(item =>{
                     if(item.children[0].children[1].classList.contains("todo-is-complete")){item.style.display ="block"}
                     else{item.style.display="none"}
                  })
               }
         
                  else{
                     todoli.forEach(item =>{
                        item.style.display="block";
                        })
                  
                  }
               })
               
            });
         };


         function clearCompletedTodo(){
            const  clearComplete = document.getElementById("delete-completed");
            clearComplete.addEventListener("click",()=>{
               todoli.forEach(list =>{
                  if (list.children[0].children[1].classList.contains("todo-is-complete")){
                     list.remove()
                     saveToStorage()
                     refreshTodos()
                     
                  }
               });
            })
         };
      
         clearCompletedTodo()


         function activeItemsLeft() {
            let itemsLeft = document.getElementById("items-left")
            let activeTodo = document.querySelectorAll(".list-element .check-active")
            let result = todoli.length - activeTodo.length;
            itemsLeft.innerText =`${result} items left`;
         };
      
         activeItemsLeft()
      
         
         function refreshTodos(){
               location.reload();
            }

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


               /* Drag and reorder */
               function dragSort(){
                  const dragarea = document.querySelector(".drag-area")
               new Sortable(dragarea,{
                  animation: 340
               })
               };

               dragSort()