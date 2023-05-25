export function clear(elementToClear){
   elementToClear.value = ""
}

export function addWare(ulElement, ware){
    ulElement.innerHTML += `<li>${ware}</li>`
}


