//Basılan butonları ekrana yazma
let displayDOM = document.querySelector("#display")

let buttonsDOM = document.querySelectorAll(".btn, .shadow")

let process = ""

buttonsDOM.forEach((item, index, array) => {
    item.addEventListener("click", () => addProcess(item))
})

function addProcess(item){

    if(item.innerText == "="){
        let result = eval(process)
        console.log(result)

        displayDOM.innerText = result
        process = ""
        return
    }

    process = process + item.innerText
    displayDOM.innerText = process
}