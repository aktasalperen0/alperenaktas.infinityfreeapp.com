//Soruyu alma
let questionDOM = document.querySelector("#question")

let questionSaveDOM = document.querySelector("#questionSave")
questionSaveDOM.addEventListener("click", getQuestion)

function getQuestion(){
    console.log(question.value)
    
    return question.value
}

//Şıkları alma
let answersDOM = document.querySelectorAll(".answer")
let optionsDOM = document.querySelectorAll(".option")
let trueButtons = document.querySelectorAll(".trueButton")
let answerSavesDOM = document.querySelectorAll(".answerSave")

answerSavesDOM.forEach((item, index, array) => {
    item.addEventListener("click", () => getAnswer(index))
})

trueButtons.forEach((item, index, array) => {
    item.addEventListener("click", () => selectTrue(index))
})

function getAnswer(index){
    answersDOM = document.querySelectorAll(".answer");
    if (answersDOM[index]) {
        console.log(answersDOM[index].value);
    }
}

//Şık ekleme
let addAnswerDOM = document.querySelector("#addAnswer")
addAnswerDOM.addEventListener("click", addAnswer)

let answerListDOM = document.querySelector("#answerList")

function addAnswer(){
    let newAnswer = document.createElement("div")
    newAnswer.innerHTML = `
        <div class="input-group mt-3">
            <div class="input-group-prepend">
                <div class="input-group-text" style="border-color: #000000; border-radius: 0px;">
                    <input type="radio" class="option" aria-label="Radio button for following text input" style="background-color: #E7DFD8; border-color: #000000; border-radius: 0px;">
                </div>
            </div>
            <input type="text" class="form-control answer" placeholder="Şık Giriniz" aria-label="Text input with radio button" style="background-color: #E7DFD8; border-color: #000000; border-radius: 0px;">
            <div class="input-group-prepend">
                <button class="trueButton" type="button" style="background-color: #E7DFD8; border-color: #000000; border-radius: 0px;"><i class="fa-solid fa-check" style="color: #000000;"></i></i></button>
                <button class="answerSave" type="button" style="background-color: #E7DFD8; border-color: #000000; border-radius: 0px;"><i class="fa-solid fa-floppy-disk" style="color: #000000;"></i></button>
            </div>
        </div>
    `
    answerListDOM.appendChild(newAnswer)

    answersDOM = document.querySelectorAll(".answer")
    optionsDOM = document.querySelectorAll(".option")

    trueButtons = document.querySelectorAll(".trueButton")
    answerSavesDOM = document.querySelectorAll(".answerSave")

    answerSavesDOM.forEach((item, index, array) => {
        item.addEventListener("click", () => getAnswer(index))
    })

    trueButtons.forEach((item, index, array) => {
        item.addEventListener("click", () => selectTrue(index))
    })
}

//Doğru şıkkı seçme
function selectTrue(index){
    answersDOM[index].classList.add("trueAnswer")
    optionsDOM[index].classList.add("trueAnswer")
}

//Soru ekleme
let addQuestionDOM = document.querySelector("#addQuestion")
addQuestionDOM.addEventListener("click", addQuestion)
let questionCounter = 1

let questionListDOM = document.querySelector("#questionList")

let alertDOM = document.querySelector("#alert")

