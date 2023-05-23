import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
import { clear, addWare } from "./functions.js"

const appSettings = {databaseURL: "https://realtime-database-dc353-default-rtdb.europe-west1.firebasedatabase.app/"}

const app = initializeApp(appSettings) //Connecting firebase to this project
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")


const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const ulEl = document.getElementById("shopping-list")

let wares = []

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value

    push(shoppingListInDB, inputValue)

    //ulEl.innerHTML += `<li>${inputValue}</li>`
    addWare(ulEl, inputValue)
    
    console.log(inputValue)

    // inputFieldEl.value = ""
    clear(inputFieldEl)



})