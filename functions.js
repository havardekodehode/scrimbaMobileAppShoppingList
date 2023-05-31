import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {databaseURL: "https://playground-2c556-default-rtdb.europe-west1.firebasedatabase.app/"}

const app = initializeApp(appSettings) //Connecting firebase to this project
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

export function clear(elementToClear){
   elementToClear.value = ""
}

export function addWare(ulElement, ware, percentage){
    // ulElement.innerHTML += `<li>${ware}</li>`
    let wareID = ware[0]
    const li = document.createElement("li")
    li.textContent = ware[1]

    li.addEventListener("dblclick", function(){
        let wareToDelete = ref(database, `shoppingList/${wareID}`) 
        remove(wareToDelete)
    })

    ulElement.append(li)
}

export function clearShoppingListEl(ulEl){
    ulEl.innerHTML = ""
}


