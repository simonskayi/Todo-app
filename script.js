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