import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {databaseURL: "https://playground-2c556-default-rtdb.europe-west1.firebasedatabase.app/"}

const app = initializeApp(appSettings) //Connecting firebase to this project
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const ulEl = document.getElementById("shopping-list")
const catEl = document.getElementById("fatCat")
const catElWidth = catEl.clientWidth;


let percentage = 1

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value

    push(shoppingListInDB, inputValue)
    clear(inputFieldEl)
})

function clear(elementToClear){
    elementToClear.value = ""
 }
 
function addWare(ulElement, ware, snapshot){
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
 
function clearShoppingListEl(ulEl){
    ulEl.innerHTML = ""
}

let alive = true

function updateFat(snapshot){
    if(alive){
        let wareAmount = Object.values(snapshot.val()).length
        let multiplier = 1 + (wareAmount*0.05)
    
        catEl.style.width = String(catElWidth * multiplier + "px") 
        console.log(wareAmount);  
    
        if(wareAmount >= 45){
            alive = false;
            catEl.src = "fatCat2Dead.png"
            catEl.style.width = String(catElWidth * multiplier + "px")
        }
    }
    

    
}










onValue(shoppingListInDB, function(snapshot){
    if(snapshot.exists()){

        let itemsArray = Object.entries(snapshot.val())
        clearShoppingListEl(ulEl)
        ulEl.innerHTML = ""
        
        for (let i = 0; i < itemsArray.length; i++) {
            let item = itemsArray[i];
            let itemID = item[0]
            let itemValue = item[1]
            addWare(ulEl,item, snapshot)
        }
        updateFat(snapshot)

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



