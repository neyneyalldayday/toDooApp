const createId = () => {
let toDoId = JSON.parse(localStorage.getItem("newId")) || 0;

toDoId ++;
localStorage.setItem("newId", JSON.stringify(toDoId))

return toDoId;
}

const submitTodo = () => {
    const thingToDo = document.querySelector("#thing-to-do");
    const date = document.querySelector("#date-picker");
  
    const thing = thingToDo.value;
    const dateVal = date.value;  
    const newId = createId();

    const toDo = {
        thing:thing,
        date: dateVal,
        id: newId
    }

    thingToDo.value = "";
    date.value = "";
    return toDo;
}

const readLocalStorage = () => {
    return JSON.parse(localStorage.getItem("todo")) || [];
  }


const storeToDo = () => {

    const newToDo = submitTodo();    
     
    const toDoList = readLocalStorage()

    toDoList.push(newToDo);

    localStorage.setItem( "todo" , JSON.stringify(toDoList));

    displayToDos();
}

const displayToDos = () => {
    let thingHome = document.querySelector(".to-do-container");
    
    const toDos = readLocalStorage();
    thingHome.innerHTML = ""
    let thingCard = ''

    for(let thing of toDos){
        
       thingCard += `
       <div class="to-do-card" >
       <div>
         <h3>${thing.thing}</h3>
          <p>${thing.date}</p>       
       </div>
       <div>
        <button id="delete"  data-id="${thing.id}">delete thing</button>
       </div>
         
       </div>
       `
       
       thingHome.innerHTML = thingCard
    }  

}

const deleteToDo = (id) => {   
    const toDoList = readLocalStorage();
   const deleteNote = toDoList.filter(todo => todo.id !== parseInt(id))

   localStorage.setItem("todo", JSON.stringify(deleteNote));   
   displayToDos();   
}

  document.querySelector(".to-do-container").addEventListener("click", (event) => {
     if (event.target.matches("button")) {        
        const buttonId = event.target.dataset.id
       
        deleteToDo(buttonId);
     }

  });

  document.addEventListener("submit", (event) => {
    event.preventDefault();
    storeToDo();
  }); 

  document.addEventListener("DOMContentLoaded", () => {
    displayToDos();
  })


