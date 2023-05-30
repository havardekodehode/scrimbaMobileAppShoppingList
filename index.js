import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
import { clear, addWare, clearShoppingListEl } from "./functions.js"

const appSettings = {databaseURL: "https://playground-2c556-default-rtdb.europe-west1.firebasedatabase.app/"}

const app = initializeApp(appSettings) //Connecting firebase to this project
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")


const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const ulEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value

    push(shoppingListInDB, inputValue)
    clear(inputFieldEl)
})


// const myOnValue = 
onValue(shoppingListInDB, function(snapshot){
    if(snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val())

        clearShoppingListEl(ulEl)
        ulEl.innerHTML = ""
    
        console.log(snapshot.val())
    
    
        for (let i = 0; i < itemsArray.length; i++) {
            let item = itemsArray[i];
            let itemID = item[0]
            let itemValue = item[1]
            console.log(itemID);
            addWare(ulEl,item)
        }
    }else{
        ulEl.innerHTML = "No items yet"
    }
   

})



//Promise Test

// let listHasElements = new Promise(function(resolve, reject){
//     if(!Object.entries(snapshot.val()) === null){
//         resolve()
//     }else{
//         reject("")
//     }
   
// })