function addQuestion(){

    let hasEmpty = Array.from(answersDOM).some(answer => answer.value.trim() === "");

    if(questionDOM.value == "" || hasEmpty){
        alertDOM.innerHTML = `
        <div class="position-fixed bottom-0 right-0 p-3" style="z-index: 5; right: 0; bottom: 0;">
            <div id="liveToast" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true" data-delay="2000" style="background-color: #E7DFD8; border-color: #000000; border-radius: 0px;">
                <div class="toast-header" style="background-color: #E7DFD8; border-color: #000000; border-radius: 0px;">
                    <strong class="mr-auto text-dark">Uyarı!</strong>
                    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="toast-body" style="background-color: #E7DFD8; border-color: #000000; border-radius: 0px;">
                    Lütfen Boş Alan Bırakmayınız!
                </div>
            </div>
        </div>
        `

        let toast = new bootstrap.Toast(document.getElementById('liveToast'));
        toast.show();

        return
    }

    let newQuestion = document.createElement("div")
    newQuestion.style = "border-style: solid; border-width: 1px; border-color: #000000; border-radius: 0px;"
    newQuestion.classList.add("p-5", "mb-5", "question", `question${questionCounter}`)
    newQuestion.innerHTML = `
        <button type="button" class="btn float-right deleteButton" style="background-color: #E7DFD8; border-color: #000000; border-radius: 0px;">X</button>
        <p>Soru: ${getQuestion()}</p>
    `

    answersDOM.forEach((item, index, array) => {
        
        if(answersDOM[index].classList.contains("trueAnswer")){
            newQuestion.innerHTML += `
            <div class="input-group mt-3">
                <div class="input-group-prepend">
                    <div class="input-group-text" style="border-color: #000000; border-radius: 0px;">
                        <input type="radio" class="option trueAnswer" aria-label="Radio button for following text input" name="question${questionCounter}" style="background-color: #E7DFD8; border-color: #000000; border-radius: 0px;">
                    </div>
                </div>
                <input class="form-control answer trueAnswer" value="${answersDOM[index].value}" aria-label="Text input with radio button" style="background-color: #E7DFD8; border-color: #000000; border-radius: 0px;">
            </div>
            `
        }else{
            newQuestion.innerHTML += `
            <div class="input-group mt-3">
                <div class="input-group-prepend">
                    <div class="input-group-text" style="border-color: #000000; border-radius: 0px;">
                        <input type="radio" class="option" aria-label="Radio button for following text input" name="question${questionCounter}" style="background-color: #E7DFD8; border-color: #000000; border-radius: 0px;">
                    </div>
                </div>
                <input class="form-control answer" value="${answersDOM[index].value}" aria-label="Text input with radio button" style="background-color: #E7DFD8; border-color: #000000; border-radius: 0px;">
            </div>
        `
        }
        console.log(questionCounter)
    })

    questionListDOM.appendChild(newQuestion)
    questionCounter++

    deleteButtonsDOM = document.querySelectorAll(".deleteButton")
    questionElements = document.querySelectorAll(".question")

    answersDOM.forEach((item, index, array) => {
        item.value = ""
        item.classList.remove("trueAnswer")
    })

    optionsDOM.forEach((item, index, array) => {
        item.value = ""
        item.classList.remove("trueAnswer")
    })

    deleteButtonsDOM.forEach((item, index, array) => {
        item.addEventListener("click", () => deleteQuestionFunc(index))
    })  

    questionDOM.value = ""
    
    updateQuestionNumbers()
}

//Soru Silme
let deleteButtonsDOM = document.querySelectorAll(".deleteButton")

deleteButtonsDOM.forEach((item, index, array) => {
    item.addEventListener("click", () => deleteQuestionFunc(index))
})

function deleteQuestionFunc(index){
    let deleteQuestionDOM = document.querySelector(`.question${index+1}`)
    questionListDOM.removeChild(deleteQuestionDOM)
    updateQuestionNumbers()
}

let questionElements = document.querySelectorAll(".question");

function updateQuestionNumbers() {
    let startIndex = 1;

    questionElements.forEach((item, index, array) => {
        item.classList.remove(`question${index + 1}`)
        item.classList.add(`question${startIndex}`)
        startIndex++
    })
}

//Başlat
let startDOM = document.querySelector("#start")
startDOM.addEventListener("click", start)

let modalBodyDOM = document.querySelector("#modalBody")

function start(){
    modalBodyDOM.appendChild(questionListDOM)
}

//Bitir
let total = 0
startDOM.addEventListener("click", finish)

function finish(){
    let finishDOM = document.querySelector("#finish")

    finishDOM.addEventListener("click", scorefunc)
}

function scorefunc(){
    optionsDOM = document.querySelectorAll(".option")

    let selectedOptionsDOM = document.querySelectorAll(".option:checked")

    selectedOptionsDOM.forEach((item, index, array) => {
        if(item.classList.contains("trueAnswer")){
            total = total + (100/(questionCounter-1))
        }
    })

    console.log(total)

    showTotal(total)
}

function showTotal(total){

    let totalDOM = document.querySelector("#total")
    totalDOM.innerHTML = `Sonucunuz: ${Math.round(total)}`
}