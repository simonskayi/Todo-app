const inputBox = document.getElementById("input-box");
const form = document.querySelector("form");
let todos_Stored = JSON.parse(localStorage.getItem("todos"));


form.addEventListener('submit',(event)=>{
   event.preventDefault()
   
    if(inputBox.value ===""){
      alert("Opppps!!! You Didn't Type");
     }

     else{
      createNewTodo()
     }
     
})


/* Retrive Stored Todos*/
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

   inputBox.value =""

   
      /* -click cross icon to delete*/
   let delete_Todo = todoListTemplate.querySelector(".erase-todo");
   delete_Todo.addEventListener("click", ()=>{
   todoListTemplate.remove();
   saveToStorage()
   })
   
   
   
   /* -Tick todo as completed*/
   let check = todoListTemplate.querySelector(".check");
   check.addEventListener("click", ()=>{
      check.classList.toggle("check-active")
      todoListTemplate.children[0].children[1].classList.toggle("todo-is-complete")

      saveToStorage()
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
}


function changeTheme(){
    let  icon = document.getElementById("theme");
    let header_img = document.getElementById("header-img")
     let set;
    icon.onclick = function(){
       document.body.classList.toggle("dark-mode");
       if(document.body.classList.contains("dark-mode")){
          icon.src = "images/icon-sun.svg";
          header_img.src = "images/bg-desktop-dark.jpg"
          set = "dark-mode";
       }
       else{
          icon.src = "images/icon-moon.svg"
          header_img.src = "images/bg-desktop-light.jpg"
          set ="";
       }

          localStorage.setItem("theme",JSON.stringify(set))
    }
   }

   changeTheme()


   function  mySavedTheme(){
    let getTheme = JSON.parse(localStorage.getItem("theme"))
    if(getTheme==="dark-mode"){
       document.body.classList ="dark-mode"
    }
   }

 mySavedTheme()