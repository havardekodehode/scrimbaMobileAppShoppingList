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

// let wares = []


//Note to self: Learn JQuery

// document.getElementById('items').getElementsByTagName('li').length >= 1
// With JQuery: $('ul#items li').length >= 1

//Adding hardcoded list items
// let items = ulEl.querySelectorAll("li")
// items.forEach(item => {
//
// });


addButtonEl.addEventListener("click", function() {

    ulEl.innerHTML = ""

    let inputValue = inputFieldEl.value

    push(shoppingListInDB, inputValue)
    clear(inputFieldEl)
})

onValue(shoppingListInDB, function(snapshot){
    let itemsArray = Object.values(snapshot.val())
    console.log(snapshot.val())


    for (let i = 0; i < itemsArray.length; i++) {
        let item = itemsArray[i];
        console.log(item);
        addWare(ulEl,item)
    }

})