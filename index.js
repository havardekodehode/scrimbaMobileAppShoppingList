import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
import { clear, addWare } from "./functions.js"

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

onValue(shoppingListInDB, function(snapshot){
    let itemsArray = Object.values(snapshot.val())

    ulEl.innerHTML = ""

    console.log(snapshot.val())


    for (let i = 0; i < itemsArray.length; i++) {
        let item = itemsArray[i];
        console.log(item);
        addWare(ulEl,item)
    }

})