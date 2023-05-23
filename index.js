import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {databaseURL: "https://realtime-database-dc353-default-rtdb.europe-west1.firebasedatabase.app/"}

const app = initializeApp(appSettings) //Connecting firebase to this project
const database = getDatabase(app)

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListInDB = ref(database, "shoppingList")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value

    push(shoppingListInDB, inputValue)
    
    console.log(inputValue)
})